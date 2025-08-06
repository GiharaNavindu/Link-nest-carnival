import React from 'react';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {/* Category Navigation will go here (moved to Home.tsx) */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default App;
