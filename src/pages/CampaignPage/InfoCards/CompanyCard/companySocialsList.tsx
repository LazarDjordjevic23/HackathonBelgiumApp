import { InfoLinkProps } from '../TaskBunnyCard/InfoLink/InfoLink';
import TgIcon from '@/assets/svgs/tg.svg?react';
import XIcon from '@/assets/svgs/x.svg?react';
import WhitepaperIcon from '@/assets/svgs/whitepaper.svg?react';
import DiscordIcon from '@/assets/svgs/discord.svg?react';
import LinkIcon from '@/assets/svgs/link.svg?react';

interface DynamicInfoLinks extends InfoLinkProps {
  dataKey: string;
}

export const companyInfoCardsSocialLinks: DynamicInfoLinks[] = [
  { text: 'Website', icon: <LinkIcon className='[&>*:first-child]:fill-white' />, link: '', dataKey: 'website' },
  {
    text: 'Twitter',
    icon: <XIcon width={10} height={10} />,
    link: '',
    dataKey: 'twitter',
  },
  {
    text: 'Discord',
    icon: <DiscordIcon />,
    link: '',
    dataKey: 'discord',
  },
  {
    text: 'Telegram',
    icon: <TgIcon />,
    link: '',
    dataKey: 'telegram',
  },
  {
    text: 'Whitepaper',
    icon: <WhitepaperIcon />,
    link: '',
    dataKey: 'whitepaper',
  },
];
