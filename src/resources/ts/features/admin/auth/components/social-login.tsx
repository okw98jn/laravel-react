import github from '@/assets/images/github.png';
import google from '@/assets/images/google.png';
import { Button } from '@/components/ui/button';

export function SocialLogin() {
  const providers = [
    { name: 'Google', icon: google },
    { name: 'GitHub', icon: github },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {providers.map((provider) => (
        <Button variant="outline" type="button" key={provider.name}>
          <img src={provider.icon} alt={provider.name} width={20} height={20} />
          {provider.name}
        </Button>
      ))}
    </div>
  );
}
