import { Phone, Mail } from 'lucide-react';
import { CONTACT } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-3">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-2 text-sm">
              <span>{CONTACT.companyName}</span>
              <span>대표자: {CONTACT.ceo}</span>
              <span className="flex items-center gap-1.5"><Phone size={16} />{CONTACT.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={16} />{CONTACT.email}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm">
          <p>©{CONTACT.companyName}. All rights reserved. Hosting by gr.kim.</p>
        </div>
      </div>
    </footer>
  );
}
