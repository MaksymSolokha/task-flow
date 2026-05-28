import { SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

const FilterBar = () => {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 shrink-0">
      <div className="relative flex-1 max-w-xs">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <Input className="pl-8 h-8 text-sm bg-slate-50 border-slate-200 focus:bg-white" placeholder="Search tasks…" />
      </div>

      <Select>
        <SelectTrigger className="h-8 text-sm w-32 bg-slate-50 border-slate-200">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="h-8 text-sm w-32 bg-slate-50 border-slate-200">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All members</SelectItem>
          <SelectItem value="me">Just me</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="h-8 text-sm w-28 bg-slate-50 border-slate-200">
          <SelectValue placeholder="Due date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any date</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-500 text-sm">
          <SlidersHorizontal size={13} />
          More filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
