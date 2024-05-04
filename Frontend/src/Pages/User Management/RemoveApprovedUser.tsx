import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import GeneralForm from './CommonForm';

interface ApproveFormProps {
  handleOpen: () => void;
  open: boolean;
  username: string;
  refetch: () => void;
}
interface valueDataType {
  community_name: string;
  username: string;
}
export default function RemoveApprovedUser(
  props: ApproveFormProps
): JSX.Element {
  const { community_name } = useParams();

  const initialValues: valueDataType = {
    community_name: community_name ? community_name : '',
    username: props.username,
  };

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      console.log('User removed successfully');
    },
    // onError: () => {
    //   console.log('Failed to Remove User');
    // },
  });

  const handleOnSubmit = (values: object) => {
    console.log(values);
    mutation.mutate({
      endPoint: 'communities/unapprove-user',
      data: values,
    });
  };

  return (
    <GeneralForm
      HandleOnSubmitFunction={handleOnSubmit}
      initialValues={initialValues}
      content={`Are you sure you want to remove ${props.username} as an approved
    user?`}
      title='Confirm'
      handleOpen={props.handleOpen}
      open={props.open}
      username={props.username}
      buttonText='Remove'
    />
  );
}
