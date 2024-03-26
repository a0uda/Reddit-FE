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
  HomeIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import { CommunityIcon } from '../assets/icons/Icons';

const SideBar = ({ className }: { className?: string }) => {
  const moderation = [
    {
      title: 'r/Mod',
      icon: <ShieldCheckIcon className='h-5 w-5' />,
      link: '/r/Mod',
    },
  ];
  // BE
  const recent = [
    {
      title: 'r/SWECommunity',
      icon: <CommunityIcon className='h-5 w-5' />,
      link: '/r/SWECommunity',
    },
    {
      title: 'r/gamming',
      icon: <CommunityIcon className='h-5 w-5' />,
      link: '/r/gamming',
    },
    {
      title: 'r/AhayEveryDay',
      icon: <CommunityIcon className='h-5 w-5' />,
      link: '/r/AhayEveryDay',
    },
  ];
  const createPost = [
    {
      title: 'Input Text',
      icon: <DocumentTextIcon className='h-5 w-5' />,
      link: '/submit?type=text',
    },
    {
      title: 'Image & Video',
      icon: <PhotoIcon className='h-5 w-5' />,
      link: '/submit?type=media',
    },
    {
      title: 'Link',
      icon: <LinkIcon className='h-5 w-5' />,
      link: '/submit?type=link',
    },
  ];
  return (
    <>
      <Card
        className={
          ' h-[calc(100vh-3.5rem)] overflow-x-auto w-full py-4 px-0 shadow-none ' +
          className
        }
      >
        <List className='text-black *:text-black px-0 min-w-0'>
          <ListItemComponent
            icon={<HomeIcon className='h-5 w-5' />}
            title='Home'
            link='/'
          />
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='Moderation' list={moderation} />
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='Recent' list={recent} />
          <hr className='my-2 border-blue-gray-50' />
          {/* BE */}
          <AccordionDropDown title='Communities' list={recent}>
            <ListItemComponent
              icon={<PlusIcon className='h-5 w-5' />}
              title='Create Community'
            />
          </AccordionDropDown>
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='Create Post' list={createPost} />
          <hr className='my-2 border-blue-gray-50' />
        </List>
      </Card>
    </>
  );
};

type ListItemProps = {
  icon: ReactNode;
  title: string;
  link?: string;
};

const ListItemComponent = ({ icon, title, link }: ListItemProps) => {
  return (
    <a href={link}>
      <ListItem>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </ListItem>
    </a>
  );
};

type AccordionDropDownProps = {
  title: string;
  list: {
    title: string;
    icon: ReactNode;
    link?: string;
  }[];
  children?: ReactNode;
};

const AccordionDropDown = ({
  title,
  list,
  children,
}: AccordionDropDownProps) => {
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
            {children}
            {list.map((item, index) => (
              <div key={index}>
                <a href={item.link}>
                  <ListItem>
                    <ListItemPrefix>{item.icon}</ListItemPrefix>

                    {item.title}
                  </ListItem>
                </a>
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
