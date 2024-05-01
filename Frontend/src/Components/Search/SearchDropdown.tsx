import { ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';

const SearchDropdown = () => {
  const [recent, setRecent] = useState([
    {
      title: 'programming',
      icon: 'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png',
    },
    {
      title: 'test',
    },
  ]);

  return (
    <List className='p-0'>
      {recent.length > 0 ? (
        recent.map((item, index) => (
          <ListItem ripple={false} key={index}>
            <ListItemPrefix>
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.title}
                  className='w-6 h-6 rounded-full'
                />
              ) : (
                <ClockIcon className='h-6 w-6' />
              )}
            </ListItemPrefix>
            {item.title}
            <ListItemSuffix>
              <IconButton
                variant='text'
                onClick={() => setRecent(recent.filter((_, i) => i !== index))}
              >
                <XCircleIcon className='h-6 w-6' />
              </IconButton>
            </ListItemSuffix>
          </ListItem>
        ))
      ) : (
        <ListItem className='p-0 flex flex-col items-center justify-center text-center hover:bg-transparent focus:bg-transparent'>
          <img
            className='max-h-[150px] mb-xl'
            role='presentation'
            src='https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png'
            alt='Image for an empty inbox'
          />
          <Typography variant='lead'>No Recent Searches</Typography>
          <Typography variant='small'>
            Your recent searches will appear here.
          </Typography>
        </ListItem>
      )}
    </List>
  );
};
export default SearchDropdown;
