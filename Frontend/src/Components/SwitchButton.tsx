import React, { useEffect } from 'react';
import { Switch } from '@material-tailwind/react';

export default function SwitchButton(props: {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}) {
  const [val, setVal] = React.useState(props.checked);
  console.log('props', val);
  console.log('p', props.checked);
  useEffect(() => {
    if (props.checked) {
      setVal(props.checked);
    }
  }, [props.checked]);
  const handleChange = (event) => {
    const newValue = event.target.checked;
    setVal(newValue);
    props.onChange(newValue);
  };
  return (
    <Switch
      ripple={false}
      className='h-full w-full checked:bg-[#0079D3]'
      containerProps={{
        className: 'w-11 h-6',
      }}
      circleProps={{
        className: 'before:hidden left-0.5  border-none',
      }}
      crossOrigin={undefined}
      checked={val}
      // onClick={(e) => {
      //   setVal(!val);
      //   console.log(e.currentTarget.checked, 'val');
      //   console.log(props.checked, 'checked');
      // }}
      onChange={handleChange}
    />
  );
}
