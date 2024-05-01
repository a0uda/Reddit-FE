import React from 'react';
import ButtonList from './components/ButtonList';
import SearchBar from './components/SearchBar';
import { getTimeDifferenceAsString } from '../../utils/helper_functions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

type ModeratorUser = {
  has_access: {
    everything: boolean;
    manage_users: boolean;
    manage_settings: boolean;
    manage_posts_and_comments: boolean;
  };
  username: string;
  profile_picture: string;
  moderator_since: string;
  _id: string;
};
const UserRow = ({
  user,
  type,
}: {
  user: ModeratorUser;
  type: 'edit' | 'invite' | 'default';
}) => {
  const permissionsArray = [
    { text: 'Everything', perm: user.has_access.everything },
    {
      text: 'Manage Users',
      perm: user.has_access.manage_users,
    },
    {
      text: 'Manage Settings',
      perm: user.has_access.manage_settings,
    },
    {
      text: 'Manage Posts and Comments',
      perm: user.has_access.manage_posts_and_comments,
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
                  {getTimeDifferenceAsString(new Date(user.moderator_since))}
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-3'>
            {permissionsArray.map((perm, i) => {
              if (permissionsArray[0].perm) {
                if (i == 0) {
                  return (
                    <p className='text-xs text-gray-500' key={i}>
                      {perm.text}
                    </p>
                  );
                } else {
                  return <></>;
                }
              } else {
                if (perm.perm) {
                  return (
                    <p className='text-xs text-gray-500' key={i}>
                      {perm.text}
                    </p>
                  );
                }
              }
            })}
            {type == 'edit' && (
              <PencilIcon className='cursor-pointer w-4 h-4 text-gray-500' />
            )}
            {type == 'invite' && (
              <TrashIcon className='cursor-pointer w-4 h-4 text-gray-500' />
            )}
          </div>
        </div>
      </li>
    </>
  );
};
const UsersList = ({
  userArr,
  type,
}: {
  userArr: ModeratorUser[];
  type: 'edit' | 'invite' | 'default';
}) => {
  return (
    <ul className='last:rounded-b-md'>
      {userArr &&
        userArr.map((user) => (
          <UserRow key={user._id} user={user} type={type} />
        ))}
    </ul>
  );
};
const Moderators = () => {
  const buttArr = [
    { text: 'Invite user as mod', onClick: () => {} },
    { text: 'Leave as mod', onClick: () => {} },
    { text: 'Reorder', onClick: () => {} },
  ];
  const editableList = [
    {
      has_access: {
        everything: false,
        manage_users: false,
        manage_settings: false,
        manage_posts_and_comments: true,
      },
      username: 'malak123sssssssss4567',
      profile_picture: '',
      moderator_since: '2024-04-12T17:22:19.116Z',
      _id: '66196dcb6e7a889252659838',
    },
  ];
  return (
    <div>
      <ButtonList buttArr={buttArr} />
      <SearchBar />
      <UsersList userArr={editableList} type='default' />
      <div className='mt-10'>
        <p className='mb-2'>You can edit these moderators</p>
        <UsersList userArr={editableList} type='edit' />
      </div>
      <div className='my-10'>
        <p className='mb-2'>Invited moderators</p>
        <UsersList userArr={editableList} type='invite' />
      </div>
    </div>
  );
};

export default Moderators;
