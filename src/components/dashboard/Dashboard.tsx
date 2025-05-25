
import { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import PatientsView from './PatientsView';
import AppointmentsView from './AppointmentsView';
import MedicationsView from './MedicationsView';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientsView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'medications':
        return <MedicationsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
