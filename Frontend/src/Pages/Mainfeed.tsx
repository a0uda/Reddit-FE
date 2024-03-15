import SideBar from '../components/SideBar';

const Mainfeed = () => {
  return (
    <>
      <div className='grid grid-col-1 lg:grid-cols-3'>
        <SideBar />
        <div>
          <h1>Mainfeed</h1>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Mainfeed;
