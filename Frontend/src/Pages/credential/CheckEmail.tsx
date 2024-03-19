import Button from '../../Components/Button';
import { MdOutlineEmail } from 'react-icons/md';
import PopUp from '../../Components/PopUp';
import { IoMdArrowBack } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';

interface InputProps {
  handleBackArrow?: () => void;
  handleButtonEmail: () => void;
}

export default function CheckEmail({
  handleBackArrow,
  handleButtonEmail,
}: InputProps) {
  return (
    <PopUp>
      <div className='container mx-auto lg:p-5 my-5'>
        <div className='float-left' onClick={handleBackArrow}>
          <IoMdArrowBack size={32} />
        </div>
        <div className='float-right'>
          <MdOutlineClose size={32} />
        </div>
        <div className='flex justify-center mt-20'>
          <div className='lg:w-96 text-center'>
            <div className='flex justify-center items-center'>
              <MdOutlineEmail size={70} />
            </div>
            <div>
              <h1 className='m-2 pl-3 font-bold text-2xl'>Check your inbox</h1>
            </div>
            <p className='m-10'>
              You&apos;ll get a password reset email if the address you provided
              has been verified.
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
    </PopUp>
  );
}
