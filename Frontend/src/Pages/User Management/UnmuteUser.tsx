import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import GeneralForm from './CommonForm';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
  username: string;
  refetch: () => void;
}
interface DataType {
  community_name: string;
  username: string;
  action: string;
}

export default function UnmuteUser(props: RuleFormProps): JSX.Element {
  const { community_name } = useParams();

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      console.log('Mute user successfully');
    },
    // onError: () => {
    //   console.log('Mute user failed');
    // },
  });

  const initialValues: DataType = {
    community_name: community_name ? community_name : '',
    username: props.username,
    action: 'unmute',
  };
  const handleOnSubmit = (values: object) => {
    console.log(values);
    mutation.mutate({
      endPoint: 'communities/mute-user',
      data: { ...values, action: 'unmute' },
    });
  };

  return (
    <GeneralForm
      HandleOnSubmitFunction={handleOnSubmit}
      initialValues={initialValues}
      content={`Are you sure you want to unmute ${props.username}?`}
      title='Confirm'
      handleOpen={props.handleOpen}
      open={props.open}
      username={props.username}
      buttonText='Unmute'
    />
  );
}
