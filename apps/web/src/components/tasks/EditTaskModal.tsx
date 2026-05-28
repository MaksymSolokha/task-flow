import Modal from '@/components/ui/modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { type Task, TEAM_MEMBERS } from '@/lib/mock-data.ts';

const EditTaskModal = ({
  isOpen,
  onClose,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Edit task" size="lg">
    <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
      <Field>
        <FieldLabel htmlFor="et-title">Title</FieldLabel>
        <Input id="et-title" defaultValue={task.title} />
      </Field>

      <Field>
        <FieldLabel htmlFor="et-desc">Description</FieldLabel>
        <textarea
          id="et-desc"
          rows={3}
          defaultValue={task.description}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Priority</FieldLabel>
          <Select defaultValue={task.priority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">🔴 Urgent</SelectItem>
              <SelectItem value="high">🟠 High</SelectItem>
              <SelectItem value="medium">🟡 Medium</SelectItem>
              <SelectItem value="low">🔵 Low</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <Select defaultValue={task.status}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Assignee</FieldLabel>
          <Select defaultValue={task.assignee.id}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAM_MEMBERS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="et-due">Due date</FieldLabel>
          <Input id="et-due" type="date" defaultValue={task.dueDate} />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="et-labels">Labels</FieldLabel>
        <Input id="et-labels" defaultValue={task.labels.join(', ')} />
      </Field>
    </div>

    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={onClose}>
        Save changes
      </Button>
    </div>
  </Modal>
);

export default EditTaskModal;
