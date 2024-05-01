import { useSearchParams } from 'react-router-dom';
import ContentLayout from '../Components/ContentLayout';
import LoadingProvider from '../Components/LoadingProvider';
import { useQuery } from 'react-query';
import axios from 'axios';
import { PostType } from '../types/types';
import PostOverview from '../Components/Search/PostOverview';
import SearchTypes from '../Components/Search/SearchTypes';

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const type = searchParams.get('type');

  const controller = new AbortController();

  //   const [post, setPost] = useState<PostType | undefined>();
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ['search results', q, type],
    queryFn: () =>
      axios.get(`search/?q=${q}&type=${type}`, {
        signal: controller.signal,
      }),
    onSuccess: (data) => {
      return data;
    },
  });

  // community name
  // username
  // page: home, post, community, profile

  return (
    <>
      <ContentLayout>
        <LoadingProvider error={isError} isLoading={isLoading}>
          <>
            <ContentLayout.Main>
              <SearchTypes />
              {/* Sorting */}
              {data &&
                data.map((post) => <PostOverview key={post._id} post={post} />)}
            </ContentLayout.Main>
            <ContentLayout.RightSideBar>
              {' '}
              {/* if type=link:  */}
            </ContentLayout.RightSideBar>
          </>
        </LoadingProvider>
      </ContentLayout>
    </>
  );
};

export default Search;
