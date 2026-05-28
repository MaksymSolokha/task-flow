import { CheckCircle2, Circle, Clock, LayoutList } from 'lucide-react';
import { type Task } from '@/lib/mock-data.ts';

const StatsCards = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const done = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="grid grid-cols-4 gap-3 px-6 py-4 shrink-0 border-b border-gray-100">
      <StatCard icon={<LayoutList size={15} />} label="Total" value={total} colorClass="text-slate-500" bgClass="bg-slate-50 border-slate-200" />
      <StatCard icon={<Circle size={15} />} label="To Do" value={todo} colorClass="text-slate-500" bgClass="bg-slate-50 border-slate-200" />
      <StatCard icon={<Clock size={15} />} label="In Progress" value={inProgress} colorClass="text-indigo-500" bgClass="bg-indigo-50 border-indigo-100" />
      <StatCard icon={<CheckCircle2 size={15} />} label="Done" value={done} colorClass="text-emerald-500" bgClass="bg-emerald-50 border-emerald-100" />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  colorClass,
  bgClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
  bgClass: string;
}) => (
  <div className={`${bgClass} rounded-xl p-4 border`}>
    <div className={`flex items-center gap-2 ${colorClass} mb-2`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <span className="text-2xl font-bold text-slate-800">{value}</span>
  </div>
);

export default StatsCards;
