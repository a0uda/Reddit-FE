import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import SwitchButton from './Containers/SwitchButton';
import DropDownButton from './Containers/DropDownButton';
import { Spinner } from '@material-tailwind/react';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest } from '../../API/User';
import LoadingProvider from './Containers/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';

function FeedSettings() {
  const { data, error, isLoading, refetch } = useQuery(
    'feed settings data',
    () => fetchRequest('users/feed-settings')
  );
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const mutation = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });

  const handleToggleSwitch = (newSettings: object) => {
    mutation.mutate({
      endPoint: 'users/change-feed-settings',
      newSettings: { feed_settings: newSettings },
    });
  };
  const {
    Adult_content_flag,
    autoplay_media,
    communitiy_content_sort,
    global_content,
    Open_posts_in_new_tab,
    community_themes,
  } = data?.data.feed_settings || {};
  console.log('Adult_content_flag', Adult_content_flag);

  return (
    <LoadingProvider error={error} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Feed Settings</h2>
      <Section sectionTitle='CONTENT PREFERENCES'>
        <Card
          title='Show mature (18+) content'
          description='See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.'
        >
          <SwitchButton
            checked={Adult_content_flag}
            onChange={(value) =>
              handleToggleSwitch({ Adult_content_flag: value })
            }
          />
        </Card>
        <Card
          title='Autoplay media'
          description='Play videos and gifs automatically when in the viewport.'
        >
          <SwitchButton
            checked={autoplay_media}
            onChange={(value) => handleToggleSwitch({ autoplay_media: value })}
          />
        </Card>
        <Card
          title='Community themes'
          description='Use custom themes for all communities. You can also turn this off on a per community basis.'
        >
          <SwitchButton
            checked={community_themes}
            onChange={(value) =>
              handleToggleSwitch({ community_themes: value })
            }
          />
        </Card>
        <Card
          title='Community content sort'
          description='Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.'
        >
          <DropDownButton
            selected={communitiy_content_sort?.type}
            buttonList={['hot', 'new', 'top', 'rising']}
            handleSelectionChange={(selectedItem) =>
              handleToggleSwitch({
                communitiy_content_sort: {
                  type: selectedItem,
                },
              })
            }
          />
        </Card>
        <Card
          className='pl-10'
          title='Remember per community'
          description='Enable if you would like each community to remember and use the last content sort you selected for that community.'
        >
          <SwitchButton
            checked={communitiy_content_sort?.sort_remember_per_community}
            onChange={(value) =>
              handleToggleSwitch({
                communitiy_content_sort: {
                  sort_remember_per_community: value,
                },
              })
            }
          />
        </Card>
        <Card
          title='Global content view'
          description='Choose how you would like content displayed in feeds. This control is also found above your feed.'
        >
          <DropDownButton
            selected={global_content?.global_content_view}
            buttonList={['card', 'classic', 'compact']}
            handleSelectionChange={(selectedItem) =>
              handleToggleSwitch({
                global_content: {
                  global_content_view: selectedItem,
                },
              })
            }
          />
        </Card>
        <Card
          className='pl-10'
          title='Remember per community'
          description='Enable if you would like each community to remember and use the last content sort you selected for that community.'
        >
          <SwitchButton
            checked={global_content?.global_remember_per_community}
            onChange={(value) =>
              handleToggleSwitch({
                global_content: {
                  global_remember_per_community: value,
                },
              })
            }
          />
        </Card>
        <Card
          title='Open posts in new tab'
          description='Enable to always open posts in a new tab.'
        >
          <SwitchButton
            checked={Open_posts_in_new_tab}
            onChange={(value) =>
              handleToggleSwitch({ Open_posts_in_new_tab: value })
            }
          />
        </Card>
      </Section>
    </LoadingProvider>
  );
}

export default FeedSettings;
