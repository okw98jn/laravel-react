import { TriangleAlert } from 'lucide-react';

type Props = {
  title: string;
  message: string;
};

export function LoginFailedMessage({ title, message }: Props) {
  return (
    <div className="text-red-500 text-sm border border-red-500 rounded px-4 py-2 flex items-center">
      <TriangleAlert className="mr-4 w-5" />
      <p>
        <span className="block">{title}</span>
        <span className="text-xs">{message}</span>
      </p>
    </div>
  );
}
