import ButtonList from './components/ButtonList';
import SearchBar from './components/SearchBar';
import { getTimeDifferenceAsString } from '../../utils/helper_functions';
import RoundedButton from '../../Components/RoundedButton';
import useSession from '../../hooks/auth/useSession';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { useState } from 'react';
import AddApprovedUser from './AddApprovedUser';
import RemoveApprovedUser from './RemoveApprovedUser';
import LoadingProvider from '../../Components/LoadingProvider';
// import UsersList from './components/UsersList';

type ApprovedUser = {
  username: string;
  approved_at: string;
  profile_picture: string;
  _id: string;
};
const UserRow = ({
  user,
  refetch,
}: {
  user: ApprovedUser;
  refetch: () => void;
}) => {
  const session = useSession();
  const [remUser, setRemUser] = useState(false);
  const buttArr = [
    {
      text: 'Send message',
      onClick: () => {
        window.open(`/message/compose/?to=${user.username}`, '_blank');
      },
    },
    {
      text: 'Remove',
      onClick: () => {
        setRemUser(true);
      },
    },
  ];
  return (
    <>
      <RemoveApprovedUser
        handleOpen={() => {
          setRemUser(!remUser);
        }}
        open={remUser}
        username={user.username}
        refetch={refetch}
      />
      <li className='border-[1px] border-gray-200 p-5' key={user._id}>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center w-[600px]'>
            <div className='flex gap-1 items-center'>
              <img
                src={user.profile_picture}
                alt='prof'
                className='w-12 h-12 rounded-md'
              />
              <div>
                <p className='font-semibold'>{user.username}</p>
                <p className='text-gray-500 font-semibold'>
                  {getTimeDifferenceAsString(new Date(user.approved_at))}
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-3'>
            {buttArr.map((butt, i) => {
              console.log(
                butt,
                i,
                session.user?.username == user.username,
                'qqqqq'
              );

              if (i == 0 && session.user?.username == user.username) {
                return <></>;
              } else {
                return (
                  <RoundedButton
                    buttonText={butt.text}
                    buttonTextColor='text-blue-light font-semibold text-[13px]'
                    buttonBorderColor='border-white'
                    buttonColor='bg-inherit hover:bg-gray-200 hover:!opacity-100'
                    key={butt.text}
                    onClick={butt.onClick}
                  />
                );
              }
            })}
          </div>
        </div>
      </li>
    </>
  );
};
const UsersList = ({
  userArr,
  refetch,
}: {
  userArr: ApprovedUser[];
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

const Contributors = () => {
  const buttArr = [
    {
      text: 'Approve user',
      onClick: () => {
        setAppMod(true);
      },
    },
  ];
  const [appMod, setAppMod] = useState(false);
  // const usersList: ApprovedUser[] = [
  //   {
  //     username: 'maldaxk12sss34d56dx7',
  //     approved_at: '2024-04-11T03:00:53.297Z',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/51964442',
  //     _id: '6618844ad57c873637b5cf43',
  //   },
  //   {
  //     username: 'malaxk1234d567',
  //     approved_at: '2024-04-11T07:51:09.795Z',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/48748592',
  //     _id: '6618844ad57c873637b5cf44',
  //   },
  //   {
  //     username: 'Sadie20',
  //     approved_at: '2024-04-11T07:17:28.324Z',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/40232825',
  //     _id: '6618844ad57c873637b5cf45',
  //   },
  //   {
  //     username: 'maldaxk1234d56dx7',
  //     approved_at: '2024-04-11T08:18:25.843Z',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/239.jpg',
  //     _id: '6618844ad57c873637b5cf46',
  //   },
  //   {
  //     username: 'maldaxk1234d56dx7',
  //     approved_at: '2024-04-11T02:50:14.667Z',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/70.jpg',
  //     _id: '6618844ad57c873637b5cf47',
  //   },
  //   {
  //     username: 'malaxk1234567',
  //     approved_at: '2024-04-11T05:52:45.133Z',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/8218146',
  //     _id: '6618844ad57c873637b5cf48',
  //   },
  // ];
  const { community_name } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedData, setSelectedData] = useState<ApprovedUser[]>([]);
  const { data, isLoading, isError, refetch } = useQuery(
    'getApprovedUsers',
    () => fetchRequest(`communities/about/approved/${community_name}`),
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
      <AddApprovedUser
        handleOpen={() => {
          setAppMod(!appMod);
        }}
        open={appMod}
        refetch={refetch}
      />
      <ButtonList buttArr={buttArr} />
      <SearchBar handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
      <LoadingProvider error={isError} isLoading={isLoading}>
        {data?.data.length > 0 ? (
          <UsersList userArr={selectedData} refetch={refetch} />
        ) : (
          <div className='border-[1px] rounded-md flex items-center justify-center font-semibold text-xl text-gray-600 p-10'>
            Approved list is empty
          </div>
        )}
      </LoadingProvider>
    </div>
  );
};

export default Contributors;
