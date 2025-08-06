import React, { useState } from 'react';
import NoteList from '../features/notes/components/NoteList';
import NoteFormModal from '../features/notes/components/NoteFormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateNote, useUpdateNote, useDeleteNote, useNotes } from '../features/notes/hooks/useNotes';
import { Note } from '@/types';
import CategoryList from '../features/domain/components/CategoryList';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: notes } = useNotes();
  const { mutate: createNote } = useCreateNote();
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();

  const handleCreateNote = (newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    createNote(newNote);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    updateNote(updatedNote);
  };

  const handleEditNote = (noteId: string) => {
    const noteToEdit = notes?.find(note => note.id === noteId);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(undefined); // Clear editing note when modal closes
  };

  const filteredNotes = notes?.filter(note => {
    const matchesCategory = selectedCategory === null || note.category.id === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <CategoryList onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to LinkNest Notes!</h1>
        <p>Your personal note-taking application.</p>
        <div className="flex items-center gap-4 mt-4 mb-8">
          <Button onClick={() => {
            setEditingNote(undefined);
            setIsModalOpen(true);
          }}>Create New Note</Button>
          <Input
            type="text"
            placeholder="Search notes by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="mt-8">
          <NoteList 
            notes={filteredNotes} 
            onEditNote={handleEditNote} 
            onDeleteNote={handleDeleteNote} 
          />
        </div>
        <NoteFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={editingNote}
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
        />
      </main>
    </div>
  );
};

export default Home;
