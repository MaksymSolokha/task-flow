export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
  email: string;
  role: string;
}

export interface TaskComment {
  id: string;
  author: TeamMember;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  labels: string[];
  assignee: TeamMember;
  dueDate: string;
  createdAt: string;
  comments: TaskComment[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'u1', name: 'Alice Chen', initials: 'AC', color: 'bg-violet-500', email: 'alice@taskflow.io', role: 'Designer' },
  { id: 'u2', name: 'Bob Smith', initials: 'BS', color: 'bg-blue-500', email: 'bob@taskflow.io', role: 'Backend Dev' },
  { id: 'u3', name: 'Carol Wu', initials: 'CW', color: 'bg-emerald-500', email: 'carol@taskflow.io', role: 'Frontend Dev' },
  { id: 'u4', name: 'Dan Park', initials: 'DP', color: 'bg-orange-500', email: 'dan@taskflow.io', role: 'DevOps' },
  { id: 'u5', name: 'Eva Rose', initials: 'ER', color: 'bg-pink-500', email: 'eva@taskflow.io', role: 'Product Manager' },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Design new landing page',
    description:
      'Create wireframes and high-fidelity mockups for the new marketing landing page. Include mobile-responsive layouts and dark mode variants. Coordinate with the marketing team for copy and CTAs.',
    status: 'in_progress',
    priority: 'high',
    labels: ['Design', 'Frontend'],
    assignee: TEAM_MEMBERS[0],
    dueDate: '2025-06-10',
    createdAt: '2025-05-20',
    comments: [
      {
        id: 'c1',
        author: TEAM_MEMBERS[1],
        content: 'Added initial wireframes to Figma. Can you review the mobile breakpoints?',
        createdAt: '2025-05-24',
      },
      {
        id: 'c2',
        author: TEAM_MEMBERS[0],
        content: "Looks great! I'll finalize the typography and colours by EOD.",
        createdAt: '2025-05-25',
      },
    ],
  },
  {
    id: 't2',
    title: 'Set up CI/CD pipeline',
    description:
      'Configure GitHub Actions for automated testing, linting, and deployment to staging and production. Set up environment secrets and deployment notifications in Slack.',
    status: 'todo',
    priority: 'urgent',
    labels: ['DevOps', 'Infrastructure'],
    assignee: TEAM_MEMBERS[3],
    dueDate: '2025-05-25',
    createdAt: '2025-05-15',
    comments: [],
  },
  {
    id: 't3',
    title: 'Write REST API documentation',
    description:
      'Document all REST API endpoints using OpenAPI 3.0 spec. Include request/response examples, authentication details, and error codes for each endpoint.',
    status: 'todo',
    priority: 'medium',
    labels: ['Documentation', 'Backend'],
    assignee: TEAM_MEMBERS[1],
    dueDate: '2025-06-15',
    createdAt: '2025-05-18',
    comments: [
      {
        id: 'c3',
        author: TEAM_MEMBERS[4],
        content:
          'Please prioritize the /auth and /tasks endpoints first so the frontend team can start integration.',
        createdAt: '2025-05-22',
      },
    ],
  },
  {
    id: 't4',
    title: 'Fix JWT token refresh bug',
    description:
      'Users are being logged out unexpectedly when the access token expires. Implement silent refresh using refresh tokens stored in httpOnly cookies.',
    status: 'in_progress',
    priority: 'urgent',
    labels: ['Bug', 'Backend', 'Auth'],
    assignee: TEAM_MEMBERS[1],
    dueDate: '2025-05-30',
    createdAt: '2025-05-23',
    comments: [
      {
        id: 'c4',
        author: TEAM_MEMBERS[2],
        content: 'Reproducing on Safari only. Chrome seems fine. Could be related to SameSite cookie policy.',
        createdAt: '2025-05-26',
      },
    ],
  },
  {
    id: 't5',
    title: 'Implement task filtering & sorting',
    description:
      'Add query parameters to GET /api/tasks: filter by status, priority, assignee, due date range, and labels. Support sorting by created_at, due_date, and priority.',
    status: 'todo',
    priority: 'high',
    labels: ['Backend', 'API'],
    assignee: TEAM_MEMBERS[1],
    dueDate: '2025-06-05',
    createdAt: '2025-05-22',
    comments: [],
  },
  {
    id: 't6',
    title: 'Migrate database to PostgreSQL',
    description:
      'Move from SQLite to PostgreSQL for production readiness. Write migration scripts, update ORM configuration, and test all queries for compatibility.',
    status: 'done',
    priority: 'high',
    labels: ['Backend', 'Database'],
    assignee: TEAM_MEMBERS[3],
    dueDate: '2025-05-20',
    createdAt: '2025-05-10',
    comments: [
      {
        id: 'c5',
        author: TEAM_MEMBERS[3],
        content: 'Migration complete. All 47 tests passing. Deployed to staging and verified.',
        createdAt: '2025-05-20',
      },
    ],
  },
  {
    id: 't7',
    title: 'Real-time notifications via WebSocket',
    description:
      'Implement WebSocket server using Socket.io for real-time task updates, comments, and team notifications. Handle reconnection and message queuing for offline clients.',
    status: 'todo',
    priority: 'low',
    labels: ['Frontend', 'Backend'],
    assignee: TEAM_MEMBERS[2],
    dueDate: '2025-06-25',
    createdAt: '2025-05-25',
    comments: [],
  },
  {
    id: 't8',
    title: 'User profile & settings page',
    description:
      'Build profile settings: update display name, email, password change flow, avatar upload to S3, and notification preferences.',
    status: 'done',
    priority: 'medium',
    labels: ['Frontend'],
    assignee: TEAM_MEMBERS[2],
    dueDate: '2025-05-22',
    createdAt: '2025-05-12',
    comments: [],
  },
  {
    id: 't9',
    title: 'Performance audit & bundle optimisation',
    description:
      'Run Lighthouse audit. Optimise bundle size with code splitting, lazy load routes, implement service worker caching, and improve Core Web Vitals scores.',
    status: 'todo',
    priority: 'medium',
    labels: ['Frontend', 'Performance'],
    assignee: TEAM_MEMBERS[2],
    dueDate: '2025-06-20',
    createdAt: '2025-05-26',
    comments: [],
  },
  {
    id: 't10',
    title: 'Team invitation email flow',
    description:
      'Build invite-by-email feature: generate secure invite tokens, send HTML emails via SendGrid, handle invite acceptance flow with automatic workspace joining.',
    status: 'in_progress',
    priority: 'medium',
    labels: ['Backend', 'Email'],
    assignee: TEAM_MEMBERS[4],
    dueDate: '2025-06-08',
    createdAt: '2025-05-21',
    comments: [
      {
        id: 'c6',
        author: TEAM_MEMBERS[4],
        content:
          'Email templates are ready in SendGrid. Need the /api/invitations endpoint to generate tokens.',
        createdAt: '2025-05-27',
      },
    ],
  },
];
