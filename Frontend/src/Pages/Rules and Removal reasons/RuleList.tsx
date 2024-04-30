import { useEffect, useState } from 'react';
import AddRule from './AddRule';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface ruleData {
  _id: string;
  rule_title: string;
  applies_to: string;
  report_reason: string;
  full_description: string;
  __v: number;
}

export default function RuleList() {
  const [openAddRule, setOpenAddRule] = useState(false);
  const { community_name } = useParams();
  const [rulesList, setRulesList] = useState<ruleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setRulesList([]);
      try {
        const res = await axios.get(
          `${process.env.VITE_BASE_URL}communities/get-rules/${community_name}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
            params: {
              community_name: community_name,
            },
          }
        );
        setRulesList(res.data.map((item) => ({ ...item, selected: false })));
        console.log(res.data, 'resss');
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const [initialValues, setInitialValues] = useState({
    rule_title: '',
    applies_to: '',
    report_reason: '',
    full_description: '',
    community_name: '',
    rule_id: '',
  });

  const handleSelectRule = (ruleData: ruleData) => {
    const { rule_title, applies_to, report_reason, full_description } =
      ruleData;
    const community_name = 'ssss';
    const rule_id = ruleData._id;
    setInitialValues({
      rule_title,
      applies_to,
      report_reason,
      full_description,
      community_name,
      rule_id,
    });
    console.log('skasmkajmklads', initialValues);
    setOpenAddRule(true);
  };
  const handleSelectDetails = (index: number) => {
    setRulesList((prevRulesList: any) => {
      const updatedRulesList = [...prevRulesList];
      updatedRulesList[index] = {
        ...updatedRulesList[index],
        selected: !updatedRulesList[index].selected,
      };
      return updatedRulesList;
    });
  };
  return (
    <>
      {rulesList.length < 1 ? (
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
      ) : (
        <div className='mt-20'>
          {rulesList.map((ruleData, index) => (
            <div key={index} className=' flex flex-col'>
              <div className='flex p-4 border'>
                <div className='flex-1'>
                  {index + 1}. {ruleData.rule_title}
                </div>
                <div
                  className='flex items-center cursor-pointer'
                  onClick={() => handleSelectRule(ruleData)}
                >
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
                <div
                  className='ms-4'
                  onClick={() => handleSelectDetails(index)}
                >
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
                      d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                    />
                  </svg>
                </div>
                <AddRule
                  open={openAddRule}
                  handleOpen={() => setOpenAddRule(!openAddRule)}
                  initialValues={initialValues}
                  isEdit={true}
                />
              </div>

              {ruleData.selected ? (
                <RuleDetails
                  applies_to={ruleData.applies_to}
                  report_reason={ruleData.report_reason}
                  full_description={ruleData.full_description}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function RuleDetails(props: {
  applies_to: string;
  report_reason: string;
  full_description: string;
}) {
  const { applies_to, report_reason, full_description } = props;

  return (
    <div className='bg-gray-300 text-black p-4 text-xs'>
      <div>
        REPORT REASON
        <div className='text-gray-700'>{report_reason}</div>
      </div>
      <div className='mt-2'>
        APPLIES TO
        <div className='text-gray-700'>{applies_to}</div>
      </div>

      <div className='mt-2'>
        FULL DESCRIPTION
        <div className='text-gray-700'>{full_description}</div>
      </div>
    </div>
  );
}
