import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Building, 
  FileCheck, 
  MessageSquare, 
  GraduationCap, 
  Home, 
  Award, 
  LogOut, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import logoAdmission from '@/assets/images/logo-admission.png';
import { FptButton } from '@/components/ui/FptButton';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  isCollapsed,
  onClick 
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-orange-100 text-orange-600' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center justify-center">
          <div className={`${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
            {icon}
          </div>
        </div>
        {!isCollapsed && (
          <span className={`ml-3 whitespace-nowrap ${isActive ? 'font-medium' : ''}`}>
            {label}
          </span>
        )}
      </button>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  // Định nghĩa các mục menu dựa trên role
  const adminMenuItems = [
    { 
      icon: <LayoutDashboard size={22} />, 
      label: 'Dashboard', 
      path: '/admin/dashboard' 
    },
    { 
      icon: <BookOpen size={22} />, 
      label: 'Ngành học', 
      path: '/admin/majors' 
    },
    { 
      icon: <Building size={22} />, 
      label: 'Campus', 
      path: '/admin/campus' 
    },
    { 
      icon: <FileCheck size={22} />, 
      label: 'Hình thức xét tuyển', 
      path: '/admin/admission-methods' 
    },
    { 
      icon: <MessageSquare size={22} />, 
      label: 'Mẫu phản hồi', 
      path: '/admin/feedback-templates' 
    }
  ];
  
  const staffMenuItems = [
    { 
      icon: <LayoutDashboard size={22} />, 
      label: 'Dashboard', 
      path: '/staff/dashboard' 
    },
    { 
      icon: <GraduationCap size={22} />, 
      label: 'Tuyển sinh ngành', 
      path: '/staff/admissions' 
    },
    { 
      icon: <Home size={22} />, 
      label: 'Ký túc xá', 
      path: '/staff/dormitory' 
    },
    { 
      icon: <Award size={22} />, 
      label: 'Học bổng', 
      path: '/staff/scholarships' 
    }
  ];
  
  // Chọn menu items dựa trên role
  const menuItems = user?.role === 'admin' ? adminMenuItems : staffMenuItems;
  
  return (
    <div 
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-[80px]' : 'w-[250px]'
      }`}
    >
      {/* Logo và toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <img 
            src={logoAdmission} 
            alt="FPT Admission" 
            className={`${isCollapsed ? 'h-10' : 'h-12'} object-contain`}
          />
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold text-gray-800">Admission</span>
          )}
        </div>
        {!isCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
        )}
        {isCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="absolute -right-3 top-12 bg-white rounded-full p-1 border border-gray-200 shadow-sm"
          >
            <ChevronRight size={18} className="text-gray-500" />
          </button>
        )}
      </div>
      
      {/* Menu items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
        </ul>
      </div>
      
      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <FptButton
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-${isCollapsed ? 'center' : 'start'} text-gray-700 hover:text-red-600 hover:bg-red-50`}
        >
          <LogOut size={20} className="min-w-5" />
          {!isCollapsed && <span className="ml-2">Đăng xuất</span>}
        </FptButton>
      </div>
    </div>
  );
};

export default Sidebar;
