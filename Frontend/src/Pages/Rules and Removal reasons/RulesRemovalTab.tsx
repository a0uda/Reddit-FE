import { useState } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import { useParams } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import AddRule from './AddRule';
export default function RuleRemoval() {
  const [buttonSelect, setButtonSelect] = useState(0);
  const { community_name } = useParams();
  const [openAddRule, setOpenAddRule] = useState(false);
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
            <SideBar />
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
                <RoundedButton
                  buttonBorderColor='text-white'
                  buttonText='Add rule'
                  buttonTextColor='text-white font-bold'
                  buttonColor='bg-blue-light'
                  onClick={() => setOpenAddRule(true)}
                />
              ) : (
                <RoundedButton
                  buttonBorderColor='text-white'
                  buttonText='Add removal reason'
                  buttonTextColor='text-white font-bold'
                  buttonColor='bg-blue-light'
                  onClick={() => setOpenAddRule(!openAddRule)}
                />
              )}
            </div>
            <AddRule
              open={openAddRule}
              handleOpen={() => setOpenAddRule(!openAddRule)}
            />

            <div className='mt-10'>
              {buttonSelect == 0 ? <RuleList /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// {
//   "_id": "6618282ceafa8bfb1c5a6253",
//   "rule_title": "volutabrum",
//   "rule_order": 1868276239958016,
//   "applies_to": "comments_only",
//   "report_reason": "incidunt",
//   "full_description": "Cresco supplanto attero tego. Confero apparatus solvo explicabo trucido. Optio consequuntur minus desparatus utrimque.",
//   "__v": 0
// },

function RuleList() {
  const rule = [
    {
      _id: '6618282ceafa8bfb1c5a6253',
      rule_title: 'volutabrum',
      rule_order: 1868276239958016,
      applies_to: 'comments_only',
      report_reason: 'incidunt',
      full_description:
        'Cresco supplanto attero tego. Confero apparatus solvo explicabo trucido. Optio consequuntur minus desparatus utrimque.',
      __v: 0,
    },
    {
      _id: '6618282ceafa8bfb1c5a6253',
      rule_title: 'volutabrum',
      rule_order: 1868276239958016,
      applies_to: 'comments_only',
      report_reason: 'incidunt',
      full_description:
        'Cresco supplanto attero tego. Confero apparatus solvo explicabo trucido. Optio consequuntur minus desparatus utrimque.',
      __v: 0,
    },
  ];
  const [rulesList, setRulesList] = useState(rule);
  return (
    <>
      {!rulesList ? (
        <>
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
                d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
              />
            </svg>
            <div className='text-xl'>No rules yet</div>
          </div>
        </>
      ) : (
        <>
          <div className='mt-20'>
            {rulesList.map((rule, index) => (
              <div key={rule._id} className='border p-4 flex'>
                <div className='flex-1'>
                  {index + 1}
                  {'  '}
                  {rule.rule_title}
                </div>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                    />
                  </svg>
                </div>

                {/* Uncomment below lines if you want to display additional information */}
                {/* <p>Order: {rule.rule_order}</p>
              <p>Applies to: {rule.applies_to}</p>
              <p>Report Reason: {rule.report_reason}</p>
              <p>Description: {rule.full_description}</p> */}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
