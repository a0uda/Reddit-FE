import { useMutation } from 'react-query';
import RoundedButton from '../../Components/RoundedButton';
import Section from '../UserSettings/Containers/Section';
import { useAlert } from '../../Providers/AlertProvider';
import { patchRequest } from '../../API/User';

function PostsCommentsSettings() {
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('General Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });
  const handleSaveChanges = () => {
    patchReq.mutate({
      endPoint: 'communities/change-general-settings/reem',
      newSettings: {},
    });
  };
  return (
    <>
      <div className='flex justify-end my-4'>
        <RoundedButton
          buttonText='Save changes'
          buttonBorderColor=''
          buttonColor='bg-[#0079D3]'
          buttonTextColor='white'
          onClick={handleSaveChanges}
        ></RoundedButton>
      </div>
      <h2 className='text-xl my-4 font-semibold'>Community settings</h2>
      <Section sectionTitle=''></Section>
    </>
  );
}

export default PostsCommentsSettings;
