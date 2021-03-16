import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';
import CountCard from '../../components/elements/CountCard';
import { getUserProfile, getAllstatistic } from './action';

export default function Home() {
  const [response, setResponse] = useState({ data: {} });
  const [statistic, setStatistic] = useState({
    data: { submitted: 0, onProgress: 0, responded: 0, done: 0 },
  });

  useEffect(() => {
    getUserProfile(setResponse);
    getAllstatistic(setStatistic);
  }, []);

  return (
    <Dashboard>
      <p className="txt-h1 mx-5 md:mx-0">
        {'Selamat Datang' +
          (response.data ? ', ' + response.data.name : '') +
          '!'}
      </p>
      <div className="mt-9 grid grid-cols-2 mx-5 md:mx-0 gap-5">
        <CountCard
          name={'di terima'}
          value={statistic.data.submitted}
          className=" sm:col-span-1 from-blue-400 to-indigo-500 hover:to-blue-400"
        />
        <CountCard
          name={'di proses'}
          value={statistic.data.onProgress}
          className=" sm:col-span-1 from-purple-500 to-indigo-400 hover:to-purple-500"
        />
        <CountCard
          name={'ditanggapi'}
          value={statistic.data.responded}
          className=" sm:col-span-1 from-indigo-400 to-purple-500 hover:to-indigo-400"
        />
        <CountCard
          name={'selesai'}
          value={statistic.data.done}
          className=" sm:col-span-1 from-indigo-500 to-blue-400 hover:to-indigo-500"
        />
      </div>
    </Dashboard>
  );
}
