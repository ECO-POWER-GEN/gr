import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) return null;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
