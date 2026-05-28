import { Button } from '@/components/ui/button.tsx';

interface ToggleItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const EMAIL_ITEMS: ToggleItem[] = [
  { id: 'e1', label: 'New comments on your tasks', description: 'Get an email when someone comments on a task assigned to you.', enabled: true },
  { id: 'e2', label: 'Task assigned to you', description: 'Receive an email when someone assigns a task to you.', enabled: true },
  { id: 'e3', label: 'Task completed', description: 'Notify when a task you follow gets marked as done.', enabled: false },
  { id: 'e4', label: 'New team member', description: 'Get notified when someone joins the workspace.', enabled: false },
  { id: 'e5', label: 'Weekly digest', description: 'A weekly summary of your tasks and team activity.', enabled: true },
];

const INAPP_ITEMS: ToggleItem[] = [
  { id: 'i1', label: 'New comments', description: 'Show in-app notification for new comments.', enabled: true },
  { id: 'i2', label: 'Task assignments', description: 'Show notification when a task is assigned to you.', enabled: true },
  { id: 'i3', label: 'Mentions', description: 'Notify when someone @mentions you in a comment.', enabled: true },
  { id: 'i4', label: 'Status changes', description: 'Show notification when a task status changes.', enabled: false },
  { id: 'i5', label: 'Due date reminders', description: 'Remind you 24 hours before a task is due.', enabled: true },
];

const Toggle = ({ enabled }: { enabled: boolean }) => (
  <button
    className={`relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0 ${
      enabled ? 'bg-indigo-600' : 'bg-slate-200'
    }`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
        enabled ? 'translate-x-4' : 'translate-x-0.5'
      }`}
    />
  </button>
);

const ToggleRow = ({ item }: { item: ToggleItem }) => (
  <div className="flex items-start justify-between gap-6 py-4 border-b border-gray-100 last:border-0">
    <div className="flex-1">
      <p className="text-sm font-medium text-slate-800">{item.label}</p>
      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
    </div>
    <Toggle enabled={item.enabled} />
  </div>
);

const NotificationsSettings = () => (
  <div className="max-w-2xl px-8 py-8">
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
      <p className="text-sm text-slate-500 mt-1">Choose what you want to be notified about.</p>
    </div>

    {/* Email */}
    <div className="pb-8 mb-8 border-b border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-slate-700">Email notifications</h3>
        <button className="text-xs text-indigo-600 hover:underline">Disable all</button>
      </div>
      <p className="text-xs text-slate-400 mb-4">Sent to maksim.solokha0411@gmail.com</p>
      <div>
        {EMAIL_ITEMS.map((item) => <ToggleRow key={item.id} item={item} />)}
      </div>
    </div>

    {/* In-app */}
    <div className="pb-8 mb-8 border-b border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-slate-700">In-app notifications</h3>
        <button className="text-xs text-indigo-600 hover:underline">Disable all</button>
      </div>
      <p className="text-xs text-slate-400 mb-4">Shown in the Inbox section of the app.</p>
      <div>
        {INAPP_ITEMS.map((item) => <ToggleRow key={item.id} item={item} />)}
      </div>
    </div>

    <div className="flex items-center gap-3">
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save preferences</Button>
      <Button variant="ghost">Reset to defaults</Button>
    </div>
  </div>
);

export default NotificationsSettings;
