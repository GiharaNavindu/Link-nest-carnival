import React from 'react';
import { useCategories } from '@/features/notes/hooks/useNoteFormData';
import { Button } from '@/components/ui/button';

interface CategoryListProps {
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, selectedCategory }) => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return <div className="p-2 text-sm">Loading categories...</div>;
  }

  if (isError) {
    return <div className="p-2 text-sm text-red-500">Error loading categories.</div>;
  }

  return (
    <div className="space-y-2">
      <Button
        variant={selectedCategory === null ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => onSelectCategory(null)}
      >
        All Notes
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;
