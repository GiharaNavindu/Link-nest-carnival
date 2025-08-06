import { useQuery } from '@tanstack/react-query';
import { getCategories, getTags } from '../api/notes';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
};
