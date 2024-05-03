import { useParams } from 'react-router-dom';
import ContentLayout from '../../Components/ContentLayout';
import { CommunityRSB } from '../../Components/RightSideBar/CommunityRSB';
import { useState, useEffect, useRef } from 'react';
import LoadingProvider from '../../Components/LoadingProvider';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, postRequest, patchRequest } from '../../API/User';
import { CommunityType, PostType } from '../../types/types';
import { FaPen } from 'react-icons/fa6';
import { TfiClose } from 'react-icons/tfi';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { IoCloudUploadOutline } from 'react-icons/io5';
import PostPreview from '../../Components/Posts/PostPreview';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { addPrefixToUsername } from '../../utils/helper_functions';
// import Input from '../../Components/Input';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Avatar,
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Accordion,
  AccordionHeader,
  ListItem,
  Typography,
  Input,
} from '@material-tailwind/react';

const Community = () => {
  const { communityName } = useParams();

  //================================================ Community Info ======================================================//

  const [community, setCommunity] = useState<CommunityType | undefined>();
  console.log(communityName);
  const { isLoading, isError } = useQuery({
    queryKey: ['communities', communityName],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${communityName}/`),
    onSuccess: (data) => {
      setCommunity(data.data);

      // setIsJoined(data.data.joined_flag);
      // setProfilePicture(data.data.profile_picture);
      // // todo:set the banner
      console.log('the comm', community);
    },
  });

  //================================================ Community Actions ======================================================//

  const [isJoined, setIsJoined] = useState(community?.joined_flag);
  const [isModerator, setIsModerator] = useState(community?.moderator_flag);
  const [isMuted, setIsMuted] = useState(community?.muted_flag);
  const [isFavorite, setIsFavorite] = useState(community?.favorite_flag);

  useEffect(() => {
    setIsJoined(community?.joined_flag);
    setProfilePicture(community?.profile_picture);
    setBannerPicture(community?.banner_picture);
    setIsModerator(community?.moderator_flag);
    setIsMuted(community?.muted_flag);
    setIsFavorite(community?.favorite_flag);
  }, [community]);

  const joinMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/join-community',
        data: { communityName: communityName },
      }),
    {
      onSuccess: () => {
        setIsJoined(true);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  const leaveMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/leave-community',
        data: { communityName: communityName },
      }),
    {
      onSuccess: () => {
        setIsJoined(false);
        setIsModerator(false);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  const muteUnmuteMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/mute-unmute-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setIsMuted(!isMuted);
        // setIsJoined(false);
        // setIsmoderator(false);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );
  const patchReq = useMutation(patchRequest);

  const handleFavoriteFlag = () => {
    try {
      patchReq.mutate({
        endPoint: 'users/favorite-unfavorite-community',
        newSettings: {
          community_name: communityName,
        },
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to update favorite flag:', error);
    }
  };

  //================================================ profile picture ======================================================//
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    community?.profile_picture
  );

  const [uploadedProfile, setUploadedProfile] = useState<string | undefined>(
    undefined
  );

  // Function to handle file upload
  const profilePictureHandleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // event.preventDefault();
    console.log('eventtttt', event);
    const file = event.target.files?.[0];
    if (file) {
      setUploadedProfile(URL.createObjectURL(file));
    }
  };

  // Function to handle drag and drop
  const profilePictureHandleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedProfile(URL.createObjectURL(file));
    }
  };

  //TODO: post the uploaded profile picture after firebase integration
  const addProfilePictureMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'communities/add-profile-picture',
        data: {
          community_name: communityName,
          profile_picture: uploadedProfile,
        },
      }),
    {
      onSuccess: () => {
        setProfilePicture(uploadedProfile);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  const deleteProfilePictureMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'communities/delete-profile-picture',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setProfilePicture(undefined);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  //================================================ Banner picture ======================================================//
  const [bannerPicture, setBannerPicture] = useState<string | undefined>(
    community?.banner_picture
  );

  const [uploadedBanner, setUploadedBanner] = useState<string | undefined>(
    undefined
  );

  // Function to handle file upload
  const bannerPictureHandleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedBanner(URL.createObjectURL(file));
    }
  };

  // Function to handle drag and drop
  const bannerPictureHandleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedBanner(URL.createObjectURL(file));
    }
  };

  //TODO: change the uploaded banner picture after firebase integration
  const addBannerPictureMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'communities/add-profile-picture',
        data: {
          community_name: communityName,
          banner_picture: uploadedBanner,
        },
      }),
    {
      onSuccess: () => {
        setBannerPicture(uploadedBanner);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  const deleteBannerPictureMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'communities/delete-banner-picture',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setBannerPicture(undefined);
      },
      onError: () => {
        console.log('Error');
      },
    }
  );

  //================================================ Community Posts ======================================================//

  const [communityPosts, setCommunityPosts] = useState<PostType[]>([]);
  // console.log(communityName);
  useQuery({
    queryKey: ['posts', communityName],
    queryFn: () => fetchRequest(`posts/${communityName}/`),
    onSuccess: (data) => {
      setCommunityPosts(data.data);
      console.log('the comm posts are', communityPosts);
    },
  });

  //================================================ Community Appearance ======================================================//

  const communityNameWithPrefix = addPrefixToUsername(
    communityName ?? '',
    'community'
  );

  const [communityAppearance, setCommunityAppearance] = useState<
    'no' | 'opened' | 'closed' | undefined
  >('no');

  const [communityAppearanceType, setCommunityAppearanceType] = useState<
    'Community appearance' | 'Avatar' | 'Banner' | undefined
  >('Community appearance');

  type CommunityAppearanceProps = {
    mode: 'no' | 'opened' | 'closed' | undefined;
    type: 'Community appearance' | 'Avatar' | 'Banner' | undefined;
  };

  const CommunityAppearnace = ({ mode, type }: CommunityAppearanceProps) => {
    return (
      <>
        {/* Comunityyyyyyyyyyyyyyyyyyyyyyyyyyyyyy Apearance */}
        {mode !== 'no' &&
          mode === 'opened' &&
          type === 'Community appearance' && (
            <Card className='fixed z-20 left-20 bottom-0 ml-0 border shadow-2xl shadow-black p-5 w-96'>
              <div className='flex justify-between items-center'>
                <Typography
                  variant='h6'
                  className='font-body font-bold -tracking-tight text-black'
                >
                  Community appearance
                </Typography>
                <div className='flex gap-3'>
                  <Button
                    onClick={() => {
                      setCommunityAppearance('closed');
                    }}
                    variant='text'
                    className='p-2 bg-gray-300  rounded-full'
                  >
                    <IoIosArrowDown size={15} />
                  </Button>
                  <Button
                    onClick={() => {
                      setCommunityAppearance('no');
                    }}
                    variant='text'
                    className='p-2 bg-gray-300  rounded-full'
                  >
                    <TfiClose size={15} />
                  </Button>
                </div>
              </div>
              <div className='w-100 min-h-px my-5 bg-gray-400'></div>
              <Accordion
                open={false}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 -rotate-90 `}
                  />
                }
              >
                <ListItem className='p-0 rounded-none'>
                  <AccordionHeader
                    onClick={() => {
                      setCommunityAppearanceType('Avatar');
                    }}
                    className='border-b-0 p-4'
                  >
                    <Typography className='mr-auto text-gray-900 font-light text-sm'>
                      Avatar
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
              <Accordion
                open={false}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 -rotate-90 `}
                  />
                }
              >
                <ListItem className='p-0 rounded-none'>
                  <AccordionHeader
                    onClick={() => {
                      setCommunityAppearanceType('Banner');
                    }}
                    className='border-b-0 p-4'
                  >
                    <Typography className='mr-auto text-gray-900 font-light text-sm'>
                      Banner
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Card>
          )}
        {mode !== 'no' && mode === 'closed' && (
          <Card className='fixed z-20 left-20 bottom-0 ml-0 border shadow-2xl shadow-black p-5 w-96'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-between gap-2'>
                {communityAppearanceType !== 'Community appearance' && (
                  <Button
                    onClick={() => {
                      setCommunityAppearance('opened');
                      setCommunityAppearanceType('Community appearance');
                    }}
                    variant='text'
                    className='p-2  rounded-full rotate-90'
                  >
                    <IoIosArrowDown size={15} />
                  </Button>
                )}

                <Typography
                  variant='h6'
                  className='font-body font-bold -tracking-tight text-black'
                >
                  {communityAppearanceType}
                </Typography>
              </div>
              <div className='flex gap-3'>
                <Button
                  onClick={() => {
                    setCommunityAppearance('opened');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full rotate-180'
                >
                  <IoIosArrowDown size={15} />
                </Button>
                <Button
                  onClick={() => {
                    setCommunityAppearance('no');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full '
                >
                  <TfiClose size={15} />
                </Button>
              </div>
            </div>
          </Card>
        )}
        {/* Avataaaaaaaaaaaaaaaaaaaaaaaaaaaar Apearance */}
        {mode !== 'no' && mode !== 'closed' && type === 'Avatar' && (
          <Card className='fixed z-20 left-20 bottom-0 ml-0 border shadow-2xl shadow-black p-5 w-96'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-between gap-2'>
                <Button
                  onClick={() => {
                    setCommunityAppearance('opened');
                    setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2  rounded-full rotate-90'
                >
                  <IoIosArrowDown size={15} />
                </Button>
                <Typography
                  variant='h6'
                  className='font-body font-bold -tracking-tight text-black'
                >
                  {communityAppearanceType}
                </Typography>
              </div>
              <div className='flex gap-3'>
                <Button
                  onClick={() => {
                    setCommunityAppearance('closed');
                    //   setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full rotate'
                >
                  <IoIosArrowDown size={15} />
                </Button>
                <Button
                  onClick={() => {
                    setCommunityAppearance('no');
                    setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full '
                >
                  <TfiClose size={15} />
                </Button>
              </div>
            </div>
            <div className='w-100 min-h-px my-5 bg-gray-400'></div>

            {profilePicture ? (
              <div className='flex justify-center'>
                <Avatar
                  src={profilePicture}
                  alt='profile picture'
                  variant='circular'
                  className=' w-32 h-32'
                />
                <button
                  className='absolute w-10 h-10 bg-opacity-70 hover:bg-opacity-90 bg-gray-900 rounded-full text-white right-6 bottom-6'
                  onClick={() => {
                    deleteProfilePictureMutation.mutate(communityName ?? '');
                  }}
                  data-testid='avatar-delete-button'
                >
                  <MdDeleteOutline className='w-full' />
                </button>
              </div>
            ) : (
              <>
                {!uploadedProfile && (
                  <div>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={profilePictureHandleFileUpload}
                      className='hidden'
                      id='upload-button-profile'
                    />
                    <label
                      htmlFor='upload-button-profile'
                      className='flex flex-col items-center justify-center w-full h-56 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mb-4'
                      onDrop={profilePictureHandleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <IoCloudUploadOutline className='m-50' size={30} />
                      <Typography className='text-gray-700 font-bold text-sm'>
                        Drag and drop or browse your device
                      </Typography>
                    </label>
                  </div>
                )}
                {uploadedProfile && (
                  <div>
                    <Avatar
                      src={uploadedProfile}
                      alt='profile image'
                      variant='circular'
                      className='w-32 h-32 ml-28'
                    />

                    <div className='w-100 min-h-px my-5 bg-gray-400'></div>
                    <div className='flex justify-between'>
                      <Button
                        variant='text'
                        className='h-10 px-14 font-bold flex items-center gap-1.5 bg-gray-200 text-black'
                        onClick={() => {
                          // setCommunityAppearance('no');
                          // setCommunityAppearanceType('Community appearance');
                          setUploadedProfile(undefined);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='text'
                        className='h-10 px-16 font-bold flex items-center gap-1.5 bg-light-blue-900 text-white hover:bg-black'
                        onClick={() => {
                          addProfilePictureMutation.mutate(communityName ?? '');
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        )}
        {/* Bannerrrrrrrrrrrrrrrrrrrrrr Apearance */}
        {mode !== 'no' && mode !== 'closed' && type === 'Banner' && (
          <Card className='fixed z-20 left-20 bottom-0 ml-0 border shadow-2xl shadow-black p-5 w-96'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-between gap-2'>
                <Button
                  onClick={() => {
                    setCommunityAppearance('opened');
                    setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2  rounded-full rotate-90'
                >
                  <IoIosArrowDown size={15} />
                </Button>
                <Typography
                  variant='h6'
                  className='font-body font-bold -tracking-tight text-black'
                >
                  {communityAppearanceType}
                </Typography>
              </div>
              <div className='flex gap-3'>
                <Button
                  onClick={() => {
                    setCommunityAppearance('closed');
                    //   setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full rotate'
                >
                  <IoIosArrowDown size={15} />
                </Button>
                <Button
                  onClick={() => {
                    setCommunityAppearance('no');
                    setCommunityAppearanceType('Community appearance');
                  }}
                  variant='text'
                  className='p-2 bg-gray-300  rounded-full '
                >
                  <TfiClose size={15} />
                </Button>
              </div>
            </div>
            <div className='w-100 min-h-px my-5 bg-gray-400'></div>

            {bannerPicture ? (
              <div className='flex justify-center'>
                <Avatar
                  src={bannerPicture}
                  alt='banner picture'
                  variant='rounded'
                  className=' w-60 h-32'
                />
                <button
                  className='absolute w-10 h-10 bg-opacity-70 hover:bg-opacity-90 bg-gray-900 rounded-full text-white right-6 bottom-6'
                  onClick={() => {
                    deleteBannerPictureMutation.mutate(communityName ?? '');
                  }}
                  data-testid='banner-delete-button'
                >
                  <MdDeleteOutline className='w-full' />
                </button>
              </div>
            ) : (
              <>
                {!uploadedBanner && (
                  <div>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={bannerPictureHandleFileUpload}
                      className='hidden'
                      id='upload-button-banner'
                    />
                    <label
                      htmlFor='upload-button-banner'
                      className='flex flex-col items-center justify-center w-full h-56 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mb-4'
                      onDrop={bannerPictureHandleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <IoCloudUploadOutline className='m-50' size={30} />
                      <Typography className='text-gray-700 font-bold text-sm'>
                        Drag and drop or browse your device
                      </Typography>
                    </label>
                  </div>
                )}
                {uploadedBanner && (
                  <div>
                    <Avatar
                      src={uploadedBanner}
                      alt='banner image'
                      variant='rounded'
                      className='w-full h-32'
                    />

                    <div className='w-100 min-h-px my-5 bg-gray-400'></div>
                    <div className='flex justify-between'>
                      <Button
                        variant='text'
                        className='h-10 px-14 font-bold flex items-center gap-1.5 bg-gray-200 text-black'
                        onClick={() => {
                          // setCommunityAppearance('no');
                          // setCommunityAppearanceType('Community appearance');
                          setUploadedBanner(undefined);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='text'
                        className='h-10 px-16 font-bold flex items-center gap-1.5 bg-light-blue-900 text-white hover:bg-black'
                        onClick={() => {
                          addBannerPictureMutation.mutate(communityName ?? '');
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <ContentLayout>
        <LoadingProvider error={isError} isLoading={isLoading}>
          {community && (
            <>
              <ContentLayout.Main>
                <div className='relative'>
                  {bannerPicture && (
                    <Avatar
                      src={community.banner_picture}
                      alt='banner image'
                      variant='rounded'
                      className='w-full h-32'
                    />
                  )}
                  {!bannerPicture && (
                    <Avatar
                      src={
                        'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'
                      }
                      alt='banner image'
                      variant='rounded'
                      className='w-full h-32'
                    />
                  )}
                  {isModerator && (
                    <button
                      className='absolute z-10 w-10 h-10 top-10 right-3 bg-opacity-30 hover:bg-opacity-90 bg-gray-900 rounded-full text-white'
                      onClick={() => {
                        setCommunityAppearance('opened');
                        setCommunityAppearanceType('Banner');
                      }}
                      data-testid='banner-button'
                    >
                      <FaPen className='w-full' />
                    </button>
                  )}
                  {profilePicture && (
                    <Avatar
                      src={community.profile_picture}
                      alt='profile picture'
                      variant='circular'
                      className='absolute hover:z-0 z-10 w-24 h-24 top-20 left-3 border-4 border-white'
                    />
                  )}
                  {!profilePicture && (
                    <Avatar
                      src={
                        'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'
                      }
                      alt='profile picture'
                      variant='circular'
                      className='absolute hover:z-0 z-10 w-24 h-24 top-20 left-3 border-4 border-white'
                    />
                  )}
                  {isModerator && (
                    <button
                      className='absolute z-0 hover:z-10 w-24 h-24 top-20 left-3 bg-opacity-50 bg-gray-900 rounded-full text-white'
                      onClick={() => {
                        setCommunityAppearance('opened');
                        setCommunityAppearanceType('Avatar');
                      }}
                      data-testid='profile-picture-button'
                    >
                      <FaPen className='w-full text-xl' />
                    </button>
                  )}
                  <div className='flex justify-between items-center'>
                    <Typography
                      variant='h3'
                      className='text-black gap-10 ml-28 mt-4'
                    >
                      {communityNameWithPrefix}
                    </Typography>
                    {/* buttons above the RSB */}
                    <div className='mr-2 flex justify-end items-center gap-2'>
                      <Link to={`/${communityNameWithPrefix}/submit`}>
                        <Button
                          variant='text'
                          className='font-bold flex items-center gap-1.5 border border-black'
                        >
                          <PlusIcon className='w-6 h-6' />
                          Create a post
                        </Button>
                      </Link>
                      {!isJoined && !isModerator && (
                        <Button
                          variant='text'
                          className='h-10 font-bold flex items-center gap-1.5 border border-black bg-light-blue-900 text-white hover:bg-black'
                          onClick={() => {
                            setIsJoined(!isJoined);
                            joinMutation.mutate(communityName ?? '');
                          }}
                          data-testid='join-button'
                        >
                          Join
                        </Button>
                      )}
                      {isJoined && !isModerator && (
                        <Button
                          variant='text'
                          className='h-10 font-bold flex items-center gap-1.5 border border-black'
                          onClick={() => {
                            setIsJoined(!isJoined);
                            leaveMutation.mutate(communityName ?? '');
                          }}
                          data-testid='leave-button'
                        >
                          Joined
                        </Button>
                      )}
                      {isModerator && (
                        <Link to={`/${communityNameWithPrefix}/about/removed`}>
                          <Button
                            variant='text'
                            className='h-10 font-bold flex items-center gap-1.5 border border-black bg-light-blue-900 text-white hover:bg-black'
                          >
                            Mod Tools
                          </Button>
                        </Link>
                      )}
                      <Menu placement='bottom-end'>
                        <MenuHandler>
                          <Button
                            // onClick={(e) => {}}
                            variant='text'
                            className='p-2 z-10 border border-black'
                          >
                            <HiEllipsisHorizontal size={25} />
                          </Button>
                        </MenuHandler>
                        <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
                          {isFavorite && (
                            <MenuItem
                              onClick={handleFavoriteFlag}
                              className='p-4'
                            >
                              <span>Remove from favorites</span>
                            </MenuItem>
                          )}
                          {!isFavorite && (
                            <MenuItem
                              onClick={handleFavoriteFlag}
                              className='p-4'
                            >
                              <span>Add to favorites</span>
                            </MenuItem>
                          )}

                          {isMuted && (
                            <MenuItem
                              onClick={() => {
                                muteUnmuteMutation.mutate(communityName ?? '');
                              }}
                              className='p-4'
                            >
                              <span>Unmute {communityNameWithPrefix}</span>
                            </MenuItem>
                          )}
                          {!isMuted && (
                            <MenuItem
                              onClick={() => {
                                muteUnmuteMutation.mutate(communityName ?? '');
                              }}
                              className='p-4'
                            >
                              <span>Mute {communityNameWithPrefix}</span>
                            </MenuItem>
                          )}

                          {isJoined && (
                            <MenuItem
                              onClick={() => {
                                setIsJoined(!isJoined);
                                setIsModerator(!isModerator);
                                leaveMutation.mutate(communityName ?? '');
                              }}
                              className='p-4'
                            >
                              <span>Leave</span>
                            </MenuItem>
                          )}
                          {/* {!isJoined && community.moderator_flag && (
                            <MenuItem
                              onClick={() => {
                                setIsJoined(!isJoined);
                                joinMutation.mutate(communityName ?? '');
                              }}
                              className='p-4'
                            >
                              <span>Join</span>
                            </MenuItem>
                          )} */}
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                  <CommunityAppearnace
                    mode={communityAppearance}
                    type={communityAppearanceType}
                  />
                </div>

                <div className='flex justify-between'>
                  <ContentLayout.Main>
                    {communityPosts.map((post) => (
                      <div key={post._id} className='w-full pr-4'>
                        <PostPreview post={post} />
                      </div>
                    ))}
                  </ContentLayout.Main>
                  <ContentLayout.RightSideBar>
                    <CommunityRSB
                      name={communityName || ''}
                      communityPage={true}
                    />
                  </ContentLayout.RightSideBar>
                </div>
              </ContentLayout.Main>
            </>
          )}
        </LoadingProvider>
      </ContentLayout>
    </>
  );
};

export default Community;
