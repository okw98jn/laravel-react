import { Link } from '@tanstack/react-router';

interface Props {
  text: string;
  to: '/register' | '/login';
}

export function Footer({ text, to }: Props) {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      {text}
      <Link
        to={to}
        className="underline underline-offset-4 text-blue-500 hover:text-blue-600"
      >
        こちら
      </Link>
    </p>
  );
}
