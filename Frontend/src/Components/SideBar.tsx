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
import { CommunityIcon } from '../assets/icons/Icons';
import { cn } from '../utils/helper_functions';
import { useQuery } from 'react-query';
import { CommunityType } from '../types/types';
import { fetchRequest } from '../API/User';

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

  const [communities, setCommunities] = useState<ListItemProps[] | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const communitiesResponse = useQuery({
    queryKey: ['communities'],
    queryFn: () => fetchRequest(`users/communities/`),
    onSuccess: (data) => {
      const formattedCommunities = data.data?.map(
        (community: CommunityType) => ({
          icon: community.profile_picture || (
            <CommunityIcon className='h-5 w-5' />
          ),
          title: 'r/' + community.name,
          link: `/r/${community.name}`,
        })
      );

      const communityList: ListItemProps[] = formattedCommunities || [];

      console.log('communityList', communityList);

      setCommunities(communityList);
    },
  });

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh-var(--navbar-height))] overflow-x-auto w-full p-5 shadow-none border-r',
          className
        )}
        // style={{ scrollbarWidth: 'none' }} // Hide scrollbar
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
          {communities && communities?.length > 0 && (
            <>
              <AccordionDropDown title='Communities' list={communities!}>
                <ListItemComponent
                  icon={<PlusIcon className='h-5 w-5' />}
                  title='Create Community'
                />
              </AccordionDropDown>
            </>
          )}
          <hr className='my-2 border-blue-gray-50' />
          <AccordionDropDown title='Create Post' list={createPost} />
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
export default SideBar;
