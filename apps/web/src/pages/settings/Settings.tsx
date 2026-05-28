import { NavLink, Outlet } from 'react-router-dom';
import { Bell, Building2, Users, UserCircle } from 'lucide-react';

const NAV = [
  { to: '/settings/profile', label: 'Profile', icon: UserCircle },
  { to: '/settings/workspace', label: 'Workspace', icon: Building2 },
  { to: '/settings/members', label: 'Members', icon: Users },
  { to: '/settings/notifications', label: 'Notifications', icon: Bell },
];

const Settings = () => (
  <div className="flex h-full">
    {/* Settings sidebar */}
    <div className="w-52 border-r border-gray-200 py-6 px-3 shrink-0 bg-slate-50/40">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2.5 mb-3">Settings</p>
      <nav className="space-y-0.5">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>
  </div>
);

export default Settings;
