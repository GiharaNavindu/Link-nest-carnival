import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MultiSelect from '@/components/ui/multi-select'; // Assuming you have a multi-select component
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCategories, useTags } from '../hooks/useNoteFormData';
import { Note, Category, Tag } from '@/types';

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Note; // Optional: for editing existing notes
  onSubmit: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialData?.category.id);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags.map(tag => tag.id) || []);
  const [notionUrl, setNotionUrl] = useState(initialData?.notionUrl || '');

  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: tags, isLoading: isLoadingTags } = useTags();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setSelectedCategory(initialData.category.id);
      setSelectedTags(initialData.tags.map(tag => tag.id));
      setNotionUrl(initialData.notionUrl || '');
    } else {
      setTitle('');
      setContent('');
      setSelectedCategory(undefined);
      setSelectedTags([]);
      setNotionUrl('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title || !content || !selectedCategory) {
      alert('Please fill in title, content, and category.');
      return;
    }

    const category = categories?.find(cat => cat.id === selectedCategory);
    const noteTags = tags?.filter(tag => selectedTags.includes(tag.id));

    if (!category || !noteTags) {
      alert('Invalid category or tags selected.');
      return;
    }

    onSubmit({
      title,
      content,
      category,
      tags: noteTags,
      notionUrl: notionUrl || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Note' : 'Create Note'}</DialogTitle>
          <DialogDescription>
            Fill in the details for your note.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Content
            </Label>
            <div className="col-span-3 grid grid-cols-2 gap-4">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Write your note in Markdown..."
              />
              <div className="border rounded-md p-2 min-h-[200px] overflow-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingCategories ? (
                  <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                ) : (
                  categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            {isLoadingTags ? (
              <div className="col-span-3">Loading tags...</div>
            ) : (
              <MultiSelect
                options={tags?.map(tag => ({ label: tag.name, value: tag.id })) || []}
                selected={selectedTags}
                onSelectedChange={setSelectedTags}
                placeholder="Select tags..."
                className="col-span-3"
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notionUrl" className="text-right">
              Notion URL
            </Label>
            <Input
              id="notionUrl"
              value={notionUrl}
              onChange={(e) => setNotionUrl(e.target.value)}
              className="col-span-3"
              placeholder="Optional Notion URL"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteFormModal;
