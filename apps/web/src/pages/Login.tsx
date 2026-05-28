import { Link } from 'react-router-dom';
import Logo from '@/components/Logo.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input.tsx';

const Login = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="p-8 bg-white rounded-2xl flex flex-col gap-5 w-full max-w-sm shadow-sm border border-gray-100">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <span className="text-lg font-semibold">TaskFlow</span>
        </div>

        <div className="flex flex-col gap-0.5 text-center">
          <span className="text-xl font-semibold text-slate-900">Sign in</span>
          <span className="text-sm text-slate-400">Welcome back — good to see you again</span>
        </div>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="example@gmail.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="Your password" />
          </Field>
        </div>

        <div className="flex justify-end -mt-2">
          <button type="button" className="text-xs text-indigo-600 hover:underline">
            Forgot password?
          </button>
        </div>

        <Button
          size="lg"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
