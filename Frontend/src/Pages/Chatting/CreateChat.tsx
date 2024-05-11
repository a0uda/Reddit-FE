import { Avatar, Typography } from '@material-tailwind/react';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRequest } from '../../API/User';
import { useMutation } from 'react-query';

const Suggestion = ({
  suggestion,
}: {
  suggestion: { profile_picture: string; username: string };
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/chat/u/${suggestion.username}`);
      }}
      className='p-3 cursor-pointer hover:bg-gray-100  flex gap-2 items-center'
    >
      <Avatar
        variant='circular'
        alt={suggestion.username}
        src={
          suggestion.profile_picture ||
          'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
        }
        className='h-6 w-6'
      />
      <Typography>{suggestion.username}</Typography>
    </div>
  );
};

const CreateChat = () => {
  const [selectedData, setSelectedData] = useState<
    { profile_picture: string; username: string }[]
  >([]);
  const [query, setQuery] = useState('');
  const fetchReq = useMutation(fetchRequest);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const searchQuery = e.target.value;
    if (searchQuery.trim().length === 0) {
      return setSelectedData([]);
    } else {
      fetchReq.mutate(`search/people?page=1&pageSize=10&query=${searchQuery}`, {
        onSuccess: (data) => {
          // setSelectedData(data.data)
          const filteredArr = data?.data.map(
            (user: { username: string; profile_picture: string }) => {
              return {
                username: user.username,
                profile_picture: user.profile_picture,
              };
            }
          );
          setSelectedData(filteredArr);
        },
      });

      // setSelectedData(
      //   suggestionsArr.filter((item) =>
      //     item.username.toLowerCase().includes(queryLowerCase)
      //   )
      // );
    }
  };

  return (
    <div className='flex-1 h-[calc(100vh-var(--navbar-height))] bg-[#EAEDEF] flex flex-col justify-between'>
      <div>
        <div className='p-3 font-semibold bg-white'>New Chat</div>
        <div className='bg-[#EAEDEF] flex flex-col items-center justify-center gap-3 p-3'>
          <div>
            <input
              placeholder='Type username'
              className='p-3 pt-5 pb-4 rounded-lg w-96'
              onChange={handleSearch}
            />
            {query && selectedData.length == 0 && (
              <p className='text-danger-red'>Invalid username</p>
            )}
          </div>
          <div className='bg-white w-96 rounded-md'>
            {selectedData.length > 0 && (
              <div className='max-h-80 overflow-y-auto rounded-md'>
                {selectedData.map((sug, i) => (
                  <Suggestion suggestion={sug} key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
