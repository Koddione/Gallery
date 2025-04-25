import { SEARCH_PARAMS } from '@constants/searchParams';
import { SORT_OPTIONS, SortOption } from '@constants/sortOptions';
import { useSearchParams } from 'react-router-dom';

export const useSearchParamsHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get(SEARCH_PARAMS.CATERGORY) || '';
  const page = parseInt(searchParams.get(SEARCH_PARAMS.PAGE) || '1');
  const sortParamRaw = searchParams.get(SEARCH_PARAMS.SORT);
  const sort: SortOption =
    sortParamRaw === SORT_OPTIONS.LATEST ? SORT_OPTIONS.LATEST : SORT_OPTIONS.DEFAULT;
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
