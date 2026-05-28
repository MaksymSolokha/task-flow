import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import TaskRow from '@/components/tasks/TaskRow.tsx';
import TaskDetailPanel from '@/components/tasks/TaskDetailPanel.tsx';
import CreateTaskModal from '@/components/tasks/CreateTaskModal.tsx';
import EditTaskModal from '@/components/tasks/EditTaskModal.tsx';
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal.tsx';
import { MOCK_TASKS, TEAM_MEMBERS } from '@/lib/mock-data.ts';

const ME = TEAM_MEMBERS[1]; // Bob Smith

const myTasks = MOCK_TASKS.filter((t) => t.assignee.id === ME.id);
const inProgress = myTasks.filter((t) => t.status === 'in_progress');
const todo = myTasks.filter((t) => t.status === 'todo');
const done = myTasks.filter((t) => t.status === 'done');

const MyTasks = () => {
  const [selectedId, setSelectedId] = useState(myTasks[0]?.id ?? '');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const selected = myTasks.find((t) => t.id === selectedId) ?? myTasks[0];

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${ME.color} text-white text-xs font-bold grid place-items-center`}>
              {ME.initials}
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900">My Tasks</h1>
              <p className="text-xs text-slate-400 mt-0.5">{myTasks.length} tasks assigned to {ME.name}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={14} />
            New Task
          </Button>
        </div>

        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            {inProgress.length > 0 && (
              <Section title="In Progress" count={inProgress.length}>
                {inProgress.map((t) => (
                  <TaskRow key={t.id} task={t} isSelected={t.id === selectedId} onClick={() => setSelectedId(t.id)} />
                ))}
              </Section>
            )}
            {todo.length > 0 && (
              <Section title="To Do" count={todo.length}>
                {todo.map((t) => (
                  <TaskRow key={t.id} task={t} isSelected={t.id === selectedId} onClick={() => setSelectedId(t.id)} />
                ))}
              </Section>
            )}
            {done.length > 0 && (
              <Section title="Done" count={done.length}>
                {done.map((t) => (
                  <TaskRow key={t.id} task={t} isSelected={t.id === selectedId} onClick={() => setSelectedId(t.id)} />
                ))}
              </Section>
            )}
          </div>

          {selected && (
            <div className="w-96 shrink-0">
              <TaskDetailPanel
                task={selected}
                onEdit={() => setIsEditOpen(true)}
                onDelete={() => setIsDeleteOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      <CreateTaskModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      {selected && (
        <>
          <EditTaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} task={selected} />
          <DeleteTaskModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} taskTitle={selected.title} />
        </>
      )}
    </>
  );
};

const Section = ({ title, count, children }: { title: string; count: number; children: React.ReactNode }) => (
  <div>
    <div className="px-4 py-2 bg-slate-50/80 border-b border-gray-100 flex items-center gap-2 sticky top-0 backdrop-blur-sm">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</span>
      <span className="text-xs text-slate-400 bg-slate-200 rounded-full px-1.5 py-0.5 font-medium leading-none">{count}</span>
    </div>
    {children}
  </div>
);

export default MyTasks;
