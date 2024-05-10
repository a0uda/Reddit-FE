import { useEffect, useState } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import AddRemovalReason from './AddRemovalReason';

interface reasonDataType {
  removal_reason_title: string;
  removal_reason: string;
  _id: string;
}

export default function ReasonList({
  fetchDataReasons,
  reasonsList,
}: {
  fetchDataReasons: () => void;
  setReasonsList: (x: reasonDataType[]) => void;
  reasonsList: reasonDataType[];
}) {
  const [openAddRule, setOpenAddRule] = useState(false);
  // const [reasonsList, setReasonsList] = useState<reasonDataType[]>([]);
  const [initialValues, setInitialValues] = useState({
    community_name: '',
    removal_reason_title: '',
    removal_reason: '',
    removal_reason_id: '',
  });
  // const fetchData = async () => {
  //   setReasonsList([]);
  //   try {
  //     const res = await axios.get(
  //       `${process.env.VITE_BASE_URL}communities/get-removal-reasons/${community_name}`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: localStorage.getItem('token'),
  //         },
  //         params: {
  //           community_name: community_name,
  //         },
  //       }
  //     );
  //     setReasonsList(res.data);
  //     console.log(res.data, 'resss');
  //   } catch (err) {
  //     console.error('Error fetching data:', err);
  //   }
  // };
  useEffect(() => {
    fetchDataReasons();
  }, []);

  const handleSelectRule = (reasonData: reasonDataType) => {
    console.log('Reason Data:', reasonData);

    // const { removal_reason_title, reason_message, _id } = reasonData;
    // console.log('Extracted Data:', removal_reason_title, reason_message, _id);

    const removal_reason_id = reasonData._id;
    let removal_reason;
    if (reasonData.removal_reason) {
      removal_reason = reasonData.removal_reason;
    } else {
      removal_reason = '';
    }
    const community_name = '';

    setInitialValues({
      community_name,
      removal_reason_title: reasonData.removal_reason_title,
      removal_reason,
      removal_reason_id,
    });
    setOpenAddRule(true);
  };

  return (
    <>
      {reasonsList.length < 1 ? (
        <div className='flex flex-col items-center justify-center text-lg mt-40'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-12 h-12 mb-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
            />
          </svg>
          <div className='text-xl'>No reasons yet</div>
        </div>
      ) : (
        <div className='mt-20'>
          {reasonsList.map((reasonData, index) => (
            <div key={index} className=' flex flex-col'>
              <div className='flex p-4 border-b'>
                <div className='flex-1'>
                  {index + 1}. {reasonData.removal_reason_title}
                </div>
                <div
                  className='flex items-center cursor-pointer'
                  onClick={() => handleSelectRule(reasonData)}
                >
                  <RoundedButton
                    type='button'
                    buttonBorderColor='border-white'
                    buttonText='Edit'
                    buttonTextColor='text-blue-light text-sm font-bold'
                    buttonColor='bg-white '
                  />
                </div>
                <AddRemovalReason
                  open={openAddRule}
                  handleOpen={() => setOpenAddRule(!openAddRule)}
                  initialValues={initialValues}
                  isEdit={true}
                  fetchData={fetchDataReasons}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
