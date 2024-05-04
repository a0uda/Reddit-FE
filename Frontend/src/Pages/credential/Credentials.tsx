import React, { useState } from 'react';
import Login from './Login';
import RecoverUsername from './RecoverUsername';
import ResetPassword from './ResetPassword';
import Signup from './Signup';

const Credentials = ({
  loginMod,
  setLoginMod,
}: {
  loginMod: boolean;
  setLoginMod: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [recoverMod, setRecoverMod] = useState(false);
  const [resetPwdMod, setResetPwdMod] = useState(false);
  const [signupMod, setSignupMod] = useState(false);
  return (
    <>
      <Login
        open={loginMod}
        handleOpen={() => {
          setLoginMod(!loginMod);
        }}
        openPassword={() => {
          setResetPwdMod(true);
        }}
        openSignup={() => {
          setSignupMod(true);
        }}
        openUsername={() => {
          setRecoverMod(true);
        }}
      />
      <RecoverUsername
        open={recoverMod}
        handleOpen={() => {
          setRecoverMod(!recoverMod);
        }}
        handlePrevious={() => {
          setLoginMod(true);
        }}
        openSignup={() => {
          setSignupMod(true);
        }}
      />
      <ResetPassword
        open={resetPwdMod}
        handleOpen={() => {
          setResetPwdMod(!resetPwdMod);
        }}
        handlePrevious={() => {
          setLoginMod(true);
        }}
        openSignup={() => {
          setSignupMod(true);
        }}
        openUsername={() => {
          setRecoverMod(true);
        }}
      />
      <Signup
        open={signupMod}
        handleOpen={() => {
          setSignupMod(!signupMod);
        }}
        openLogin={() => {
          setLoginMod(true);
        }}
      />
    </>
  );
};

export default Credentials;
