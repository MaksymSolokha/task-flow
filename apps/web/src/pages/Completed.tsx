import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TaskRow from '@/components/tasks/TaskRow.tsx';
import TaskDetailPanel from '@/components/tasks/TaskDetailPanel.tsx';
import EditTaskModal from '@/components/tasks/EditTaskModal.tsx';
import { MOCK_TASKS } from '@/lib/mock-data.ts';

const doneTasks = MOCK_TASKS.filter((t) => t.status === 'done');

const Completed = () => {
  const [selectedId, setSelectedId] = useState(doneTasks[0]?.id ?? '');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const selected = doneTasks.find((t) => t.id === selectedId) ?? doneTasks[0];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900">Completed</h1>
              <p className="text-xs text-slate-400 mt-0.5">{doneTasks.length} tasks completed</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 bg-slate-50/80 border-b border-gray-100 flex items-center gap-2 sticky top-0 backdrop-blur-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Done</span>
              <span className="text-xs text-slate-400 bg-slate-200 rounded-full px-1.5 py-0.5 font-medium leading-none">
                {doneTasks.length}
              </span>
            </div>
            {doneTasks.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                isSelected={t.id === selectedId}
                onClick={() => setSelectedId(t.id)}
              />
            ))}
          </div>

          {selected && (
            <div className="w-96 shrink-0">
              <TaskDetailPanel
                task={selected}
                onEdit={() => setIsEditOpen(true)}
                onDelete={() => {}}
              />
            </div>
          )}
        </div>
      </div>

      {selected && (
        <EditTaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} task={selected} />
      )}
    </>
  );
};

export default Completed;
