import { createContext, useContext, useState } from 'react';
import Alert from '../Components/Alert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = (props: { children: React.ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [trigger, setTrigger] = useState(false);

  return (
    <AlertContext.Provider
      value={{ trigger, setTrigger, setIsError, setAlertMessage }}
    >
      <Alert
        isError={isError}
        message={alertMessage}
        setMessage={setAlertMessage}
        trigger={trigger}
      />
      {props.children}
    </AlertContext.Provider>
  );
};
