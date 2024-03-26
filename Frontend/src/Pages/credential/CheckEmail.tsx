import Button from '../../Components/Button';
import { MdOutlineEmail } from 'react-icons/md';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { IoMdArrowBack } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface InputProps {
  handleBackArrow?: () => void;
  handleButtonEmail: () => void;
}

export default function CheckEmail({
  handleBackArrow,
  handleButtonEmail,
}: InputProps) {
  return (
    <Dialog size='sm' open={true} handler={() => {}}>
      <DialogBody className='text-black'>
        <div className='my-4 m-2'>
          <div className='float-left ' onClick={handleBackArrow}>
            <IoMdArrowBack size={32} />
          </div>
          <Link to='/' className='float-right'>
            <MdOutlineClose size={32} />
          </Link>
        </div>
        <div className='container mx-auto lg:p-5 '>
          <div className='flex justify-center mt-20'>
            <div className='lg:w-96 text-center'>
              <div className='flex justify-center items-center'>
                <MdOutlineEmail size={70} />
              </div>
              <div>
                <h1 className='m-2 pl-3 font-bold text-2xl'>
                  Check your inbox
                </h1>
              </div>
              <p className='m-10'>
                You&apos;ll get a password reset email if the address you
                provided has been verified.
              </p>
              <p className='mt-32'>
                Didn&apos;t receive an email? Check your spam folder or
              </p>
              <Button
                content='Try Another Email'
                type='button'
                className='form-control rounded-full text-left p-3 m-2 mt-4 w-full text-center'
                onClick={handleButtonEmail}
                style={{ backgroundColor: '#DCDCDC' }}
              />
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
