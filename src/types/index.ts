export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  category: Category;
  tags: Tag[];
  notionUrl?: string; // Optional Notion URL
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}
