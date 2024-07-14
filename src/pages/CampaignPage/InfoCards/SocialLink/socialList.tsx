import { InfoLinkProps } from '../TaskBunnyCard/InfoLink/InfoLink';
import TgIcon from '@/assets/svgs/tg.svg?react';
import XIcon from '@/assets/svgs/x.svg?react';
import WhitepaperIcon from '@/assets/svgs/whitepaper.svg?react';
import DiscordIcon from '@/assets/svgs/discord.svg?react';

export const infoCardsSocialLinks: InfoLinkProps[] = [
  {
    text: 'Telegram',
    icon: <TgIcon />,
    link: '',
  },
  {
    text: 'Twitter',
    icon: <XIcon width={10} height={10} />,
    link: '',
  },
  {
    text: 'Whitepaper',
    icon: <WhitepaperIcon />,
    link: '',
  },
  {
    text: 'Discord',
    icon: <DiscordIcon />,
    link: '',
  },
];
