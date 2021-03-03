import React from 'react';
import Navbar from '../../components/elements/Navbar';

export default function dashboard({ children }) {
  return (
    <div className="grid grid-cols-6 font-nunito overflow-hidden ">
      <Navbar className="w-full md:col-span-1 col-span-6 " />
      <main className="w-full md:col-span-5 col-span-6 md:px-5 py-5 md:pt-10 z-10">
        {children}
      </main>
    </div>
  );
}
