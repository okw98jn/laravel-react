import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Bell, Info } from 'lucide-react';

interface Notice {
  id: number;
  type: 'info' | 'warning';
  title: string;
  description: string;
}

const notices: Notice[] = [
  {
    id: 1,
    type: 'info',
    title: 'お知らせ',
    description: 'お知らせです',
  },
  {
    id: 2,
    type: 'warning',
    title: '警告',
    description: '警告です',
  },
  {
    id: 3,
    type: 'info',
    title: 'お知らせ',
    description: 'お知らせです',
  },
  {
    id: 4,
    type: 'warning',
    title: '警告',
    description: '警告です',
  },
  {
    id: 5,
    type: 'info',
    title: 'お知らせ',
    description: 'お知らせです',
  },
  {
    id: 6,
    type: 'warning',
    title: '警告',
    description: '警告です',
  },
];

export function Notice() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute top-0 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            {notices.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-60 md:min-w-80 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-1 font-normal">
          お知らせ
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-96">
          <div className="flex flex-col gap-4 p-2">
            {notices.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} />
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NoticeItem = ({ notice }: { notice: Notice }) => {
  return (
    <Card key={notice.id} className="rounded-sm py-2 shadow-none">
      <CardContent>
        <div className="flex items-center gap-2">
          {notice.type === 'info' && <Info className="text-blue-500 w-5 h-5" />}
          {notice.type === 'warning' && (
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{notice.title}</p>
            <p className="text-sm text-muted-foreground">
              {notice.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
