import TodoAppClient from './components/TodoAppClient';
import './globals.css'; // optional if you already import in layout

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-4">
        {/* <header className="mb-6">
          <h1 className="text-2xl font-bold">To-Do App</h1>
        </header> */}

        <TodoAppClient /> {/* client component */}
      </div>
    </div>
  );
}