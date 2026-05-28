import { Bell, CheckCheck, MessageSquare, UserPlus, CheckCircle2, AtSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { TEAM_MEMBERS } from '@/lib/mock-data.ts';

type NotifType = 'comment' | 'assigned' | 'completed' | 'mentioned' | 'status_changed' | 'joined';

interface Notification {
  id: string;
  type: NotifType;
  actor: (typeof TEAM_MEMBERS)[number];
  taskTitle: string;
  content?: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'comment',
    actor: TEAM_MEMBERS[2],
    taskTitle: 'Fix JWT token refresh bug',
    content: 'Reproducing on Safari only. Chrome seems fine. Could be related to SameSite cookie policy.',
    time: '2h ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'assigned',
    actor: TEAM_MEMBERS[4],
    taskTitle: 'Design new landing page',
    time: '3h ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'mentioned',
    actor: TEAM_MEMBERS[4],
    taskTitle: 'Write REST API documentation',
    content: 'Please prioritize the /auth and /tasks endpoints first so the frontend can start integration.',
    time: '5h ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'status_changed',
    actor: TEAM_MEMBERS[0],
    taskTitle: 'Design new landing page',
    content: 'Todo → In Progress',
    time: '6h ago',
    read: false,
  },
  {
    id: 'n5',
    type: 'completed',
    actor: TEAM_MEMBERS[3],
    taskTitle: 'Migrate database to PostgreSQL',
    time: '1d ago',
    read: true,
  },
  {
    id: 'n6',
    type: 'comment',
    actor: TEAM_MEMBERS[0],
    taskTitle: 'Design new landing page',
    content: "Looks great! I'll finalize the typography and colours by EOD.",
    time: '1d ago',
    read: true,
  },
  {
    id: 'n7',
    type: 'joined',
    actor: TEAM_MEMBERS[2],
    taskTitle: '',
    time: '2d ago',
    read: true,
  },
  {
    id: 'n8',
    type: 'assigned',
    actor: TEAM_MEMBERS[1],
    taskTitle: 'Implement task filtering & sorting',
    time: '2d ago',
    read: true,
  },
];

const TYPE_CONFIG: Record<NotifType, { icon: React.ElementType; color: string; bg: string; text: (actor: string, task: string) => string }> = {
  comment: {
    icon: MessageSquare,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    text: (a, t) => `${a} commented on "${t}"`,
  },
  assigned: {
    icon: UserPlus,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    text: (a, t) => `${a} assigned you to "${t}"`,
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    text: (a, t) => `${a} completed "${t}"`,
  },
  mentioned: {
    icon: AtSign,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    text: (a, _t) => `${a} mentioned you in a comment`,
  },
  status_changed: {
    icon: ArrowRight,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    text: (a, t) => `${a} updated status of "${t}"`,
  },
  joined: {
    icon: UserPlus,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    text: (a, _t) => `${a} joined the workspace`,
  },
};

const unread = NOTIFICATIONS.filter((n) => !n.read);
const read = NOTIFICATIONS.filter((n) => n.read);

const NotificationRow = ({ n }: { n: Notification }) => {
  const cfg = TYPE_CONFIG[n.type];
  const Icon = cfg.icon;

  return (
    <div
      className={`flex items-start gap-4 px-6 py-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-slate-50 ${
        !n.read ? 'bg-indigo-50/30' : ''
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`w-9 h-9 rounded-full ${n.actor.color} text-white text-xs font-bold grid place-items-center`}
        >
          {n.actor.initials}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${cfg.bg} ${cfg.color} grid place-items-center border-2 border-white`}>
          <Icon size={10} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm ${!n.read ? 'text-slate-900' : 'text-slate-600'} leading-snug`}>
          {cfg.text(n.actor.name, n.taskTitle)}
        </p>
        {n.content && (
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{n.content}</p>
        )}
        <span className="text-xs text-slate-400 mt-1 block">{n.time}</span>
      </div>

      {!n.read && (
        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
      )}
    </div>
  );
};

const Inbox = () => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
      <div>
        <h1 className="text-base font-semibold text-slate-900">Inbox</h1>
        <p className="text-xs text-slate-400 mt-0.5">{unread.length} unread notifications</p>
      </div>
      <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500 text-sm">
        <CheckCheck size={14} />
        Mark all as read
      </Button>
    </div>

    <div className="flex-1 overflow-y-auto">
      {unread.length > 0 && (
        <div>
          <div className="px-6 py-2 bg-slate-50 border-b border-gray-100 flex items-center gap-2">
            <Bell size={12} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">New</span>
            <span className="text-xs text-slate-400 bg-slate-200 rounded-full px-1.5 font-medium">{unread.length}</span>
          </div>
          {unread.map((n) => <NotificationRow key={n.id} n={n} />)}
        </div>
      )}

      {read.length > 0 && (
        <div>
          <div className="px-6 py-2 bg-slate-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Earlier</span>
          </div>
          {read.map((n) => <NotificationRow key={n.id} n={n} />)}
        </div>
      )}
    </div>
  </div>
);

export default Inbox;
