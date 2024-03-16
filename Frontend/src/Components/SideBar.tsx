import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  // Typography,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

const SideBar = () => {
  return (
    <>
      <Card className='lg-max:hidden h-[calc(100vh-2rem)] w-full max-w-[272px] p-4 shadow-xl shadow-blue-gray-900/5 '>
        <List>
          {/* Home... */}
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className='h-5 w-5' />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className='h-5 w-5' />
            </ListItemPrefix>
            Popular
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className='h-5 w-5' />
            </ListItemPrefix>
            All
          </ListItem>
          <hr className='my-2 border-blue-gray-50' />
          {/* Moderation: Accordion */}
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className='h-5 w-5' />
            </ListItemPrefix>
            E-Commerce
          </ListItem>
          <hr className='my-2 border-blue-gray-50' />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className='h-5 w-5' />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value='14'
                size='sm'
                variant='ghost'
                color='blue-gray'
                className='rounded-full'
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className='h-5 w-5' />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className='h-5 w-5' />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default SideBar;
