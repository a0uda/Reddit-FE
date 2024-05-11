import { Input } from '@material-tailwind/react';

function InputBox(props: { placeHolder: string }) {
  return (
    <div className='flex w-full '>
      <Input
        placeholder={props.placeHolder}
        className='!border !border-gray-300 bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500  '
        labelProps={{
          className: 'block',
        }}
        containerProps={{ className: 'min-w-[100px]' }}
        crossOrigin={undefined}
      />
    </div>
  );
}

export default InputBox;
