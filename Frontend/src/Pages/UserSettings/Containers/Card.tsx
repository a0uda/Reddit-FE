import React from 'react';
import { Button } from 'react-bootstrap';
import RoundedButton from '../../../Components/RoundedButton';
import imageSrc from '../../../assets/react.svg';
function Card() {
  return (
    <div className='d-flex justify-content-between'>
      <div>
        <h5 className='userSettingsCardHeader'>email</h5>
        <p className='userSettingsCardContent'>
          reem.khatab02@eng-st.cu.edu.eg
        </p>
      </div>
      <div>
        <RoundedButton
          buttonBorderColor='blue'
          buttonColor='white'
          buttonText='change'
          buttonTextColor='blue'
          buttonImagePath={imageSrc}
        />
      </div>
    </div>
  );
}

export default Card;
