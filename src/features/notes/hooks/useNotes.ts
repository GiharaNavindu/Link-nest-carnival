import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes';
import { Note } from '@/types';

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedNote: Note) => updateNote(updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};