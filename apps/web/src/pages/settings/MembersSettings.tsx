import { useState } from 'react';
import { Crown, MoreHorizontal, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import Modal from '@/components/ui/modal.tsx';
import { TEAM_MEMBERS } from '@/lib/mock-data.ts';

const ROLES: Record<string, string> = {
  u1: 'Owner',
  u2: 'Admin',
  u3: 'Member',
  u4: 'Member',
  u5: 'Member',
};

const STATUSES: Record<string, { label: string; cls: string }> = {
  u1: { label: 'Active', cls: 'text-emerald-600 bg-emerald-50' },
  u2: { label: 'Active', cls: 'text-emerald-600 bg-emerald-50' },
  u3: { label: 'Active', cls: 'text-emerald-600 bg-emerald-50' },
  u4: { label: 'Active', cls: 'text-emerald-600 bg-emerald-50' },
  u5: { label: 'Pending', cls: 'text-yellow-600 bg-yellow-50' },
};

const MembersSettings = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <div className="max-w-2xl px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Members</h2>
            <p className="text-sm text-slate-500 mt-1">
              {TEAM_MEMBERS.length} members in this workspace.
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => setIsInviteOpen(true)}
          >
            <UserPlus size={14} />
            Invite member
          </Button>
        </div>

        {/* Members table */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 bg-slate-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Member</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Role</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</span>
            <span className="w-6" />
          </div>
          {TEAM_MEMBERS.map((m) => {
            const role = ROLES[m.id];
            const status = STATUSES[m.id];
            return (
              <div
                key={m.id}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3.5 border-b border-gray-100 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${m.color} text-white text-xs font-bold grid place-items-center shrink-0`}>
                    {m.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-slate-800 truncate">{m.name}</p>
                      {role === 'Owner' && <Crown size={12} className="text-yellow-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{m.email}</p>
                  </div>
                </div>

                <span className="text-xs text-slate-500 font-medium">{role}</span>

                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.cls}`}>
                  {status.label}
                </span>

                <button className="w-6 h-6 rounded grid place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite modal */}
      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invite team member" size="sm">
        <div className="px-6 py-5 space-y-4">
          <Field>
            <FieldLabel htmlFor="inv-email">Email address</FieldLabel>
            <Input id="inv-email" type="email" placeholder="colleague@example.com" />
          </Field>
          <Field>
            <FieldLabel>Role</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {['Admin', 'Member'].map((r) => (
                <button
                  key={r}
                  className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${
                    r === 'Member'
                      ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-slate-600 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium">{r}</p>
                  <p className="text-xs text-current opacity-70 mt-0.5">
                    {r === 'Admin' ? 'Can manage workspace' : 'Can view and edit tasks'}
                  </p>
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <Button variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setIsInviteOpen(false)}>
            Send invite
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MembersSettings;
