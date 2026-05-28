import { Link } from 'react-router-dom';
import Logo from '@/components/Logo.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input.tsx';

const Register = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="p-8 bg-white rounded-2xl flex flex-col gap-5 w-full max-w-sm shadow-sm border border-gray-100">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <span className="text-lg font-semibold">TaskFlow</span>
        </div>

        <div className="flex flex-col gap-0.5 text-center">
          <span className="text-xl font-semibold text-slate-900">Create an account</span>
          <span className="text-sm text-slate-400">Start managing your tasks today</span>
        </div>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="fullname">Full name</FieldLabel>
            <Input id="fullname" type="text" placeholder="Jane Smith" />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="jane@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="Min. 8 characters" />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
            <Input id="confirm" type="password" placeholder="Repeat your password" />
          </Field>
        </div>

        <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          Create account
        </Button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
