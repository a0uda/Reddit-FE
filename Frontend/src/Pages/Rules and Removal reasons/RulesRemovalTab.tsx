import { useState } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import { useParams } from 'react-router-dom';
import AddRule from './AddRule';
import AddRemovalReason from './AddRemovalReason';
import ModSideBar from './ModSidebar';
import RuleList from './RuleList';
import ReasonList from './ReasonList';

export default function RuleRemoval() {
  const [buttonSelect, setButtonSelect] = useState(0);
  const { community_name } = useParams();
  const [openAddRule, setOpenAddRule] = useState(false);
  const initialValues = {
    community_name: '',
    rule_title: '',
    applies_to: '',
    report_reason: '',
    full_description: '',
    rule_id: '',
  };
  const initialVal = {
    removal_reason_id: '',
    community_name: '',
    removal_reason_title: '',
    reason_message: '',
  };
  return (
    <>
      <div className='Container'>
        <div className='text-blue-light ps-4 ms-4 mt-4 font-bold border-b-2 pb-2 '>
          <span className='border rounded-full bg-blue-light text-white ps-1 pe-1 me-2'>
            r/
          </span>{' '}
          R/ {community_name}
          <span className='text-black ms-2'>
            {buttonSelect == 0 ? '/ Rules' : '/ Removal Reasons'}
          </span>
        </div>
        <div className='grid grid-col-1 xl:grid-cols-layout'>
          <div className='hidden xl:block'>
            <ModSideBar />
          </div>
          <div className='container mt-4'>
            <div className='font-bold'>Rules and Removal Reasons</div>
            <div className='flex mt-4 space-x-2 '>
              <RoundedButton
                buttonBorderColor='text-white'
                buttonText='Rules'
                buttonTextColor='text-black font-bold'
                buttonColor={buttonSelect == 0 ? 'bg-gray-400' : 'bg-white'}
                onClick={() => setButtonSelect(0)}
              />
              <RoundedButton
                buttonBorderColor='text-white'
                buttonText='Removal Reasons'
                buttonTextColor='text-black font-bold'
                buttonColor={buttonSelect == 1 ? 'bg-gray-400' : 'bg-white'}
                onClick={() => setButtonSelect(1)}
              />
            </div>
            <div className='float-right mt-2'>
              {buttonSelect == 0 ? (
                <>
                  <RoundedButton
                    buttonBorderColor='text-white'
                    buttonText='Add rule'
                    buttonTextColor='text-white font-bold'
                    buttonColor='bg-blue-light'
                    onClick={() => setOpenAddRule(true)}
                  />
                  <AddRule
                    open={openAddRule}
                    handleOpen={() => setOpenAddRule(!openAddRule)}
                    initialValues={initialValues}
                  />
                </>
              ) : (
                <>
                  <RoundedButton
                    buttonBorderColor='text-white'
                    buttonText='Add removal reason'
                    buttonTextColor='text-white font-bold'
                    buttonColor='bg-blue-light'
                    onClick={() => setOpenAddRule(!openAddRule)}
                  />
                  <AddRemovalReason
                    open={openAddRule}
                    handleOpen={() => setOpenAddRule(!openAddRule)}
                    initialValues={initialVal}
                  />
                </>
              )}
            </div>

            <div className='mt-10'>
              {buttonSelect == 0 ? <RuleList /> : <ReasonList />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
