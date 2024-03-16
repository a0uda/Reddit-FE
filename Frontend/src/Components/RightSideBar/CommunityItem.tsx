import React from 'react';
import {
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from '@material-tailwind/react';

interface CommunityItemProps {
  src: string;
  name: string;
  membersNumber: number;
}

const CommunityItem: React.FC<CommunityItemProps> = (props) => {
  return (
    <div>
      <ListItem className='rounded-none'>
        <ListItemPrefix>
          <Avatar
            variant='circular'
            alt='candice'
            src={props.src}
            style={{ width: '35px', height: '35px' }}
          />
        </ListItemPrefix>
        <div>
          <Typography
            variant='small'
            className='font-body font-thin -tracking-tight text-sm text-gray-900'
          >
            {props.name}
          </Typography>
          <Typography
            variant='small'
            className='font-body font-thin -tracking-tight text-xs text-gray-600'
          >
            {props.membersNumber} members
          </Typography>
        </div>
      </ListItem>
    </div>
  );
};

export default CommunityItem;
