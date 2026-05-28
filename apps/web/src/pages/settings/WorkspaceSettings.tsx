import { AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';

const WorkspaceSettings = () => (
  <div className="max-w-2xl px-8 py-8">
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900">Workspace</h2>
      <p className="text-sm text-slate-500 mt-1">Manage your workspace settings and billing.</p>
    </div>

    {/* General */}
    <div className="space-y-5 pb-8 mb-8 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-slate-700">General</h3>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-indigo-600 grid place-items-center text-white text-xl font-bold shrink-0">
          T
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-2">Workspace icon</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">Upload logo</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
          </div>
        </div>
      </div>

      <Field>
        <FieldLabel htmlFor="ws-name">Workspace name</FieldLabel>
        <Input id="ws-name" defaultValue="Personal" />
      </Field>

      <Field>
        <FieldLabel htmlFor="ws-slug">URL slug</FieldLabel>
        <div className="flex items-center rounded-md border border-input overflow-hidden">
          <span className="px-3 py-2 text-sm text-slate-400 bg-slate-50 border-r border-input shrink-0">
            taskflow.io/
          </span>
          <input
            id="ws-slug"
            defaultValue="personal"
            className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none"
          />
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="ws-desc">Description</FieldLabel>
        <textarea
          id="ws-desc"
          rows={2}
          defaultValue="Personal workspace for side projects and learning."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </Field>
    </div>

    {/* Plan */}
    <div className="pb-8 mb-8 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Plan & billing</h3>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 grid place-items-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-900">Pro Plan</p>
              <p className="text-xs text-indigo-600">5 members · 10 GB storage · Unlimited tasks</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-indigo-700 hover:bg-indigo-100">
            Manage
          </Button>
        </div>
        <div className="mt-3 pt-3 border-t border-indigo-200 flex items-center justify-between">
          <p className="text-xs text-indigo-600">Next payment: <span className="font-medium">Jun 1, 2025</span> · $12/mo</p>
          <button className="text-xs text-indigo-600 hover:underline">View invoices</button>
        </div>
      </div>
    </div>

    {/* Save */}
    <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-100">
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save changes</Button>
      <Button variant="ghost">Cancel</Button>
    </div>

    {/* Danger zone */}
    <div>
      <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
        <AlertTriangle size={14} />
        Danger zone
      </h3>
      <div className="rounded-xl border border-red-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">Delete workspace</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently delete this workspace and all its data.</p>
          </div>
          <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200">
            Delete workspace
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default WorkspaceSettings;
