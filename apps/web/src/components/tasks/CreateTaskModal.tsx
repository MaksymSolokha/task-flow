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
import { TEAM_MEMBERS } from '@/lib/mock-data.ts';

const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Create new task" size="lg">
    <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
      <Field>
        <FieldLabel htmlFor="ct-title">Title</FieldLabel>
        <Input id="ct-title" placeholder="What needs to be done?" />
      </Field>

      <Field>
        <FieldLabel htmlFor="ct-desc">Description</FieldLabel>
        <textarea
          id="ct-desc"
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
          placeholder="Add more details…"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Priority</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
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
          <Select defaultValue="todo">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Assignee</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Assign to…" />
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
          <FieldLabel htmlFor="ct-due">Due date</FieldLabel>
          <Input id="ct-due" type="date" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Project</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="side">Side project</SelectItem>
              <SelectItem value="reading">Reading list</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="ct-labels">Labels</FieldLabel>
          <Input id="ct-labels" placeholder="Design, Backend…" />
        </Field>
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={onClose}>
        Create task
      </Button>
    </div>
  </Modal>
);

export default CreateTaskModal;
