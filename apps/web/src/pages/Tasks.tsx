import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import StatsCards from '@/components/tasks/StatsCards.tsx';
import FilterBar from '@/components/tasks/FilterBar.tsx';
import TaskRow from '@/components/tasks/TaskRow.tsx';
import TaskDetailPanel from '@/components/tasks/TaskDetailPanel.tsx';
import CreateTaskModal from '@/components/tasks/CreateTaskModal.tsx';
import EditTaskModal from '@/components/tasks/EditTaskModal.tsx';
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal.tsx';
import { MOCK_TASKS, type Task } from '@/lib/mock-data.ts';

const TaskSection = ({
  title,
  tasks,
  selectedId,
  onSelect,
}: {
  title: string;
  tasks: Task[];
  selectedId: string;
  onSelect: (id: string) => void;
}) => (
  <div>
    <div className="px-4 py-2 bg-slate-50/80 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-10 backdrop-blur-sm">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</span>
      <span className="text-xs text-slate-400 bg-slate-200 rounded-full px-1.5 py-0.5 font-medium leading-none">
        {tasks.length}
      </span>
    </div>
    {tasks.map((task) => (
      <TaskRow
        key={task.id}
        task={task}
        isSelected={task.id === selectedId}
        onClick={() => onSelect(task.id)}
      />
    ))}
  </div>
);

const Tasks = () => {
  const [selectedId, setSelectedId] = useState('t1');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const selected = MOCK_TASKS.find((t) => t.id === selectedId)!;

  const inProgress = MOCK_TASKS.filter((t) => t.status === 'in_progress');
  const todo = MOCK_TASKS.filter((t) => t.status === 'todo');
  const done = MOCK_TASKS.filter((t) => t.status === 'done');

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h1 className="text-base font-semibold text-slate-900">All Tasks</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {MOCK_TASKS.length} tasks across 3 projects
            </p>
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

        <StatsCards tasks={MOCK_TASKS} />
        <FilterBar />

        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <TaskSection title="In Progress" tasks={inProgress} selectedId={selectedId} onSelect={setSelectedId} />
            <TaskSection title="To Do" tasks={todo} selectedId={selectedId} onSelect={setSelectedId} />
            <TaskSection title="Done" tasks={done} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          <div className="w-96 shrink-0">
            <TaskDetailPanel
              task={selected}
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => setIsDeleteOpen(true)}
            />
          </div>
        </div>
      </div>

      <CreateTaskModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <EditTaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} task={selected} />
      <DeleteTaskModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        taskTitle={selected.title}
      />
    </>
  );
};

export default Tasks;
