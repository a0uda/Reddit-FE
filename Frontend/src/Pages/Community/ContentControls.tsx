import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import RoundedButton from '../../Components/RoundedButton';
import { fetchRequest, patchRequest } from '../../API/User';
import { useAlert } from '../../Providers/AlertProvider';
import Card from '../UserSettings/Containers/Card';
import SwitchButton from '../../Components/SwitchButton';
import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoadingProvider from '../../Components/LoadingProvider';

function ContentControls() {
  const [postGuidelines, setPostGuidelines] = useState(false);
  const [guidelineText, setGuidelineText] = useState('');
  const [restrictSameLinkPost, setRestrictSameLinkPost] = useState(false);
  const [restrictionDays, setRestrictionDays] = useState(0);
  const [requirePostTitle, setRequirePostTitle] = useState(false);
  const [banPostTitle, setBanPostTitle] = useState(false);
  const [banPostBody, setBanPostBody] = useState(false);
  const [banLinks, setBanLinks] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  ///
  const [inputRequirePostTitle, setinputRequirePostTitle] = useState('');
  const [selectedRequiredPostTitle, setselectedRequiredPostTitle] = useState(
    []
  );
  const handleRequirePostTitleSelect = (word) => {
    setinputRequirePostTitle('');
    setselectedRequiredPostTitle([...selectedRequiredPostTitle, word]);
  };

  const handleRequirePostTitleDelete = (word) => {
    setselectedRequiredPostTitle(
      selectedRequiredPostTitle.filter((w) => w !== word)
    );
  };
  const currentRequirePostTitle = selectedRequiredPostTitle.length;
  ////
  const [inputBanPostTitle, setinputBanPostTitle] = useState('');
  const [selectedBanPostTitle, setselectedBanPostTitle] = useState([]);
  const handleBanPostTitleSelect = (word) => {
    setinputBanPostTitle('');
    setselectedBanPostTitle([...selectedBanPostTitle, word]);
  };

  const handleBanPostTitleDelete = (word) => {
    setselectedBanPostTitle(selectedBanPostTitle.filter((w) => w !== word));
  };
  const [isTypingRequired, setisTypingRequired] = useState(false);
  const [isTypingBan, setisTypingBan] = useState(false);
  const currentBanPostTitle = selectedBanPostTitle.length;
  /////
  const [inputBanPostBody, setinputBanPostBody] = useState('');
  const [selectedBanPostBody, setselectedBanPostBody] = useState([]);
  const handleBanPostBodySelect = (word) => {
    setinputBanPostBody('');
    setselectedBanPostBody([...selectedBanPostBody, word]);
  };

  const handleBanPostBodyDelete = (word) => {
    setselectedBanPostBody(selectedBanPostBody.filter((w) => w !== word));
  };
  const [isTypingBanBody, setisTypingBanBody] = useState(false);
  const currentBanPostBody = selectedBanPostBody.length;
  /////

  const [inputBanLink, setinputBanLink] = useState('');
  const [selectedBanLink, setselectedBanLink] = useState([]);
  const handleBanLinkSelect = (word) => {
    setinputBanLink('');
    setselectedBanLink([...selectedBanLink, word]);
  };

  const handleBanLinkDelete = (word) => {
    setselectedBanPostBody(selectedBanPostBody.filter((w) => w !== word));
  };
  const [isTypingBanLink, setisTypingBanLink] = useState(false);

  /////
  const maxLength = 400;
  const remainingCharacters = maxLength - guidelineText.length;
  ////
  const { community_name } = useParams();
  const { data, isError, isLoading, refetch } = useQuery(
    'general settings',
    () => fetchRequest(`communities/get-content-controls/${community_name}`)
  );
  useEffect(() => {
    if (data) {
      setPostGuidelines(
        data.data.providing_members_with_posting_guidlines.flag
      );
      console.log('post guide line', postGuidelines);
      setGuidelineText(
        data.data.providing_members_with_posting_guidlines.guidline_text
      );
      setRestrictSameLinkPost(
        data.data.restrict_how_often_the_same_link_can_be_posted.flag
      );
      setRestrictionDays(
        data.data.restrict_how_often_the_same_link_can_be_posted.number_of_days
      );
      setRequirePostTitle(data.data.require_words_in_post_title.flag);
      setBanPostTitle(data.data.ban_words_from_post_title.flag);
      setBanPostBody(data.data.ban_words_from_post_body.flag);
      setBanLinks(data.data.require_or_ban_links_from_specific_domains);
      setSelectedOption(
        data.data.require_or_ban_links_from_specific_domains.restriction_type
      );
      setselectedRequiredPostTitle(
        data.data.require_words_in_post_title.add_required_words
      );
      setselectedBanPostTitle(
        data.data.ban_words_from_post_title.add_banned_words
      );
      setselectedBanPostBody(
        data.data.ban_words_from_post_body.add_banned_words
      );
      setselectedBanLink(
        data.data.require_or_ban_links_from_specific_domains
          .require_or_block_link_posts_with_these_domains
      );
    }
  }, [data]);
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
    console.log('list', selectedRequiredPostTitle);
    patchReq.mutate({
      endPoint: `communities/change-content-controls/${community_name}`,
      newSettings: {
        providing_members_with_posting_guidlines: {
          flag: postGuidelines,
          guidline_text: guidelineText,
        },
        require_words_in_post_title: {
          flag: requirePostTitle,
          add_required_words: selectedRequiredPostTitle,
        },
        ban_words_from_post_title: {
          flag: banPostTitle,
          add_banned_words: selectedBanPostTitle,
        },
        ban_words_from_post_body: {
          flag: banPostBody,
          add_banned_words: selectedBanPostBody,
        },
        require_or_ban_links_from_specific_domains: {
          flag: banLinks,
          restriction_type: selectedOption,
          require_or_block_link_posts_with_these_domains: selectedBanLink,
        },
        restrict_how_often_the_same_link_can_be_posted: {
          flag: restrictSameLinkPost,
          number_of_days: restrictionDays,
        },
      },
    });
  };

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <div className='flex justify-end my-4'>
        <RoundedButton
          buttonText='Save changes'
          buttonBorderColor=''
          buttonColor='bg-[#0079D3]'
          buttonTextColor='white'
          onClick={handleSaveChanges}
        ></RoundedButton>
      </div>
      <h2 className='text-xl my-4 font-semibold'>Content controls</h2>
      <h3 className='text-base my-4 '>
        Set requirements and restrictions for how people post and comment in
        your community
      </h3>
      <h2 className='text-2xl mx-5 font-semibold border-b-[1px] pb-1'>
        Post Requirments
      </h2>
      <div className='mx-5 my-5 space-y-5'>
        <Card
          title='Provide members with posting guidelines'
          description='Posting guidelines let people who are new to your community 
          or posting for the first time know what your expectations are. 
          If you have specific flair or formatting requirements for posts, 
          this is the place to make it clear what you’d like.'
        >
          <SwitchButton
            checked={postGuidelines}
            onChange={(value) => {
              setPostGuidelines(value);
            }}
          />
        </Card>
        {postGuidelines && (
          <>
            <Card title='Guideline text'></Card>
            <Card className='w-[500px] '>
              <textarea
                value={guidelineText}
                placeholder='Example: Only make posts about dogs'
                className='!resize !border rounded border-[#EDEFF1] bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3 h-20'
                onChange={(e) => setGuidelineText(e.target.value)}
                maxLength={400}
              />
            </Card>
            <div className='text-sm text-gray-500'>
              {remainingCharacters} characters remaining
            </div>
          </>
        )}
        <Card
          title='Require words in the post title'
          description='Posts without these words in the title can’t be submitted. '
        >
          <SwitchButton
            checked={requirePostTitle}
            onChange={(value) => {
              setRequirePostTitle(value);
            }}
          />
        </Card>
        {requirePostTitle && (
          <>
            <Card title='Add required words'></Card>
            <div
              className={` w-[450px]  rounded border-2  ${isTypingRequired ? 'border-black' : 'border-gray-300'}`}
            >
              {selectedRequiredPostTitle.map((word) => (
                <button
                  key={word}
                  className='bg-blue-500 text-black bg-gray-100 rounded p-1  m-1  hover:bg-blue-light hover:text-white'
                  onClick={() => handleRequirePostTitleDelete(word)}
                >
                  <div className='flex flex-row justify-center items-center gap-2'>
                    {word}
                    <XMarkIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
                  </div>
                </button>
              ))}
              <textarea
                className=' h-8 w-auto  p-2 resize-none outline-none bg-transparent overflow-hidden'
                value={inputRequirePostTitle}
                onChange={(e) => setinputRequirePostTitle(e.target.value)}
                onFocus={() => setisTypingRequired(true)}
                onBlur={() => setisTypingRequired(false)}
                maxLength={40}
              ></textarea>
            </div>
            {inputRequirePostTitle && (
              <div className=' w-full'>
                {inputRequirePostTitle.split(' ').map((word) => (
                  <button
                    key={word}
                    className=' text-gray-800 shadow-md rounded hover:bg-blue-light hover:text-white px-2 '
                    onClick={() => handleRequirePostTitleSelect(word)}
                  >
                    Add {word}
                  </button>
                ))}
              </div>
            )}
            <div className='w-full text-sm text-gray-500 mt-2'>
              {`${currentRequirePostTitle}/15 words`}
            </div>
          </>
        )}
        <Card
          title='Ban words from the post title'
          description='Posts with these words in the title can’t be submitted. '
        >
          <SwitchButton
            checked={banPostTitle}
            onChange={(value) => {
              setBanPostTitle(value);
            }}
          />
        </Card>
        {banPostTitle && (
          <>
            <Card title='Add banned words'></Card>
            <div
              className={` w-[450px]  rounded border-2  ${isTypingBan ? 'border-black' : 'border-gray-300'}`}
            >
              {selectedBanPostTitle.map((word) => (
                <button
                  key={word}
                  className='bg-blue-500 text-black bg-gray-100 rounded p-1  m-1  hover:bg-blue-light hover:text-white'
                  onClick={() => handleBanPostTitleDelete(word)}
                >
                  <div className='flex flex-row justify-center items-center gap-2'>
                    {word}
                    <XMarkIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
                  </div>
                </button>
              ))}
              <textarea
                className=' h-8 w-auto  p-2 resize-none outline-none bg-transparent overflow-hidden'
                value={inputBanPostTitle}
                onChange={(e) => setinputBanPostTitle(e.target.value)}
                onFocus={() => setisTypingBan(true)}
                onBlur={() => setisTypingBan(false)}
                maxLength={40}
              ></textarea>
            </div>
            {inputBanPostTitle && (
              <div className=' w-full'>
                {inputBanPostTitle.split(' ').map((word) => (
                  <button
                    key={word}
                    className=' text-gray-800 shadow-md rounded hover:bg-blue-light hover:text-white px-2 '
                    onClick={() => handleBanPostTitleSelect(word)}
                  >
                    Add {word}
                  </button>
                ))}
              </div>
            )}
            <div className='w-full text-sm text-gray-500 mt-2'>
              {`${currentBanPostTitle}/15 words`}
            </div>
          </>
        )}
        <Card
          title='Ban words from the post body'
          description='Posts with these words in the body can’t be submitted.'
        >
          <SwitchButton
            checked={banPostBody}
            onChange={(value) => {
              setBanPostBody(value);
            }}
          />
        </Card>
        {banPostBody && (
          <>
            <Card title='Add banned words'></Card>
            <div
              className={` w-[450px]  rounded border-2  ${isTypingBanBody ? 'border-black' : 'border-gray-300'}`}
            >
              {selectedBanPostBody.map((word) => (
                <button
                  key={word}
                  className='bg-blue-500 text-black bg-gray-100 rounded p-1  m-1  hover:bg-blue-light hover:text-white'
                  onClick={() => handleBanPostBodyDelete(word)}
                >
                  <div className='flex flex-row justify-center items-center gap-2'>
                    {word}
                    <XMarkIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
                  </div>
                </button>
              ))}
              <textarea
                className=' h-8 w-auto  p-2 resize-none outline-none bg-transparent overflow-hidden'
                value={inputBanPostBody}
                onChange={(e) => setinputBanPostBody(e.target.value)}
                onFocus={() => setisTypingBanBody(true)}
                onBlur={() => setisTypingBanBody(false)}
                maxLength={40}
              ></textarea>
            </div>
            {inputBanPostBody && (
              <div className=' w-full'>
                {inputBanPostBody.split(' ').map((word) => (
                  <button
                    key={word}
                    className=' text-gray-800 shadow-md rounded hover:bg-blue-light hover:text-white px-2 '
                    onClick={() => handleBanPostBodySelect(word)}
                  >
                    Add {word}
                  </button>
                ))}
              </div>
            )}
            <div className='w-full text-sm text-gray-500 mt-2'>
              {`${currentBanPostBody}/15 words`}
            </div>
          </>
        )}
        <Card
          title='Require or ban links from specific domains'
          description='Posts with links that don’t fit your requirements can’t be submitted.'
        >
          <SwitchButton
            checked={banLinks}
            onChange={(value) => {
              setBanLinks(value);
            }}
          />
        </Card>
        {banLinks && (
          <>
            <Card
              title='Restriction type'
              description=''
              className='text-xs'
            ></Card>
            <Card title='' description=''>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='required'
                    name='required'
                    value='required'
                    checked={selectedOption === 'Required domains'}
                    onChange={() => setSelectedOption('Required domains')}
                    className='mr-2'
                  />
                  <Typography
                    color='black'
                    className='font-normal flex text-xs gap-2 items-center'
                  >
                    Required domains
                  </Typography>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='blocked'
                    name='blocked'
                    value='blocked'
                    checked={selectedOption === 'Blocked domains'}
                    onChange={() => setSelectedOption('Blocked domains')}
                    className='mr-2'
                  />
                  <Typography
                    color='black'
                    className='font-normal flex text-xs gap-2 items-center'
                  >
                    Blocked domains
                  </Typography>
                </div>
              </div>
            </Card>
            <Card
              title={
                selectedOption === 'Required domains'
                  ? 'Only allow link posts with these domains'
                  : 'Block link posts with these domains'
              }
            ></Card>
            <div
              className={` w-[450px]  rounded border-2  ${isTypingBanLink ? 'border-black' : 'border-gray-300'}`}
            >
              {selectedBanLink.map((word) => (
                <button
                  key={word}
                  className='bg-blue-500 text-black bg-gray-100 rounded p-1  m-1  hover:bg-blue-light hover:text-white'
                  onClick={() => handleBanLinkDelete(word)}
                >
                  <div className='flex flex-row justify-center items-center gap-2'>
                    {word}
                    <XMarkIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
                  </div>
                </button>
              ))}
              <textarea
                className=' h-8 w-auto  p-2 resize-none outline-none bg-transparent overflow-hidden'
                value={inputBanLink}
                onChange={(e) => setinputBanLink(e.target.value)}
                onFocus={() => setisTypingBanLink(true)}
                onBlur={() => setisTypingBanLink(false)}
                maxLength={40}
              ></textarea>
            </div>
            {inputBanLink && (
              <div className=' w-full'>
                {inputBanLink.split(' ').map((word) => (
                  <button
                    key={word}
                    className=' text-gray-800 shadow-md rounded hover:bg-blue-light hover:text-white px-2 '
                    onClick={() => handleBanLinkSelect(word)}
                  >
                    Add {word}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        <Card
          title='Restrict how often the same link can be posted'
          description='Posts that have a link that has already been 
          posted to your community cannot be submitted within the number of days you select.'
        >
          <SwitchButton
            checked={restrictSameLinkPost}
            onChange={(value) => {
              setRestrictSameLinkPost(value);
            }}
          />
        </Card>
        {restrictSameLinkPost && (
          <Card title='' description=''>
            <div className='relative'>
              <input
                type='number'
                min={1}
                value={restrictionDays}
                onChange={(e) => setRestrictionDays(parseInt(e.target.value))}
                className='appearance-none w-36 h-14 px-3 py-1 text-left text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
              />

              <div className='absolute top-1 left-3 text-xs text-gray-500'>
                NUMBER OF DAYS
              </div>
            </div>
          </Card>
        )}
      </div>
    </LoadingProvider>
  );
}

export default ContentControls;
