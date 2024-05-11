import { Card, CardBody } from '@material-tailwind/react';
import { ReactNode } from 'react';
import SideBar from './SideBar';

const ContentLayout = ({
  children,
  header,
}: {
  children: ReactNode;
  header?: ReactNode;
}) => {
  return (
    <>
      <div className='grid grid-col-1 xl:grid-cols-layout'>
        <div className='hidden xl:block'>
          <SideBar className='sticky top-[var(--navbar-height)] ' />
        </div>

        <div
          style={{ maxWidth: '100%' }}
          className='mx-auto w-full xl:w-[1080px] xl:max-w-[calc(100vw-272px)]'
        >
          {header && <div>{header}</div>}
          {/* <div className=''> */}
          <div
            className='flex gap-2'
            style={{ maxWidth: 'calc(100vw - 272px)' }}
          >
            {children}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Card className='shadow-none w-full px-6'>
        <CardBody className='px-0 py-2 overflow-x-auto'>{children}</CardBody>
      </Card>
    </>
  );
};

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Card className='shadow-none w-full'>
        <CardBody className='px-0 py-2'>{children}</CardBody>
      </Card>
    </>
  );
};

const RightSideBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Card className='lg-max:hidden shadow-none w-80 min-w-80'>
        <CardBody className='sticky top-[var(--navbar-height)] space-y-4 px-0 py-2 overflow-auto h-[calc(100vh-var(--navbar-height))]'>
          {children}
        </CardBody>
      </Card>
    </>
  );
};

ContentLayout.Header = Header;
ContentLayout.Main = Main;
ContentLayout.RightSideBar = RightSideBar;

export default ContentLayout;
