import React from 'react';
import Dashboard from '../../components/Dashboard';
import CountCard from '../../components/elements/CountCard';

export default function Home() {
  return (
    <Dashboard>
      <p className="txt-h1 mx-5 md:mx-0">Selamat Datang, Dimas!</p>
      <div className="mt-9 grid grid-cols-2 mx-5 md:mx-0 gap-5">
        <CountCard
          name={'di terima'}
          value={10}
          className=" sm:col-span-1 from-blue-400 to-indigo-500 hover:to-blue-400"
        />
        <CountCard
          name={'di proses'}
          value={23}
          className=" sm:col-span-1 from-purple-500 to-indigo-400 hover:to-purple-500"
        />
        <CountCard
          name={'ditanggapi'}
          value={2}
          className=" sm:col-span-1 from-indigo-400 to-purple-500 hover:to-indigo-400"
        />
        <CountCard
          name={'selesai'}
          value={54}
          className=" sm:col-span-1 from-indigo-500 to-blue-400 hover:to-indigo-500"
        />
      </div>
    </Dashboard>
  );
}
