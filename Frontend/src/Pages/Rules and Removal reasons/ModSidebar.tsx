import {
  Accordion,
  AccordionBody,
  AccordionHeader,
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
import { CommunityIcon } from '../../assets/icons/Icons';
import { cn } from '../../utils/helper_functions';
import { useParams } from 'react-router-dom';

const ModSideBar = ({ className }: { className?: string }) => {
  const { community_name } = useParams();
  const overviews = [
    {
      title: 'Queue',
      icon: <ShieldCheckIcon className='h-5 w-5' />,
      link: `/r/${community_name}/queue`,
    },
    {
      title: 'ScheduledPosts',
      icon: <CommunityIcon className='h-5 w-5' />,
      link: '',
    },
    {
      title: 'User Management',
      icon: <DocumentTextIcon className='h-5 w-5' />,
      link: '',
    },
  ];
  // BE
  const moderation = [
    {
      title: 'Rules and Removal Reasons',
      icon: <CommunityIcon className='h-5 w-5' />,
      link: `/r/${community_name}/about/rules`,
    },
    {
      title: 'User Management',
      icon: <DocumentTextIcon className='h-5 w-5' />,
      link: '',
    },
    {
      title: 'Mod Log',
      icon: <DocumentTextIcon className='h-5 w-5' />,
      link: '',
    },
  ];

  //

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh-var(--navbar-height))] overflow-x-auto w-full p-5 shadow-none border-r',
          className
        )}
      >
        <List className='px-0 min-w-0'>
          <span className='text-gray-700'>
            <ListItemComponent
              icon={<HomeIcon className='h-5 w-5' />}
              title='Exit Mod tools'
              link='/'
            />
          </span>
          <hr className='text-black  my-2 border-blue-gray-50' />
          <AccordionDropDown title='OVERVIEW' list={overviews} />
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='MODERATION' list={moderation} />
          <hr className='my-2 border-blue-gray-50' />
        </List>
      </div>
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
export default ModSideBar;
