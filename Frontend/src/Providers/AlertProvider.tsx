import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import Alert from '../Components/Alert';

type AlertContextType = {
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>; // accepts boolean and returns void
  setIsError: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const AlertContext = createContext<AlertContextType>({
  trigger: false,
  setTrigger: () => {}, // Dummy function to satisfy default context type
  setIsError: () => {},
  setAlertMessage: () => {},
});

console.log('AlertContext', AlertContext);
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
