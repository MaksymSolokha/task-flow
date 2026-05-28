import { NavLink } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Circle,
  Inbox,
  LayoutList,
  Plus,
  Settings,
  Tag,
  ChevronDown,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/tasks', icon: LayoutList, label: 'All Tasks', count: null },
  { to: '/my-tasks', icon: Circle, label: 'My Tasks', count: null },
  { to: '/inbox', icon: Inbox, label: 'Inbox', count: 4 },
  { to: '/completed', icon: CheckCircle2, label: 'Completed', count: null },
];

const PROJECTS = [
  { name: 'Personal', color: 'bg-violet-500' },
  { name: 'Side project', color: 'bg-indigo-500' },
  { name: 'Reading list', color: 'bg-emerald-500' },
];

const LABELS = [
  { name: 'Design', color: 'bg-pink-400' },
  { name: 'Backend', color: 'bg-blue-500' },
  { name: 'Frontend', color: 'bg-indigo-400' },
  { name: 'Bug', color: 'bg-red-500' },
  { name: 'DevOps', color: 'bg-orange-400' },
];

const navCls = ({ isActive }: { isActive: boolean }) =>
  `w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 font-medium'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
  }`;

const Sidebar = () => {
  return (
    <div className="w-56 border-r border-gray-200 flex flex-col overflow-y-auto bg-slate-50/40 shrink-0">
      {/* Main nav */}
      <nav className="px-3 pt-4 pb-2">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(({ to, icon: Icon, label, count }) => (
            <NavLink key={to} to={to} className={navCls}>
              {({ isActive }) => (
                <>
                  <Icon size={15} className={isActive ? 'text-indigo-500' : 'text-slate-400'} />
                  <span className="flex-1 text-left">{label}</span>
                  {count !== null && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-medium">
                      {count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="h-px bg-gray-200 mx-3 my-2" />

      {/* Projects */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between px-2 mb-1.5 group">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Projects</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
              <Plus size={11} />
            </button>
            <button className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronDown size={11} />
            </button>
          </div>
        </div>
        <div className="space-y-0.5">
          {PROJECTS.map((p) => (
            <button
              key={p.name}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${p.color}`} />
              <span className="flex-1 text-left truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 mx-3 my-2" />

      {/* Labels */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between px-2 mb-1.5 group">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Labels</span>
          <button className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
            <Plus size={11} />
          </button>
        </div>
        <div className="space-y-0.5">
          {LABELS.map((l) => (
            <button
              key={l.name}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Tag size={12} className="text-slate-400 shrink-0" />
              <span className="flex-1 text-left">{l.name}</span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${l.color}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom: settings */}
      <div className="mt-auto px-3 py-3 border-t border-gray-200">
        <NavLink to="/settings/profile" className={navCls}>
          {({ isActive }) => (
            <>
              <Settings size={15} className={isActive ? 'text-indigo-500' : 'text-slate-400'} />
              <span className="flex-1 text-left">Settings</span>
              <Bell size={13} className="text-slate-300" />
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
