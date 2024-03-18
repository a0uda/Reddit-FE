import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  HomeIcon,
  ArrowTrendingUpIcon,
  ChartBarSquareIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import { CommunityIcon } from '../assets/icons/Icons';

const SideBar = ({ className }: { className?: string }) => {
  const moderation = [
    {
      title: 'Mod Queue',
      icon: <ShieldCheckIcon className='h-5 w-5' />,
    },
    {
      title: 'Mod Mail',
      icon: <EnvelopeIcon className='h-5 w-5' />,
    },
    {
      title: 'r/Mod',
      icon: <ShieldCheckIcon className='h-5 w-5' />,
    },
  ];
  const recent = [
    {
      title: 'r/SWECommunity',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'r/gamming',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'r/AhayEveryDay',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
  ];
  const resources = [
    {
      title: 'About Reddit',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'Advertise',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'Help',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'Blog',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'Careers',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
    {
      title: 'Press',
      icon: <CommunityIcon className='h-5 w-5' />,
    },
  ];
  return (
    <>
      <Card
        className={
          'lg-max:hidden h-[calc(100vh-3.5rem)] overflow-x-auto w-full py-4 px-0 shadow-none ' +
          className
        }
      >
        <List className='text-black *:text-black px-0 min-w-0'>
          {/* Home... */}
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className='h-5 w-5' />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ArrowTrendingUpIcon className='h-5 w-5' />
            </ListItemPrefix>
            Popular
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ChartBarSquareIcon className='h-5 w-5' />
            </ListItemPrefix>
            All
          </ListItem>
          <hr className='my-2 border-blue-gray-50' />
          {/* Moderation: Accordion */}
          <AccordionDropDown title='Moderation' list={moderation} />
          <hr className='my-2 border-blue-gray-50' />
          <ListItem>
            <ListItemPrefix>
              <PlusIcon className='h-5 w-5' />
            </ListItemPrefix>
            Create Community
          </ListItem>
          <AccordionDropDown title='Recent' list={recent} />
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='Resources' list={resources} />
          <hr className='my-2 border-blue-gray-50' />
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Communities
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Best of Reddit
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Topics
          </ListItem>
          <hr className='my-2 border-blue-gray-50' />
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Content Policy
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Privacy Policy
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            User Agreement
          </ListItem>
          <hr className='my-2 border-blue-gray-50' />
        </List>
      </Card>
    </>
  );
};

type AccordionDropDownProps = {
  title: string;
  list: {
    title: string;
    icon: ReactNode;
  }[];
};

const AccordionDropDown = ({ title, list }: AccordionDropDownProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Accordion
        open={open}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        }
      >
        <ListItem className='p-0'>
          <AccordionHeader
            onClick={() => setOpen((prev) => !prev)}
            className='border-b-0 p-3'
          >
            <Typography className='mr-auto text-neutral-900 font-light uppercase text-sm'>
              {title}
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className='py-1'>
          <List className='p-0 text-black'>
            {list.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  {item.title}
                </ListItem>
              </div>
            ))}
          </List>
        </AccordionBody>
      </Accordion>
    </>
  );
};

{
  /* <ListItem>
<ListItemPrefix>
  <InboxIcon className='h-5 w-5' />
</ListItemPrefix>
Inbox
<ListItemSuffix>
  <Chip
    value='14'
    size='sm'
    variant='ghost'
    color='blue-gray'
    className='rounded-full'
  />
</ListItemSuffix>
</ListItem> */
}

export default SideBar;
