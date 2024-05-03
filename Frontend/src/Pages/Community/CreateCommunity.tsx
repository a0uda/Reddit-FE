// import MyForm from '../../Components/Form';
// import { ButtonType } from '../../validate/buttonType';
// import { postRequest } from '../../API/User';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBody,
  IconButton,
  Button,
  Typography,
  Input,
  Textarea,
  Alert,
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
// import { IoMdClose } from 'react-icons/io';
import { TfiClose } from 'react-icons/tfi';
import { GoDotFill } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
// import { useMutation } from 'react-query';
// import { saveToken } from '../../utils/tokens_helper';
// import { object } from 'yup';
// import { MdCatchingPokemon } from 'react-icons/md';
// import axios from 'axios';
import { GenericAlert } from '../../Components/GenericAlert';
import { useAlert } from '../../Providers/AlertProvider';

interface CreateCommunityProps {
  open: boolean;
  handleOpen: () => void;
}

const CreateCommunity = ({
  open: open,
  handleOpen: handleOpen,
}: CreateCommunityProps) => {
  const [opendd, setOpendd] = useState(false);
  //   const handleOpen = () => setOpen(!open);
  // const nextPage = () => {
  //   setPage(page === 1 ? 2 : 1);
  // };

  //===================================================== Name ==========================================================

  const [communityName, setCommunityName] = useState<string>('');
  const [communityNameIsError, setCommunityNameIsError] =
    useState<boolean>(false);
  const [communtiyNameErrorMsg, setCommunityNameErrorMsg] =
    useState<string>('');

  //   const [description, setDescription] = useState<string>('');
  //   const [communityType, setCommunityType] = useState<CommunityType>('public');
  //   const [isOver18, setIsOver18] = useState<boolean>(false);

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
    // TODO: Check if the community name is already exists
    if (communityName === 'sports') {
      setCommunityNameIsError(true);
      setCommunityNameErrorMsg('"' + communityName + '" is already exists');
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

  //   const handleCancel = () => {
  //     onClose();
  //   };

  //   const handleNext = () => {
  //     setPage(page + 1);
  //   };

  //   const handleBack = () => {
  //     setPage(page - 1);
  //   };

  //   console.log('communityName', communityName);

  return (
    <>
      {/* <GenericAlert
        msgg='Community name should be less than 21 characters'
        errorr={true}
      /> */}
      <Alert>ana ela lert</Alert>
      <Dialog
        size='md'
        className='h-5/6 z-0 rounded-3xl'
        open={open}
        handler={handleOpen}
      >
        <DialogBody className=''>
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
                    Descriptions help redditors discover and understand your
                    community.
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
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateCommunity;
