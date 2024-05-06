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
import ModSideBar from '../Rules and Removal reasons/ModSidebar';

const SchedulePost = (props: {}) => {
  const { community_name } = useParams();
  return (
    <div className='Container'>
      <div className='text-blue-light ps-4 ms-4 mt-4 font-bold border-b-2 pb-2 '>
        <span className='border rounded-full bg-blue-light text-white ps-1 pe-1 me-2'>
          r/
        </span>{' '}
        R/ {community_name}
        <span className='text-black ms-2 uppercase'>Schedule Posts</span>
      </div>
      <div className='grid grid-col-1 xl:grid-cols-layout'>
        <div className='hidden xl:block'>
          <ModSideBar />
        </div>

        <div className='m-10 p-4'>
          <div className='text-xl'>Scheduled posts</div>
          <div className='border p-4 mt-2'>
            <div className='text-font text-xs'>
              This post is scheduled for 3/9 @ 4:00 (GMT+ 02:00) AFRICA- CAIRO
            </div>
            <div className=' text-xs'>Scheduled by user</div>
          </div>
          <div className='border flex flex-row space-x-4 p-4'>
            <div className='flex flex-col ms-4'>
              <button className='text-gray-500 hover:text-blue-500 focus:outline-none'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 15l7-7 7 7'
                  />
                </svg>
              </button>
              <span className='text-gray-600 font-semibold'>Vote</span>
              <button className='text-gray-500 hover:text-red-500 focus:outline-none'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
            </div>
            <div className='bg-gray-200 w-12 h-12 m-2 flex items-center justify-center'>
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                />
              </svg>
            </div>
            <div className='flex flex-col font-bold'>
              <span>post Title</span>
              <span>{community_name}</span>
              <span>
                Edit <span className='ms-10'>delete</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePost;
