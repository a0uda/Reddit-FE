import React, { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';
import { Link, useParams } from 'react-router-dom';

const NavbarButton = (props: {
  children: ReactNode;
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      className={`py-2 px-3 rounded-full flex items-center justify-center cursor-pointer font-semibold ${props.active ? 'bg-[#d2dadd] text-black ' : 'bg-inherit text-[#576f76]'} `}
    >
      {props.children}
    </li>
  );
};
const Navbar = (props: { page: string }) => {
  const { communityName } = useParams();
  console.log(communityName);

  return (
    <div>
      <Typography variant='h5'>Queues</Typography>
      <ul className='flex gap-3 capitalize my-3'>
        {['removed', 'edited', 'unmoderated'].map((li) => (
          <Link
            key={li}
            to={`/r/${communityName}/about/${li == 'removed' ? 'spam' : li}`}
          >
            <NavbarButton active={li == props.page}>{li}</NavbarButton>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
