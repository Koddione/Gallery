import { FacebookLogo } from '@assets/icons/FacebookLogo';
import { GitHubLogo } from '@assets/icons/GitHubLogo';
import { InstagramLogo } from '@assets/icons/InstagramLogo';
import { TwitterLogo } from '@assets/icons/TwitterLogo';

export const socialLinks: {
  component: React.ComponentType<React.PropsWithChildren<object>>;
  name: string;
}[] = [
  { component: TwitterLogo, name: 'twitter' },
  { component: FacebookLogo, name: 'facebook' },
  { component: InstagramLogo, name: 'instagram' },
  { component: GitHubLogo, name: 'github' },
];

export const footerSections = [
  {
    title: 'COMPANY',
    links: ['About', 'Features', 'Works', 'Career'],
  },
  {
    title: 'HELP',
    links: [
      'Customer Support',
      'Delivery Details',
      'Terms & Conditions',
      'Privacy Policy',
    ],
  },
  {
    title: 'FAQ',
    links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  },
  {
    title: 'RESOURCES',
    links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
  },
];
