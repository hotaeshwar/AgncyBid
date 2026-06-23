import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-center flex flex-col items-center justify-center text-[#012869]">
      <h1 className="font-serif text-8xl md:text-9xl font-black text-[#fe8d00] mb-4">
        404
      </h1>
      <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#012869] mb-4">
        Page Not Found
      </h2>
      <p className="text-lg max-w-md mx-auto text-[#012869]/80 font-medium mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-serif font-bold text-white bg-[#fe8d00] hover:bg-[#d47200] px-8 py-3 rounded-full shadow-lg shadow-[#fe8d00]/30 transition-all duration-300 hover:-translate-y-0.5"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
