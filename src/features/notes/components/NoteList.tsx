import React from 'react';
import { Button } from '@/components/ui/button';
import { Note } from '@/types';

interface NoteListProps {
  notes: Note[] | undefined;
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEditNote, onDeleteNote }) => {
  if (!notes) {
    return <div className="text-center">Loading notes...</div>;
  }

  return (
    <div className="note-list">
      <h2 className="text-xl font-semibold mb-4">All Notes</h2>
      {/* Search and filter controls will go here */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded-md">
            <h3 className="text-lg font-medium">{note.title}</h3>
            <p className="text-sm text-gray-500">
              Category: {note.category.name} |
              Tags: {note.tags.map((tag) => tag.name).join(', ')}
            </p>
            <p className="mt-2">{note.content.substring(0, 100)}...</p>
            {note.notionUrl && (
              <a href={note.notionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm mt-1 block">
                View on Notion
              </a>
            )}
            <div className="mt-4 space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEditNote(note.id)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => onDeleteNote(note.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-center text-gray-500">No notes found. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
