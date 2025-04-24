import { SEARCH_PARAMS } from '@constants/searchParams';
import { useSearchParams } from 'react-router-dom';

export const useSearchParamsHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get(SEARCH_PARAMS.CATERGORY) || '';
  const page = parseInt(searchParams.get(SEARCH_PARAMS.PAGE) || '1');
  const sortParamRaw = searchParams.get(SEARCH_PARAMS.SORT);
  const sort: 'relevant' | 'latest' = sortParamRaw === 'latest' ? 'latest' : 'relevant';
  const search = searchParams.get(SEARCH_PARAMS.SEARCH) || '';

  const handleSortChange = (newSort: string) => {
    setSearchParams({ category, page: '1', sort: newSort });
  };

  const handlePageChange = (newPage: number, totalPages: number) => {
    if (newPage <= totalPages && newPage >= 1) {
      setSearchParams({ category, page: newPage.toString() });
    }
  };

  return {
    category,
    page,
    sort,
    search,
    handleSortChange,
    handlePageChange,
  };
};
