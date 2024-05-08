import { useState } from 'react';
import ButtonList from './components/ButtonList';
import SearchBar from './components/SearchBar';
import { getTimeDifferenceAsString } from '../../utils/helper_functions';
import RoundedButton from '../../Components/RoundedButton';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import MuteUser from './MuteUser';
import UnmuteUser from './UnmuteUser';
import LoadingProvider from '../../Components/LoadingProvider';

type MutedUser = {
  username: string;
  muted_by_username: string;
  mute_date: string;
  mute_reason: string;
  profile_picture: string;
  _id: string;
};
const UserRow = ({
  user,
  refetch,
}: {
  user: MutedUser;
  refetch: () => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [unMuteMod, setUnMuteMod] = useState(false);
  const buttArr = [
    {
      text: 'Unmute',
      onClick: () => {
        setUnMuteMod(true);
      },
    },
    {
      text: 'More Details',
      onClick: () => {
        setShowDetails(!showDetails);
      },
    },
  ];
  return (
    <>
      <UnmuteUser
        handleOpen={() => {
          setUnMuteMod(!unMuteMod);
        }}
        open={unMuteMod}
        username={user.username}
        refetch={refetch}
      />
      <li className='border-[1px] border-gray-200 p-5' key={user._id}>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center w-[600px]'>
            <div className='flex gap-1 items-center'>
              <img
                src={
                  user.profile_picture ||
                  'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                }
                alt='prof'
                className='w-12 h-12 rounded-md'
              />
              <div>
                <p className='font-semibold'>{user.username}</p>
                <p className='text-gray-500 font-semibold'>
                  {getTimeDifferenceAsString(new Date(user.mute_date))}
                </p>
              </div>
            </div>
            {user.mute_reason && (
              <p className='text-gray-600'>{'•    ' + user.mute_reason}</p>
            )}
          </div>
          <div className='flex gap-3'>
            {buttArr.map((butt, i) => (
              <RoundedButton
                buttonText={butt.text}
                buttonTextColor='text-blue-light font-semibold text-[13px]'
                buttonBorderColor='border-white'
                buttonColor='bg-inherit hover:bg-gray-200 hover:!opacity-100'
                key={butt.text}
                imgRight={
                  i == 1 && showDetails ? (
                    <ChevronUpIcon className='w-3 h-3' />
                  ) : i == 1 && !showDetails ? (
                    <ChevronDownIcon className='w-3 h-3' />
                  ) : (
                    <></>
                  )
                }
                onClick={butt.onClick}
              />
            ))}
          </div>
        </div>
      </li>
      {showDetails && (
        <div className='bg-gray-200 p-3'>
          {user.mute_reason ? (
            <p className='uppercase font-semibold text-sm flex gap-5'>
              {'MOD NOTE ' + user.muted_by_username + ':'}
              <span className='normal-case font-normal'>
                {user.mute_reason}
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-500'>No mod note.</p>
          )}
        </div>
      )}
    </>
  );
};
const UsersList = ({
  userArr,
  refetch,
}: {
  userArr: MutedUser[];
  refetch: () => void;
}) => {
  return (
    <ul className='last:rounded-b-md'>
      {userArr &&
        userArr.map((user) => (
          <UserRow key={user._id} user={user} refetch={refetch} />
        ))}
    </ul>
  );
};

const Muted = () => {
  const buttArr = [
    {
      text: 'Mute user',
      onClick: () => {
        setMuteMod(true);
      },
    },
  ];
  const [muteMod, setMuteMod] = useState(false);
  // const mutedList: MutedUser[] = [
  //   {
  //     username: 'Rick.Rempel-Hermiston',
  //     muted_by_username: 'Arely_Lockman20',
  //     mute_date: '2024-04-11T19:40:34.973Z',
  //     mute_reason: 'Claro neque tabesco tutis argumentum.',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/776.jpg',
  //     _id: '66186ace721cbd6382326184',
  //   },
  //   {
  //     username: 'ahmedToaima',
  //     muted_by_username: 'Arely_Lockman20',
  //     mute_date: '2024-04-11T19:40:34.973Z',
  //     mute_reason: 'Claro neque tabesco tutis argumentum.',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/776.jpg',
  //     _id: '66186ace721cbd6382326684',
  //   },
  // ];
  const { community_name } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedData, setSelectedData] = useState<MutedUser[]>([]);
  const url = window.location.href;
  const { data, isLoading, isError, refetch } = useQuery(
    ['getMutedUsers', url],
    () => fetchRequest(`communities/about/muted/${community_name}`),
    {
      onSuccess: (data) => {
        setSelectedData(data.data);
      },
    }
  );

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      return setSelectedData(data?.data);
    } else {
      const queryLowerCase = searchQuery.toLowerCase();
      setSelectedData(
        data?.data.filter((item) =>
          item.username.toLowerCase().includes(queryLowerCase)
        )
      );

      if (selectedData.length <= 0) {
        setSelectedData([]);
      }
    }
  };

  return (
    <div>
      <MuteUser
        handleOpen={() => {
          setMuteMod(!muteMod);
        }}
        open={muteMod}
        refetch={refetch}
      />
      <ButtonList buttArr={buttArr} />
      <SearchBar handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
      <LoadingProvider error={isError} isLoading={isLoading}>
        {data?.data.length > 0 ? (
          <UsersList userArr={selectedData} refetch={refetch} />
        ) : (
          <div className='border-[1px] rounded-md flex items-center justify-center font-semibold text-xl text-gray-600 p-10'>
            Muted list is empty
          </div>
        )}{' '}
      </LoadingProvider>
    </div>
  );
};

export default Muted;
