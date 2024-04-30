import React, { useEffect, useState } from 'react';
import DropDownButton from './components/DropDownButton';
import PostCard from './components/PostCard';
import { useMutation } from 'react-query';
import { PostType } from '../../types/types';
import { fetchRequest } from '../../API/User';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Edited = () => {
  const [sortList, setSortList] = useState<string>('Newest First');
  const [selList, setSelList] = useState<string>('Posts and Comments');
  const { communityName } = useParams();
  console.log(communityName);

  const [response, setResponse] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setResponse([]);
      try {
        const res = await axios.get(
          `${process.env.VITE_BASE_URL}communities/about/removed-or-spammed/${communityName}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
            params: {
              posts_or_comments: selList,
              time_filter: sortList,
            },
          }
        );
        setResponse(res.data);
        console.log(res.data, 'resss');
        // Perform further actions with the response data, such as updating state
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true); // Set error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetch function within the effect
  }, [sortList, selList]); // Effect will run whenever sortList or selList changes
  return (
    <div>
      <div className='flex gap-1 items-center'>
        <DropDownButton
          buttonList={['Newest First', 'Oldest First']}
          selected={sortList}
          handleSelectionChange={(selectedItem) => {
            setSortList(selectedItem);
          }}
        />
        <DropDownButton
          buttonList={['Posts and Comments', 'Posts', 'Comments']}
          selected={selList}
          handleSelectionChange={(selectedItem) => {
            setSelList(selectedItem);
          }}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {response &&
          response.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Edited;
