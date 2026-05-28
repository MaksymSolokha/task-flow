import { type Task } from '@/lib/mock-data.ts';

const PRIORITY_DOT: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-400',
  low: 'bg-blue-400',
};

const STATUS_PILL: Record<string, string> = {
  todo: 'bg-slate-100 text-slate-500',
  in_progress: 'bg-indigo-50 text-indigo-600',
  done: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-slate-50 text-slate-400',
};

const STATUS_LABEL: Record<string, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

function formatDueDate(dateStr: string): { text: string; overdue: boolean } {
  const date = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return { text: `${Math.abs(days)}d overdue`, overdue: true };
  if (days === 0) return { text: 'Today', overdue: false };
  if (days <= 3) return { text: `${days}d left`, overdue: false };
  return {
    text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    overdue: false,
  };
}

const TaskRow = ({
  task,
  isSelected,
  onClick,
}: {
  task: Task;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const due = formatDueDate(task.dueDate);

  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-indigo-50 border-l-2 border-l-indigo-500'
          : 'hover:bg-slate-50 border-l-2 border-l-transparent'
      }`}
    >
      <div className={`w-2 h-2 rounded-full shrink-0 mr-3 ${PRIORITY_DOT[task.priority]}`} />

      <div className="flex-1 min-w-0 mr-4">
        <span
          className={`text-sm truncate block ${
            isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 mr-4 shrink-0">
        {task.labels.slice(0, 2).map((label) => (
          <span
            key={label}
            className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200"
          >
            {label}
          </span>
        ))}
      </div>

      <span
        className={`hidden lg:block text-xs px-2 py-0.5 rounded-full mr-3 shrink-0 ${STATUS_PILL[task.status]}`}
      >
        {STATUS_LABEL[task.status]}
      </span>

      <div
        className={`w-6 h-6 rounded-full ${task.assignee.color} text-white text-[10px] font-semibold grid place-items-center shrink-0 mr-3`}
        title={task.assignee.name}
      >
        {task.assignee.initials}
      </div>

      <span
        className={`text-xs shrink-0 w-20 text-right ${
          due.overdue ? 'text-red-500 font-medium' : 'text-slate-400'
        }`}
      >
        {due.text}
      </span>
    </div>
  );
};

export default TaskRow;
