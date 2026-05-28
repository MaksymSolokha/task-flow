import { Calendar, Clock, Flag, MessageSquare, Pencil, Tag, Trash2, User } from 'lucide-react';
import { type Task } from '@/lib/mock-data.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

const PRIORITY_CONFIG: Record<string, { label: string; cls: string }> = {
  urgent: { label: 'Urgent', cls: 'text-red-600 bg-red-50 border-red-200' },
  high: { label: 'High', cls: 'text-orange-600 bg-orange-50 border-orange-200' },
  medium: { label: 'Medium', cls: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  low: { label: 'Low', cls: 'text-blue-600 bg-blue-50 border-blue-200' },
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  todo: { label: 'Todo', cls: 'text-slate-600 bg-slate-100 border-slate-200' },
  in_progress: { label: 'In Progress', cls: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  done: { label: 'Done', cls: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  cancelled: { label: 'Cancelled', cls: 'text-slate-400 bg-slate-50 border-slate-200' },
};

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function fmtCommentDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface TaskDetailPanelProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskDetailPanel = ({ task, onEdit, onDelete }: TaskDetailPanelProps) => {
  const status = STATUS_CONFIG[task.status];
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <div className="flex flex-col h-full border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-slate-900 leading-snug flex-1">{task.title}</h2>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              title="Edit task"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${status.cls}`}>
            {status.label}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium inline-flex items-center gap-1 ${priority.cls}`}>
            <Flag size={10} />
            {priority.label}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Description */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</p>
          <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
        </div>

        {/* Details */}
        <div className="px-5 py-4 border-b border-gray-100 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Details</p>

          <div className="flex items-center gap-3">
            <User size={13} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 w-16 shrink-0">Assignee</span>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full ${task.assignee.color} text-white text-[9px] font-bold grid place-items-center`}>
                {task.assignee.initials}
              </div>
              <span className="text-sm text-slate-700">{task.assignee.name}</span>
              <span className="text-xs text-slate-400">· {task.assignee.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={13} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 w-16 shrink-0">Due date</span>
            <span className="text-sm text-slate-700">{fmtDate(task.dueDate)}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={13} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 w-16 shrink-0">Created</span>
            <span className="text-sm text-slate-700">{fmtDate(task.createdAt)}</span>
          </div>

          <div className="flex items-start gap-3">
            <Tag size={13} className="text-slate-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-400 w-16 shrink-0 mt-0.5">Labels</span>
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label) => (
                <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="px-5 py-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
            <MessageSquare size={11} />
            Comments ({task.comments.length})
          </p>

          {task.comments.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No comments yet. Be the first to comment.</p>
          ) : (
            <div className="space-y-5">
              {task.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${comment.author.color} text-white text-[10px] font-bold grid place-items-center shrink-0`}>
                    {comment.author.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-700">{comment.author.name}</span>
                      <span className="text-xs text-slate-400">{fmtCommentDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comment input */}
      <div className="px-5 py-4 border-t border-gray-100 shrink-0">
        <div className="flex gap-2">
          <Input className="text-sm h-9 bg-slate-50" placeholder="Add a comment…" />
          <Button size="sm" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPanel;
