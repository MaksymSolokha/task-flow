import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout.tsx';
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import Tasks from '@/pages/Tasks.tsx';
import MyTasks from '@/pages/MyTasks.tsx';
import Inbox from '@/pages/Inbox.tsx';
import Completed from '@/pages/Completed.tsx';
import Settings from '@/pages/settings/Settings.tsx';
import ProfileSettings from '@/pages/settings/ProfileSettings.tsx';
import WorkspaceSettings from '@/pages/settings/WorkspaceSettings.tsx';
import MembersSettings from '@/pages/settings/MembersSettings.tsx';
import NotificationsSettings from '@/pages/settings/NotificationsSettings.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'my-tasks', element: <MyTasks /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'completed', element: <Completed /> },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          { index: true, element: <Navigate to="/settings/profile" replace /> },
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'workspace', element: <WorkspaceSettings /> },
          { path: 'members', element: <MembersSettings /> },
          { path: 'notifications', element: <NotificationsSettings /> },
        ],
      },
    ],
  },
]);
