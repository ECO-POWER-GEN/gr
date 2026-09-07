import { Routes, Route } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import CasesPage from './pages/CasesPage';
import CaseDetailPage from './pages/CaseDetailPage';
import InquiryPage from './pages/InquiryPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminCasesPage from './pages/admin/AdminCasesPage';
import AdminCaseFormPage from './pages/admin/AdminCaseFormPage';
import AdminRoute from './components/AdminRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/cases" element={<AdminRoute><AdminCasesPage /></AdminRoute>} />
          <Route path="/admin/cases/new" element={<AdminRoute><AdminCaseFormPage /></AdminRoute>} />
          <Route path="/admin/cases/:id/edit" element={<AdminRoute><AdminCaseFormPage /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
