import logo from '@/assets/images/logo.svg';

interface Props {
  text: string;
}

export function Header({ text }: Props) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <img src={logo} alt="logo" width={30} height={30} />
      <h1 className="text-2xl font-semibold tracking-tight">{text}</h1>
    </div>
  );
}
