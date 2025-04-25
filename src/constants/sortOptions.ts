export const SORT_OPTIONS = {
  DEFAULT: 'relevant',
  LATEST: 'latest',
  OLDEST: 'oldest',
  POPULAR: 'popular',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
export type CategorySortOption = typeof SORT_OPTIONS.DEFAULT | typeof SORT_OPTIONS.LATEST;
export type GeneralSortOption =
  | typeof SORT_OPTIONS.LATEST
  | typeof SORT_OPTIONS.OLDEST
  | typeof SORT_OPTIONS.POPULAR;

export const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'relevant', value: SORT_OPTIONS.DEFAULT },
  { label: 'Latest', value: SORT_OPTIONS.LATEST },
];
