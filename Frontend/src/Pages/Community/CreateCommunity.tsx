import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { postRequest, fetchRequest } from '../../API/User';
import { TfiClose } from 'react-icons/tfi';
import { GoDotFill } from 'react-icons/go';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { BsExclamationDiamond } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import {
  Dialog,
  DialogBody,
  Switch,
  Button,
  Typography,
  Input,
  Textarea,
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';

interface CreateCommunityProps {
  open: boolean;
  handleOpen: () => void;
}

const CreateCommunity = ({
  open: open,
  handleOpen: handleOpen,
}: CreateCommunityProps) => {
  // const [opendd, setOpendd] = useState(false);
  // const postReq = useMutation(postRequest);

  //===================================================== Name ==========================================================

  const [communityName, setCommunityName] = useState<string>('');
  const [communityNameIsError, setCommunityNameIsError] =
    useState<boolean>(false);
  const [communtiyNameErrorMsg, setCommunityNameErrorMsg] =
    useState<string>('');

  interface community {
    _id: string;
    name: string;
  }
  const { data } = useQuery('communities names', () =>
    fetchRequest('communities/get-community-names')
  );
  // console.log(data);
  const communitiesNamesList =
    data?.data.map((community: community) => community.name) ?? [];

  const handleNameLength = (name: string) => {
    setCommunityName(name);
    if (name.length > 21) {
      setCommunityNameIsError(true);
      setCommunityNameErrorMsg(
        'Community name should be less than 21 characters'
      );
    } else {
      setCommunityNameIsError(false);
      setCommunityNameErrorMsg('');
    }
  };

  const handleNameUniqeness = (name: string) => {
    handleNameLength(name);
    setCommunityName(name);
    if (communitiesNamesList.includes(name)) {
      setCommunityNameIsError(true);
      setCommunityNameErrorMsg('"' + name + '" already exists');
    }
  };

  //===================================================== Description ==========================================================

  const [communityDescription, setCommunityDescription] = useState<string>('');
  const [communityDescriptionIsError, setCommunityDescriptionIsError] =
    useState<boolean>(false);
  const [communityDescriptionErrorMsg, setCommunityDescriptionErrorMsg] =
    useState<string>('');

  const handleDescriptionLength = (name: string) => {
    setCommunityDescription(name);
    if (name.length > 500) {
      setCommunityDescriptionIsError(true);
      setCommunityDescriptionErrorMsg('Description is too long.');
    } else {
      setCommunityNameIsError(false);
      setCommunityNameErrorMsg('');
    }
  };

  //===================================================== Actions ==========================================================

  const [page, setPage] = useState<number>(1);
  const [nextDisabled, setNextDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      communityName &&
      communityDescription &&
      !communityNameIsError &&
      !communityDescriptionIsError &&
      page === 1
    ) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [
    communityName,
    communityDescription,
    communityNameIsError,
    communityDescriptionIsError,
    nextDisabled,
    page,
  ]);

  const [selectedOption, setSelectedOption] = useState<string>('Public');

  const [NSFWisChecked, setNSFWisChecked] = useState(false);
  const handleSwitchChange = () => {
    setNSFWisChecked(!NSFWisChecked);
  };

  const submitMutation = useMutation(
    ({
      communityName,
      communityDescription,
      selectedOption,
      NSFWisChecked,
    }: {
      communityName: string;
      communityDescription: string;
      selectedOption: string;
      NSFWisChecked: boolean;
    }) =>
      postRequest({
        endPoint: 'communities/add-community',
        data: {
          name: communityName,
          description: communityDescription,
          type: selectedOption,
          nsfw_flag: NSFWisChecked,
          category: 'Technology',
        },
      }),
    {
      onSuccess: () => {
        handleOpen();
      },
      onError: () => {
        console.log('Error while creating community');
      },
    }
  );
  const handleSubmit = () => {
    submitMutation.mutate({
      communityName,
      communityDescription,
      selectedOption,
      NSFWisChecked,
    });
  };

  return (
    <>
      <Dialog
        size='md'
        className='h-5/6 z-0 rounded-3xl w-fit-content'
        open={open}
        handler={handleOpen}
      >
        <DialogBody className=''>
          {/*================================================== page 1 ================================================== */}
          {page === 1 && (
            <div className='flex flex-col gap-6'>
              <div className='flex justify-between'>
                <div>
                  <Typography
                    variant='h4'
                    className='font-body font-bold -tracking-tight text-black'
                  >
                    Name and style your community
                  </Typography>
                  <Typography
                    variant='small'
                    className='font-body -tracking-tight text-gray-600 mb-10 mt-2'
                  >
                    Descriptions help redditors discover your community.
                  </Typography>
                </div>
                <div>
                  <Button
                    onClick={handleOpen}
                    variant='text'
                    className=' p-2 bg-gray-300  rounded-full'
                  >
                    <TfiClose size={15} />
                  </Button>
                </div>
              </div>
              <div>
                <Input
                  variant='standard'
                  label='Community name'
                  placeholder={communityName}
                  value={communityName}
                  crossOrigin='anonymous'
                  error={communityNameIsError}
                  required
                  onChange={(e) => handleNameLength(e.target.value)}
                  onBlur={(e) => handleNameUniqeness(e.target.value)}
                />
                <div>
                  {communtiyNameErrorMsg && (
                    <Typography className=' mb-2 float-left text-xs text-red-500'>
                      {communtiyNameErrorMsg}
                    </Typography>
                  )}
                  <Typography className='text-gray-500 float-right text-xs mb-5'>
                    {communityName.length}
                  </Typography>
                </div>
              </div>
              <div>
                <Textarea
                  variant='outlined'
                  label='Description'
                  placeholder={communityDescription}
                  value={communityDescription}
                  error={communityDescriptionIsError}
                  required
                  onChange={(e) => handleDescriptionLength(e.target.value)}
                  onBlur={(e) => handleDescriptionLength(e.target.value)}
                  className='bg-gray-200 bg h-56'
                  rows={7}
                />
                <div>
                  {communityDescriptionErrorMsg && (
                    <Typography className=' mb-2 float-left text-xs text-red-500'>
                      {communityDescriptionErrorMsg}
                    </Typography>
                  )}
                  {!communityDescriptionErrorMsg && (
                    <Typography className=' mb-2 float-left text-xs text-gray'>
                      Descriptions help communities get discovered.
                    </Typography>
                  )}
                  <Typography className='text-gray-500 float-right text-xs mb-5'>
                    {communityDescription.length}
                  </Typography>
                </div>
              </div>
              <div className='flex justify-between items-end '>
                <div className='flex'>
                  <GoDotFill className='text-black m-0 p-0' />
                  <GoDotFill className='text-gray-400 m-0 p-0' />
                </div>
                <div className='flex gap-1'>
                  <Button
                    variant='text'
                    className='h-10 font-bold flex items-center gap-1.5 bg-gray-200'
                    onClick={handleOpen}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='text'
                    className='h-10 font-bold flex items-center gap-1.5 bg-light-blue-900 text-white hover:bg-black'
                    onClick={() => {
                      setPage(2);
                    }}
                    disabled={nextDisabled}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/*================================================== page 2 ================================================== */}
          {page === 2 && (
            <div className='flex flex-col gap-6'>
              <div className='flex justify-between'>
                <div>
                  <Typography
                    variant='h4'
                    className='font-body font-bold -tracking-tight text-black'
                  >
                    What kind of community?
                  </Typography>
                  <Typography
                    variant='small'
                    className='font-body -tracking-tight text-gray-600 mb-0 mt-2'
                  >
                    Decide who can view and contribute in your community. Only
                    public communities show up in search.
                  </Typography>
                </div>
                <div>
                  <Button
                    onClick={handleOpen}
                    variant='text'
                    className=' p-2 bg-gray-300  rounded-full'
                  >
                    <TfiClose size={15} />
                  </Button>
                </div>
              </div>
              <div>
                <Card className='p-1 m-0 rounded-none shadow-none'>
                  <List className='p-0 m-0 rounded-none shadow-none'>
                    <ListItem
                      className={`p-2 m-0 rounded-none ${selectedOption === 'Public' ? 'bg-gray-200' : ''}`}
                    >
                      <label
                        htmlFor='vertical-list-public'
                        className='flex justify-between w-full cursor-pointer items-center px-3 py-2'
                      >
                        <div className='flex'>
                          <ListItemPrefix className='mr-3'>
                            <TbWorld size={25} />
                          </ListItemPrefix>
                          <div>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-800'
                            >
                              Public
                            </Typography>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-400 text-xs'
                            >
                              Anyone can view and contribute
                            </Typography>
                          </div>
                        </div>
                        <ListItemPrefix className='mr-3'>
                          <Radio
                            defaultChecked
                            name='vertical-list'
                            id='vertical-list-public'
                            ripple={false}
                            className='hover:before:opacity-0'
                            containerProps={{
                              className: 'p-0',
                            }}
                            crossOrigin={null}
                            // checked={selectedOption === 'public'}
                            // onChange={handleOptionChange}
                            onChange={() => setSelectedOption('Public')}
                          />
                        </ListItemPrefix>
                      </label>
                    </ListItem>
                    <ListItem
                      className={`p-1 m-0 rounded-none ${selectedOption === 'Restricted' ? 'bg-gray-200' : ''}`}
                    >
                      <label
                        htmlFor='vertical-list-restricted'
                        className='flex justify-between w-full cursor-pointer items-center px-3 py-2'
                      >
                        <div className='flex'>
                          <ListItemPrefix className='mr-3'>
                            <FaRegEyeSlash size={25} />
                          </ListItemPrefix>
                          <div>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-800'
                            >
                              Restricted
                            </Typography>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-400 text-xs'
                            >
                              Anyone can view, but only approved users can
                              contribute
                            </Typography>
                          </div>
                        </div>
                        <ListItemPrefix className='mr-3'>
                          <Radio
                            name='vertical-list'
                            id='vertical-list-restricted'
                            ripple={false}
                            className='hover:before:opacity-0'
                            containerProps={{
                              className: 'p-0',
                            }}
                            crossOrigin={null}
                            // checked={selectedOption === 'restricted'}
                            // onChange={handleOptionChange}
                            onChange={() => setSelectedOption('Restricted')}
                          />
                        </ListItemPrefix>
                      </label>
                    </ListItem>
                    <ListItem
                      className={`p-1 m-0 rounded-none ${selectedOption === 'Private' ? 'bg-gray-200' : ''}`}
                    >
                      <label
                        htmlFor='vertical-list-private'
                        className='flex justify-between w-full cursor-pointer items-center px-3 py-2'
                      >
                        <div className='flex'>
                          <ListItemPrefix className='mr-3'>
                            <FiLock size={25} />
                          </ListItemPrefix>
                          <div>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-800'
                            >
                              Private
                            </Typography>
                            <Typography
                              color='blue-gray'
                              className='font-medium text-blue-gray-400 text-xs'
                            >
                              Only approved users can view and contribute
                            </Typography>
                          </div>
                        </div>
                        <ListItemPrefix className='mr-3'>
                          <Radio
                            name='vertical-list'
                            id='vertical-list-private'
                            ripple={false}
                            className='hover:before:opacity-0'
                            containerProps={{
                              className: 'p-0',
                            }}
                            crossOrigin={null}
                            // checked={selectedOption === 'private'}
                            // onChange={handleOptionChange}
                            onChange={() => setSelectedOption('Private')}
                          />
                        </ListItemPrefix>
                      </label>
                    </ListItem>
                  </List>
                </Card>
                <div className='w-11/12 h-0.5 m-3 bg-gray-300'></div>
                <div>
                  <ListItem className={'p-1 mb-4 rounded-none'}>
                    <label
                      htmlFor='vertical-list-nsfw'
                      className='flex justify-between w-full cursor-pointer items-center px-3 py-2'
                    >
                      <div className='flex'>
                        <ListItemPrefix className='mr-3'>
                          <BsExclamationDiamond size={25} />
                        </ListItemPrefix>
                        <div>
                          <Typography
                            color='blue-gray'
                            className='font-medium text-blue-gray-800'
                          >
                            Mature (18+)
                          </Typography>
                          <Typography
                            color='blue-gray'
                            className='font-medium text-blue-gray-400 text-xs'
                          >
                            Users must be over 18 to view and contribute
                          </Typography>
                        </div>
                      </div>
                      <ListItemPrefix className='mr-3'>
                        <Switch
                          id='vertical-list-nsfw'
                          crossOrigin={''}
                          className='h-full w-full checked:bg-blue-light-muted'
                          containerProps={{
                            className: 'w-11 h-6',
                          }}
                          circleProps={{
                            className: 'before:hidden left-0.5 border-none',
                          }}
                          checked={NSFWisChecked}
                          onChange={handleSwitchChange}
                        />
                      </ListItemPrefix>
                    </label>
                  </ListItem>
                </div>
              </div>
              <div className='flex justify-between items-end '>
                <div className='flex'>
                  <GoDotFill className='text-gray-400 m-0 p-0' />
                  <GoDotFill className='text-black m-0 p-0' />
                </div>
                <div className='flex gap-1'>
                  <Button
                    variant='text'
                    className='h-10 font-bold flex items-center gap-1.5 bg-gray-200'
                    onClick={() => {
                      setPage(1);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant='text'
                    className='h-10 font-bold flex items-center gap-1.5 bg-light-blue-900 text-white hover:bg-black'
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Create Community
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateCommunity;
