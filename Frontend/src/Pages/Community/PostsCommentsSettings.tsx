import { useMutation, useQuery } from 'react-query';
import RoundedButton from '../../Components/RoundedButton';
import Section from '../UserSettings/Containers/Section';
import { useAlert } from '../../Providers/AlertProvider';
import { fetchRequest, patchRequest } from '../../API/User';
import Card from '../UserSettings/Containers/Card';
import SwitchButton from '../../Components/SwitchButton';
import DropDownButton from '../UserSettings/Containers/DropDownButton';
import { useEffect, useState } from 'react';

function PostsCommentsSettings() {
  const [crossPost, setCrossPost] = useState(false);
  const [archivePost, setArchivePost] = useState(false);
  const [spoilerTag, setSpoilerTag] = useState(false);
  const [imageUploads, setImageUploads] = useState(false);
  const [multipleImages, setMultipleImages] = useState(false);
  const [allowPolls, setAllowPolls] = useState(false);
  const [postOptions, setPostOptions] = useState('');
  const [postSpam, setPostSpam] = useState('');
  const [linkSpam, setLinkSpam] = useState('');
  const [commentSpam, setCommentSpam] = useState('');
  const [suggestedSort, setSuggestedSort] = useState('');
  const [giphy, setGiphy] = useState(false);
  const [expressions, setExpressions] = useState(false);
  const [images, setImages] = useState(false);
  const [gifs, setGifs] = useState(false);
  const [collapse, setCollpase] = useState(false);
  const [commentScores, setCommentScores] = useState(0);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const { data, error, isLoading, refetch } = useQuery(
    'posts comments settings',
    () => fetchRequest('communities/get-posts-and-comments/reem')
  );
  useEffect(() => {
    if (data) {
      setCrossPost(data.data.posts.allow_crossposting_of_posts);
      setArchivePost(data.data.posts.archive_posts);
      setSpoilerTag(data.data.posts.enable_spoiler_tag);
      setImageUploads(
        data.data.posts.allow_image_uploads_and_links_to_image_hosting_sites
      );
      setMultipleImages(data.data.posts.allow_multiple_images_per_post);
      setAllowPolls(data.data.posts.allow_polls);
      setPostOptions(data.data.posts.post_type_options);
      setPostSpam(data.data.posts.spam_filter_strength.posts);
      setLinkSpam(data.data.posts.spam_filter_strength.links);
      setCommentSpam(data.data.posts.spam_filter_strength.comments);
      setSuggestedSort(data.data.comments.suggested_sort);
      setGiphy(data.data.comments.gifs_from_giphy);
      setExpressions(data.data.comments.collectible_expressions);
      setImages(data.data.comments.images);
      setGifs(data.data.comments.gifs);
      setCollpase(data.data.comments.collapse_deleted_and_removed_comments);
      setCommentScores(data.data.comments.minutes_to_hide_comment_scores);
    }
  }, [data]);
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
      endPoint: 'communities/change-posts-and-comments/reem',
      newSettings: {
        posts: {
          spam_filter_strength: {
            posts: postSpam,
            links: linkSpam,
            comments: commentSpam,
          },
          post_type_options: postOptions,
          allow_crossposting_of_posts: crossPost,
          archive_posts: archivePost,
          enable_spoiler_tag: spoilerTag,
          allow_image_uploads_and_links_to_image_hosting_sites: imageUploads,
          allow_multiple_images_per_post: multipleImages,
          allow_polls: allowPolls,
        },
        comments: {
          media_in_comments: {
            gifs_from_giphy: giphy,
            collectible_expressions: expressions,
            images: images,
            gifs: gifs,
          },
          suggested_sort: suggestedSort,
          collapse_deleted_and_removed_comments: collapse,
          minutes_to_hide_comment_scores: commentScores,
        },
      },
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
      <h2 className='text-xl my-4 font-semibold'>Post and Comment Settings</h2>
      <Section sectionTitle='Posts'>
        <Card title='Post type options' description=''>
          <DropDownButton
            buttonList={['Any', 'Links Only', 'Text Posts Only']}
            buttonText={postOptions}
            selected={postOptions}
            handleSelectionChange={(value) => setPostOptions(value)}
          />
        </Card>
        <Card title='Allow crossposting of posts.' description=''>
          <SwitchButton
            checked={crossPost}
            onChange={(value) => setCrossPost(value)}
          />
        </Card>
        <Card
          title='Archive posts'
          description='Don’t allow commenting or voting on posts older than 6 months'
        >
          <SwitchButton
            checked={archivePost}
            onChange={(value) => setArchivePost(value)}
          />
        </Card>
        <Card
          title='Enable spoiler tag'
          description='Media on posts with the spoiler tag are blurred'
        >
          <SwitchButton
            checked={spoilerTag}
            onChange={(value) => setSpoilerTag(value)}
          />
        </Card>
        <Card
          title='Allow image uploads and links to image hosting sites'
          description=''
        >
          <SwitchButton
            checked={imageUploads}
            onChange={(value) => setImageUploads(value)}
          />
        </Card>
        {imageUploads && (
          <Card title='Allow multiple images per post' description=''>
            <SwitchButton
              checked={multipleImages}
              onChange={(value) => setMultipleImages(value)}
            />
          </Card>
        )}
        <Card title='Allow polls' description=''>
          <SwitchButton
            checked={allowPolls}
            onChange={(value) => setAllowPolls(value)}
          />
        </Card>
        <Card
          title='Spam filter strength'
          description="'HIGH' is the standard filter, 'LOW' disables most filtering, 'ALL' will filter every post initially and they will need to be approved manually to be visible"
        ></Card>
        <Card className='pl-10' title='Posts' description=''>
          <DropDownButton
            buttonList={['High (Default)', 'Low', 'All']}
            buttonText={postSpam}
            selected={postSpam}
            handleSelectionChange={(value) => setPostSpam(value)}
          />
        </Card>
        <Card className='pl-10' title='Links' description=''>
          <DropDownButton
            buttonList={['High (Default)', 'Low', 'All']}
            buttonText={linkSpam}
            selected={linkSpam}
            handleSelectionChange={(value) => setLinkSpam(value)}
          />
        </Card>
        <Card className='pl-10' title='Comments' description=''>
          <DropDownButton
            buttonList={['High', 'Low (Default)', 'All']}
            buttonText={commentSpam}
            selected={commentSpam}
            handleSelectionChange={(value) => setCommentSpam(value)}
          />
        </Card>
      </Section>
      <Section sectionTitle='Comments'>
        <Card
          title='Suggested sort'
          description='All comment feeds in community will default to this sort setting'
        >
          <DropDownButton
            buttonList={[
              'None (Recommended)',
              'Best',
              'Old',
              'Top',
              'Q&A',
              'Live (Beta)',
              'Controversial',
              'New',
            ]}
            buttonText={suggestedSort}
            selected={suggestedSort}
            handleSelectionChange={(value) => setSuggestedSort(value)}
          />
        </Card>
        <Card title='Collapse deleted and removed comments' description=''>
          <SwitchButton
            checked={collapse}
            onChange={(value) => setCollpase(value)}
          />
        </Card>
        <Card title='Minutes to hide comment scores' description=''></Card>
        <Card title='' description=''>
          <input
            type='number'
            value={commentScores}
            onChange={(e) => setCommentScores(parseInt(e.target.value))}
            className='appearance-none w-36  h-11 px-3 py-1 text-left text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
          />
        </Card>
        <Card title='Media in comments' description=''></Card>
        <Card
          className='pl-10'
          title='GIFs from GIPHY'
          description='Allow comments with GIFs from GIPHY.'
        >
          <SwitchButton checked={giphy} onChange={(value) => setGiphy(value)} />
        </Card>
        <Card
          className='pl-10'
          title='Collectible Expressions'
          description='Allow comments with Collectible Expressions.'
        >
          <SwitchButton
            checked={expressions}
            onChange={(value) => setExpressions(value)}
          />
        </Card>
        <Card
          className='pl-10'
          title='Images'
          description='Allow comments with uploaded images.'
        >
          <SwitchButton
            checked={images}
            onChange={(value) => setImages(value)}
          />
        </Card>
        <Card
          className='pl-10'
          title='GIFs'
          description='Allow comments with uploaded GIFs.'
        >
          <SwitchButton checked={gifs} onChange={(value) => setGifs(value)} />
        </Card>
      </Section>
    </>
  );
}

export default PostsCommentsSettings;
