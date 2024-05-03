import { useState } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import { useParams } from 'react-router-dom';
import AddRule from './AddRule';
import AddRemovalReason from './AddRemovalReason';
import ModSideBar from './ModSidebar';
import RuleList from './RuleList';
import ReasonList from './ReasonList';
import axios from 'axios';
import LoadingProvider from '../../Components/LoadingProvider';
interface reasonDataType {
  removal_reason_title: string;
  removal_reason: string;
  _id: string;
}
interface ruleData {
  _id: string;
  rule_title: string;
  applies_to: string;
  report_reason: string;
  full_description: string;
  __v: number;
}
export default function RuleRemoval() {
  const [buttonSelect, setButtonSelect] = useState(0);
  const { community_name } = useParams();
  const [openAddRule, setOpenAddRule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [rulesList, setRulesList] = useState<ruleData[]>([]);
  const [reasonsList, setReasonsList] = useState<reasonDataType[]>([]);

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
    removal_reason: '',
  };
  const fetchDataRules = async () => {
    setIsLoading(true);
    setIsError(false);
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
      setIsError(true);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDataReasons = async () => {
    setIsLoading(true);
    setIsError(false);
    setReasonsList([]);
    try {
      const res = await axios.get(
        `${process.env.VITE_BASE_URL}communities/get-removal-reasons/${community_name}`,
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
      setReasonsList(res.data);
      console.log(res.data, 'resss');
    } catch (err) {
      setIsError(true);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
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
                    fetchData={fetchDataRules}
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
                    fetchData={fetchDataReasons}
                  />
                </>
              )}
            </div>

            <div className='mt-10'>
              {buttonSelect == 0 ? (
                <RuleList
                  fetchDataRules={fetchDataRules}
                  setRulesList={setRulesList}
                  rulesList={rulesList}
                />
              ) : (
                <ReasonList
                  fetchDataReasons={fetchDataReasons}
                  reasonsList={reasonsList}
                  setReasonsList={setReasonsList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
