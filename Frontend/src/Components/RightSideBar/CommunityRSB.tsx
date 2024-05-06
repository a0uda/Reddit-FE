import { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  ListItem,
  ListItemPrefix,
  Avatar,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, postRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CiMail } from 'react-icons/ci';
import { CommunityType } from '../../types/types';

interface CommunityProps {
  name: string;
  communityPage?: boolean | undefined;
  //joined?: boolean;
}

// interface Community {
//   name: string;
//   title: string;
//   description: string;
//   membersNumber: number;
//   onlineMembers: number;
//   rank: number;
// }

export function CommunityRSB({
  name: communityName,
  communityPage: page = false,
}: CommunityProps) {
  // console.log('arrived');

  const [Community, setCommunity] = useState<CommunityType | undefined>();
  const url = window.location.href;
  const { isLoading, isError } = useQuery({
    queryKey: ['communitiesRSB', communityName, page, url],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${communityName}/`),
    onSuccess: (data) => {
      setCommunity(data.data);
    },
    onError: () => {
      console.log('can not fetch community data in RSB');
    },
  });
  // console.log('Community in RSB', Community);

  const [isJoined, setIsJoined] = useState(Community?.joined_flag);

  const joinMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/join-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setIsJoined(true);
      },
      onError: () => {
        console.log('Error in join mutation');
      },
    }
  );

  const leaveMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/leave-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setIsJoined(false);
      },
      onError: () => {
        console.log('Error in leave mutation');
      },
    }
  );

  useEffect(() => {
    setIsJoined(Community?.joined_flag);
  }, [Community, communityName]);

  return (
    <>
      <div
        style={{
          maxHeight: '88vh',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <Card
          className='w-72 bg-gray-100 rounded-xl shadow-none p-0 pb-3 min-w-0 '
          data-testid='community-card'
        >
          <LoadingProvider error={isError} isLoading={isLoading}>
            {!page && (
              <div className='p-4 flex justify-between items-end'>
                <Typography
                  variant='h5'
                  className='p-0 font-body font-semibold -tracking-tight text-black overflow-hidden whitespace-nowrap text-ellipsis'
                >
                  r/{communityName}
                </Typography>
                {!isJoined && (
                  <button
                    className='bg-gray-900 rounded-full font-body font-semibold text-white -tracking-tight text-xs m-0 px-6 py-2 selection:border-0'
                    onClick={() => {
                      joinMutation.mutate(communityName);
                    }}
                    data-testid='join-button'
                  >
                    Join
                  </button>
                )}
                {isJoined && (
                  <button
                    className='bg-gray-200 rounded-full font-body font-semibold text-black -tracking-tight text-xs px-4 py-2 border-black border'
                    onClick={() => {
                      leaveMutation.mutate(communityName);
                    }}
                    data-testid='leave-button'
                  >
                    Joined
                  </button>
                )}
              </div>
            )}
            <div className='px-4'>
              <Typography
                variant='h6'
                className='p-0 font-body font-semibold -tracking-tight text-black'
              >
                {communityName}
              </Typography>
              <Typography
                variant='small'
                className='p-0 font-body font-normal -tracking-tight text-xs text-gray-600'
              >
                {Community?.description}
              </Typography>
              <footer className=' flex items-center justify-between gap-8 border-blue-gray-50 pt-4'>
                <div className='flex flex-col'>
                  <p className='font-body font-bold -tracking-tight text-sm text-black'>
                    {Community?.members_count}
                  </p>
                  <p className='flex items-center gap-1 font-body font-thin -tracking-tight text-xs text-gray-600'>
                    Members
                  </p>
                </div>
              </footer>
            </div>
            <div className='w-100 min-h-px m-1 bg-gray-300'></div>
            <div className='px-4'>
              <CommunityRules name={communityName} />
            </div>
            <div className='w-100 min-h-px m-1 bg-gray-300'></div>
            <div className='px-4'>
              <Typography
                variant='small'
                className='font-body font-semibold -tracking-tight text-xs text-gray-600 py-2 mt-3'
              >
                MODERATORS
              </Typography>
              <CommunityModerators name={communityName} />
            </div>
            <div className='px-4 p-2'>
              <Link to={`/message/compose?to=r/${communityName}`}>
                {/* TODO: change the path */}
                <Button
                  variant='filled'
                  className='w-full h-8 bg-neutral-muted text-black text-sm shadow-none hover:shadow-none flex items-center justify-center hover:underline'
                  data-testid='message-button'
                >
                  <CiMail className='h-5 w-5 mr-2' />
                  Message the mods
                </Button>
              </Link>
            </div>
          </LoadingProvider>
        </Card>
      </div>
    </>
  );
}

interface Rule {
  rule_order: number;
  rule_title: string;
  applies_to: string;
  report_reason: string;
  full_description: string;
}

const CommunityRules = ({ name: communityName }: CommunityProps) => {
  const url = window.location.href;
  const { isLoading, isError } = useQuery({
    queryKey: ['communities/rules/', communityName, url],
    queryFn: () => fetchRequest(`communities/get-rules/${communityName}/`),
    onSuccess: (data) => {
      setMods(data.data);
    },
  });
  const [rulesList, setMods] = useState([]);

  return (
    // <LoadingProvider error={isError} isLoading={isLoading}>
    <>
      <Typography
        variant='small'
        className='font-body font-semibold -tracking-tight text-xs text-gray-600 py-2 mt-3'
      >
        RULES
      </Typography>
      {rulesList.map((rule: Rule, index: number) => (
        <AccordionDropDown
          key={rule.rule_order}
          order={index + 1}
          title={rule.rule_title}
          description={rule.full_description}
        />
      ))}
    </>
    // </LoadingProvider>
  );
};

const CommunityModerators = ({ name: communityName }: CommunityProps) => {
  const url = window.location.href;
  const { isLoading, isError } = useQuery({
    queryKey: ['communities/about/moderators', communityName, url],
    queryFn: () =>
      fetchRequest(`communities/about/moderators/${communityName}/`),
    onSuccess: (data) => {
      setMods(data.data);
    },
  });
  const [moderatorsList, setMods] = useState([]);

  return (
    // <LoadingProvider error={isError} isLoading={isLoading}>
    <>
      {moderatorsList.map((community: ModeratorProps, index: number) => (
        <ModeratorItem
          key={index}
          profile_picture={community.profile_picture}
          username={community.username}
        />
      ))}
    </>
    // </LoadingProvider>
  );
};

interface ModeratorProps {
  profile_picture: string;
  username: string;
}

const ModeratorItem = ({
  profile_picture: avatar,
  username: name,
}: ModeratorProps) => {
  return (
    <div>
      <div className='flex items-center rounded-none p-1'>
        <ListItemPrefix>
          <Avatar
            variant='circular'
            alt='candice'
            src={
              avatar ||
              'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
            }
            style={{ width: '35px', height: '35px' }}
          />
        </ListItemPrefix>
        <div>
          <a href='' className='hover:underline'>
            <Typography
              variant='small'
              className='font-body font-thin -tracking-tight text-sm text-gray-900'
            >
              u/{name}
            </Typography>
          </a>
        </div>
      </div>
    </div>
  );
};

type AccordionDropDownProps = {
  order: number;
  title: string;
  description: string;
};

const AccordionDropDown = ({
  order,
  title,
  description,
}: AccordionDropDownProps) => {
  const [open, setOpen] = useState(false);

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
        <ListItem className='p-0 rounded-none'>
          <AccordionHeader
            onClick={() => setOpen((prev) => !prev)}
            className='border-b-0 p-3 px-4'
          >
            <div className='flex gap-4 items-center'>
              <Typography className='mr-auto text-neutral-900 font-light text-sm'>
                {order}
              </Typography>
              <Typography className='mr-auto text-neutral-900 font-light text-sm'>
                {title}
              </Typography>
            </div>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className='py-1'>
          <List className='p-0 text-black'>
            <Typography
              variant='small'
              className='font-body font-normal -tracking-tight text-xs text-gray-600 px-4 py-2'
            >
              {description}
            </Typography>
          </List>
        </AccordionBody>
      </Accordion>
    </>
  );
};
