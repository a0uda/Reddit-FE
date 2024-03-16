import React from 'react';
import { Switch } from '@material-tailwind/react';

export default function SwitchButton(props: { checked: boolean }) {
  // const [val, setVal] = React.useState(props.checked);
  // console.log(val);

  return (
    <Switch
      id='custom-switch-component'
      ripple={false}
      className='h-full w-full checked:bg-[#0079D3]'
      containerProps={{
        className: 'w-11 h-6',
      }}
      circleProps={{
        className: 'before:hidden left-0.5  border-none',
      }}
      crossOrigin={undefined}
      // checked={val}
      // onChange={() => {
      //   setVal(!val);
      // }}
    />
  );
}
