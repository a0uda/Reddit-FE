import React, { ReactNode } from 'react';
import RoundedButton from '../../../Components/RoundedButton';
import imageSrc from '../../../assets/react.svg';


// const Button: React.FC = (props: { children: ReactNode }): JSX.Element => (
//   <div>
//     {/* <RoundedButton
//       buttonBorderColor='blue'
//       buttonColor='white'
//       buttonText='change'
//       buttonTextColor='blue'
//       buttonImagePath={imageSrc}
//     /> */}
//     {props.children}
//   </div>
// );

function Card(props: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='flex justify-between'>
      <div>
        <h5 className='userSettingsCardHeader'>{props.title}</h5>
        <p className='userSettingsCardContent text-sm'>{props.description}</p>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default Card;
