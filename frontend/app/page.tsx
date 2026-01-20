import Navbar from './components/Navbar';
import TodoAppClient from './components/TodoAppClient';
import './globals.css';

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-5 px-2">

        <div className="max-w-6xl mx-auto p-4">
          <TodoAppClient />
        </div>
      </div>
    </>
  );
}