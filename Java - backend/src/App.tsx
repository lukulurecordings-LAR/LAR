import React from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
export function App() {
  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <Navbar />
      <main>
        <HomePage />
      </main>
    </div>);

}