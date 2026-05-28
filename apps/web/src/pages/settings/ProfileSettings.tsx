import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';

const ProfileSettings = () => (
  <div className="max-w-2xl px-8 py-8">
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
      <p className="text-sm text-slate-500 mt-1">Manage your personal information and password.</p>
    </div>

    {/* Avatar */}
    <div className="flex items-center gap-5 pb-8 mb-8 border-b border-gray-100">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-indigo-600 text-white text-2xl font-bold grid place-items-center">
          MS
        </div>
        <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors grid place-items-center shadow-sm">
          <Camera size={13} />
        </button>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">Maksim Soloha</p>
        <p className="text-xs text-slate-400 mt-0.5">maksim.solokha0411@gmail.com</p>
        <div className="flex gap-2 mt-3">
          <Button variant="ghost" size="sm" className="h-7 text-xs">Upload photo</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
        </div>
      </div>
    </div>

    {/* Personal info */}
    <div className="space-y-5 pb-8 mb-8 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-slate-700">Personal information</h3>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="p-fname">First name</FieldLabel>
          <Input id="p-fname" defaultValue="Maksim" />
        </Field>
        <Field>
          <FieldLabel htmlFor="p-lname">Last name</FieldLabel>
          <Input id="p-lname" defaultValue="Soloha" />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="p-email">Email address</FieldLabel>
        <div className="relative">
          <Input id="p-email" type="email" defaultValue="maksim.solokha0411@gmail.com" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="p-role">Job title</FieldLabel>
        <Input id="p-role" defaultValue="Full-stack Developer" />
      </Field>

      <Field>
        <FieldLabel htmlFor="p-bio">Bio</FieldLabel>
        <textarea
          id="p-bio"
          rows={3}
          defaultValue="Building TaskFlow — learning backend development one endpoint at a time."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </Field>
    </div>

    {/* Change password */}
    <div className="space-y-5 pb-8 mb-8 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-slate-700">Change password</h3>

      <Field>
        <FieldLabel htmlFor="p-curpw">Current password</FieldLabel>
        <Input id="p-curpw" type="password" placeholder="Enter current password" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="p-newpw">New password</FieldLabel>
          <Input id="p-newpw" type="password" placeholder="Min. 8 characters" />
        </Field>
        <Field>
          <FieldLabel htmlFor="p-confpw">Confirm password</FieldLabel>
          <Input id="p-confpw" type="password" placeholder="Repeat new password" />
        </Field>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save changes</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  </div>
);

export default ProfileSettings;
