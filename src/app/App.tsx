import { Routes, Route } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import CasesPage from './pages/CasesPage';
import InquiryPage from './pages/InquiryPage';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
