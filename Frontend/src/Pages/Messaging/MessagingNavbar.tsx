import { Link, useParams } from 'react-router-dom';

const NavButton = (props: {
  active?: boolean | undefined;
  buttonName: string;
  buttonLink: string;
}) => {
  return (
    <Link
      to={`/message/${props.buttonLink}`}
      className={`border-b-2 pb-1  hover:border-white ${props.active ? 'border-white' : 'border-blue-light'}`}
    >
      <li>{props.buttonName}</li>
    </Link>
  );
};

export const MessagingNavbar = () => {
  const url = useParams();
  const loc = Object.values(url)[0];
  return (
    <div className='bg-blue-light w-full px-[100px] text-white capitalize'>
      <ul className='flex gap-6 text-lg py-4 text-[#edeff1] opacity-80'>
        <Link to='/message/compose'>
          <li className={loc === 'compose' ? 'text-[#80bce9]' : ''}>
            Send a Private Message
          </li>
        </Link>
        <Link to='/message/inbox'>
          <li
            className={
              loc !== 'compose' && loc !== 'sent' ? 'text-[#80bce9]' : ''
            }
          >
            Inbox
          </li>
        </Link>
        <Link to='/message/sent'>
          <li className={loc === 'sent' ? 'text-[#80bce9]' : ''}>Sent</li>
        </Link>
      </ul>
      <ul
        className={`flex gap-[2.5rem] text-xs ${loc === 'compose' || loc === 'sent' ? 'hidden' : ''}`}
      >
        <NavButton
          buttonLink='inbox'
          buttonName='All'
          active={loc === 'inbox'}
        />
        <NavButton
          buttonLink='unread'
          buttonName='Unread'
          active={loc === 'unread'}
        />
        <NavButton
          buttonLink='messages'
          buttonName='Messages'
          active={loc === 'messages'}
        />
        <NavButton
          buttonLink='selfreply'
          buttonName='Post Replies'
          active={loc === 'selfreply'}
        />
        <NavButton
          buttonLink='mentions'
          buttonName='Username Mentions'
          active={loc === 'mentions'}
        />
      </ul>
    </div>
  );
};
// .userSettingsNavbarLink {
//   padding: 15px 12px 12px 12px;
//   margin-right: 8px;
//   border: none;
//   background-color: inherit;
//   cursor: pointer;
//   text-decoration: none;
//   color:var(--grey);
// }

// .userSettingsNavbarLinkActive {
//   border-bottom: solid 3px;
//   border-color: var(--lightBlue);
//   color: var(--black);

// }
