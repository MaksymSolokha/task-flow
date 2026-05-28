import { Bell } from 'lucide-react';
import Logo from '@/components/Logo.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

const Header = () => {
  return (
    <div className="flex shrink-0 items-center justify-between px-5 h-12 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold text-slate-900">TaskFlow</span>
        </div>
        <Select defaultValue="personal">
          <SelectTrigger className="w-full min-w-44 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="side">Side project</SelectItem>
              <SelectItem value="reading">Reading list</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <Avatar className="w-7 h-7 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700 font-semibold">MS</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
