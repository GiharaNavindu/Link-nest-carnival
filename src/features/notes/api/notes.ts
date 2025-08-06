import { Note, Category, Tag } from '@/types';

// Simulated data
const categories: Category[] = [
  { id: '1', name: 'DevOps' },
  { id: '2', name: 'Cloud' },
  { id: '3', name: 'Frontend' },
  { id: '4', name: 'Backend' },
];

const tags: Tag[] = [
  { id: '1', name: 'react' },
  { id: '2', name: 'typescript' },
  { id: '3', name: 'aws' },
  { id: '4', name: 'docker' },
];

let notes: Note[] = [
  {
    id: '1',
    title: 'My First Note',
    content: 'This is the **content** of my first note.',
    category: categories[0],
    tags: [tags[0], tags[1]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Another Note',
    content: 'This is another note about *something interesting*.',
    category: categories[1],
    tags: [tags[2]],
    notionUrl: 'https://www.notion.so/another-note',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getNotes = async (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(notes), 500);
  });
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(notes.find((note) => note.id === id)), 500);
  });
};

export const createNote = async (newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  return new Promise((resolve) => {
    const note: Note = {
      id: String(notes.length + 1),
      ...newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(note);
    setTimeout(() => resolve(note), 500);
  });
};

export const updateNote = async (updatedNote: Note): Promise<Note> => {
  return new Promise((resolve, reject) => {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index > -1) {
      notes[index] = { ...updatedNote, updatedAt: new Date().toISOString() };
      setTimeout(() => resolve(notes[index]), 500);
    } else {
      reject(new Error('Note not found'));
    }
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== id);
    if (notes.length < initialLength) {
      setTimeout(() => resolve(), 500);
    } else {
      reject(new Error('Note not found'));
    }
  });
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 500);
  });
};

export const getTags = async (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tags), 500);
  });
};
