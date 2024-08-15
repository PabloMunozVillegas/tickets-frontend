import React from 'react';

const Inicio = () => {
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Lista Tiket</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded py-1 px-2"
          />
          <button className="ml-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M18.75 10.5a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
              />
            </svg>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center"
          >
            {/* Aquí puedes agregar el contenido de cada tarjeta */}
          </div>
        ))}
      </div>
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.75v14.5M4.75 12h14.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Inicio;
