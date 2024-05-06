import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import RoundedButton from '../RoundedButton';
import ShareOption from './ShareOption';
import { postRequest } from '../../API/User';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SharePostModal(props: {
  handleOpen;
  open;
  postId: string;
}) {
  const [text, setText] = useState('');
  const [postInCommunityFlag, setPostInCommunityFlag] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const setFieldValue = (communityFlag: boolean, communityName: string) => {
    setPostInCommunityFlag(communityFlag);
    setCommunityName(communityName);
  };
  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };
  const handleSaveButton = () => {
    postRequest({
      endPoint: 'posts/share-post',
      data: {
        id: props.postId,
        post_in_community_flag: postInCommunityFlag,
        community_name: communityName,
        caption: text,
      },
    });
    props.handleOpen();
  };
  return (
    <>
      <Dialog
        size='sm'
        open={props.open}
        handler={props.handleOpen}
        className='pb-5'
      >
        <DialogHeader className=' text-center  justify-between border-b border-lines-color'>
          <h2 className='pl-36'>Add caption</h2>
          <XMarkIcon
            strokeWidth={3.5}
            className='h-[20px] w-[20px]'
            onClick={props.handleOpen}
          />
        </DialogHeader>
        <DialogBody className='flex flex-col gap-2'>
          <ShareOption setFieldValue={setFieldValue} />

          <textarea
            placeholder='Title'
            className=' resize-none !border rounded border-[#EDEFF1] bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3 h-20'
            onChange={handleChange}
            maxLength={400}
            value={text}
          />
          <div>{text.length}/300</div>
        </DialogBody>
        <DialogFooter>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-blue-light'
            buttonText='Save'
            buttonTextColor='text-white'
            onClick={handleSaveButton}
          ></RoundedButton>
        </DialogFooter>
      </Dialog>
    </>
  );
}
