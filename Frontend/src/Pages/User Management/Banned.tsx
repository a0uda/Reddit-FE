import React, { useState } from 'react';
import ButtonList from './components/ButtonList';
import SearchBar from './components/SearchBar';
import { getTimeDifferenceAsString } from '../../utils/helper_functions';
import RoundedButton from '../../Components/RoundedButton';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { useParams } from 'react-router-dom';

type BannedUser = {
  username: string;
  banned_date: string;
  reason_for_ban: string;
  mod_note: string;
  permanent_flag: boolean;
  banned_until: string | null;
  note_for_ban_message: string;
  profile_picture: string;
  _id: string;
};
const UserRow = ({ user }: { user: BannedUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const buttArr = [
    { text: 'Edit', onClick: () => {} },
    {
      text: 'More Details',
      onClick: () => {
        setShowDetails(!showDetails);
      },
    },
  ];
  return (
    <>
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
                  {getTimeDifferenceAsString(new Date(user.banned_date))}
                  {' (' +
                    (user.permanent_flag
                      ? 'Permenant'
                      : getTimeDifferenceAsString(
                          new Date(user.banned_until)
                        )) +
                    ')'}
                </p>
              </div>
            </div>
            {user.reason_for_ban && (
              <p className='text-gray-600'>{'•    ' + user.reason_for_ban}</p>
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
          {user.mod_note && (
            <p className='uppercase font-semibold text-sm flex gap-5'>
              {'MOD NOTE ' + user.username + ':'}
              <span className='normal-case font-normal'>{user.mod_note}</span>
            </p>
          )}
          {user.reason_for_ban && (
            <p className='uppercase font-semibold text-sm flex gap-5'>
              {'BANNED FOR ' + user.username + ':'}
              <span className='normal-case font-normal'>
                {user.reason_for_ban}
              </span>
            </p>
          )}
          {!user.mod_note && !user.reason_for_ban && (
            <p className='text-sm text-gray-500'>No mod note.</p>
          )}
        </div>
      )}
    </>
  );
};
const UsersList = ({ userArr }: { userArr: BannedUser[] }) => {
  return (
    <ul className='last:rounded-b-md'>
      {userArr && userArr.map((user) => <UserRow key={user._id} user={user} />)}
    </ul>
  );
};
const Banned = () => {
  const buttArr = [{ text: 'Ban user', onClick: () => {} }];
  // const userList: BannedUser[] = [
  //   {
  //     username: 'Emanuel.Gusikowski',
  //     banned_date: '2024-04-11T03:55:03.127Z',
  //     reason_for_ban: 'rule',
  //     mod_note: 'Cursus voluptate verbum comprehendo tam vobis uberrime.',
  //     permanent_flag: false,
  //     banned_until: '2024-07-30T12:43:29.146Z',
  //     note_for_ban_message:
  //       'Acquiro victoria ocer pauper eaque umerus adsum exercitationem tribuo ars.',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/444.jpg',
  //     _id: '66186ace721cbd638232618a',
  //   },
  //   {
  //     username: 'Frances_Kunde39',
  //     banned_date: '2024-04-11T11:18:30.280Z',
  //     reason_for_ban: 'spam',
  //     mod_note: 'Degusto minus templum ambulo.',
  //     permanent_flag: false,
  //     banned_until: '2025-01-29T15:33:44.391Z',
  //     note_for_ban_message: 'Capto qui carcer cattus.',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/98405305',
  //     _id: '66186ace721cbd638232618b',
  //   },
  //   {
  //     username: 'Dorothea48',
  //     banned_date: '2024-04-11T19:59:07.443Z',
  //     reason_for_ban: 'spam',
  //     mod_note: 'Torqueo cunabula audax deripio sortitus coepi virtus tutis.',
  //     permanent_flag: false,
  //     banned_until: '2025-01-15T11:01:14.293Z',
  //     note_for_ban_message:
  //       'Amplexus uredo circumvenio textus testimonium conitor arto undique utrum.',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/64523131',
  //     _id: '66186ace721cbd638232618c',
  //   },
  //   {
  //     username: 'Astrid_Nader11',
  //     banned_date: '2024-04-11T17:14:29.474Z',
  //     reason_for_ban: 'rule',
  //     mod_note: 'Apud culpa spero cunabula ratione approbo.',
  //     permanent_flag: false,
  //     banned_until: '2024-11-27T06:03:06.740Z',
  //     note_for_ban_message:
  //       'Audeo amet officiis dolor tredecim tutis numquam coniuratio.',
  //     profile_picture:
  //       'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/806.jpg',
  //     _id: '66186ace721cbd638232618d',
  //   },
  //   {
  //     username: 'Lon84',
  //     banned_date: '2024-04-11T13:52:03.217Z',
  //     reason_for_ban: 'others',
  //     mod_note: 'Atque quam confido commemoro.',
  //     permanent_flag: true,
  //     banned_until: null,
  //     note_for_ban_message:
  //       'Tamisium virtus cruciamentum curriculum autus cedo animi defessus.',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/21194292',
  //     _id: '66186ace721cbd638232618e',
  //   },
  //   {
  //     username: 'Felicita48',
  //     banned_date: '2024-04-11T19:07:11.061Z',
  //     reason_for_ban: 'threat',
  //     mod_note:
  //       'Comes comis denego spiculum caecus cetera crepusculum viriliter surculus coadunatio.',
  //     permanent_flag: false,
  //     banned_until: '2024-11-15T15:56:39.919Z',
  //     note_for_ban_message: 'Delego tibi derideo blanditiis.',
  //     profile_picture: 'https://avatars.githubusercontent.com/u/37121191',
  //     _id: '66186ace721cbd638232618f',
  //   },
  // ];
  const { communityName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedData, setSelectedData] = useState<BannedUser[]>([]);
  const { data, isLoading, isError } = useQuery(
    'getBannedUsers',
    () => fetchRequest(`communities/about/banned/${communityName}`),
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
      <ButtonList buttArr={buttArr} />
      <SearchBar handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
      <UsersList userArr={data?.data} />
    </div>
  );
};

export default Banned;
