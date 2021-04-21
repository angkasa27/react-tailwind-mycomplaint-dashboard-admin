import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';
import CountCard from '../../components/elements/CountCard';
import { getUserProfile, getAllstatistic } from './action';
import moment from 'moment';
// import Table from '../../components/elements/Table';

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
      <div className="flex justify-between items-baseline">
        <p className="txt-h1 mx-5 md:mx-0">
          {'Selamat Datang' +
            (response.data && ', ' + response.data.name) +
            '!'}
        </p>
        <p className="md:block hidden font-semibold text-xl">
          {moment().locale('id').format('dddd, D MMMM YYYY')}
        </p>
      </div>
      <div className="mt-9 grid grid-cols-2 mx-5 md:mx-0 gap-5">
        <CountCard
          name={'di terima'}
          value={statistic.data && statistic.data.submitted}
          className=" sm:col-span-1 from-blue-400 to-indigo-500 "
        />
        <CountCard
          name={'di proses'}
          value={statistic.data && statistic.data.onProgress}
          className=" sm:col-span-1 from-purple-500 to-indigo-400 "
        />
        {/* <WindowTable /> */}
        <CountCard
          name={'ditanggapi'}
          value={statistic.data.responded}
          className=" sm:col-span-1 from-indigo-400 to-purple-500 "
        />
        <CountCard
          name={'selesai'}
          value={statistic.data.done}
          className=" sm:col-span-1 from-indigo-500 to-blue-400 "
        />
      </div>
    </Dashboard>
  );
}

// export function WindowTable() {
//   const renderStatus = (status) => {
//     switch (status) {
//       case 'submitted':
//         return (
//           <div className="flex">
//             <p className="animate-pulse text-xs text-white bg-blue-500 rounded-full  px-3 py-1">
//               laporan baru
//             </p>
//           </div>
//         );
//       case 'onProgress':
//         return (
//           <div className="flex">
//             <p className="text-xs text-white bg-indigo-500 rounded-full  px-3 py-1">
//               sedang ditinjau
//             </p>
//           </div>
//         );
//       case 'responded':
//         return (
//           <div className="flex">
//             <p className="text-xs text-white bg-indigo-500 rounded-full  px-3 py-1">
//               tanggapan terkirim
//             </p>
//           </div>
//         );
//       case 'done':
//         return (
//           <div className="flex">
//             <p className="text-xs text-white bg-purple-600 rounded-full  px-3 py-1">
//               selesai
//             </p>
//           </div>
//         );
//       case 'rejected':
//         return (
//           <div className="flex">
//             <p className="text-xs text-gray-400 bg-gray-100 rounded-full  px-3 py-1">
//               ditolak
//             </p>
//           </div>
//         );
//       default:
//         return (
//           <div className="flex">
//             <p className="text-xs text-gray-400 bg-gray-100 rounded-full  px-3 py-1">
//               dibatalkan
//             </p>
//           </div>
//         );
//     }
//   };

//   const renderDate = (date) => {
//     return moment(date).locale('id').format('D MMMM YYYY');
//   };

//   const column = [
//     {
//       heading: 'Subjek',
//       value: (v) => <p className="font-bold">{v.subject}</p>,
//     },
//     {
//       heading: 'pelapor',
//       value: (v) => v.userName,
//     },
//     {
//       heading: 'tgl pengaduan',
//       value: (v) => renderDate(v.createAt),
//     },
//     {
//       heading: 'status',
//       value: (v) => renderStatus(v.status),
//     },
//   ];

//   const DATA = [
//     {
//       subject: 'Jalan Rusak',
//       userName: 'Dimas Agkasa',
//       // createAt: '',
//       status: 'onProgress',
//     },
//     {
//       subject: 'Jalan Rusak',
//       userName: 'Dimas Agkasa',
//       // createAt: '',
//       status: 'onProgress',
//     },
//     {
//       subject: 'Jalan Rusak',
//       userName: 'Dimas Agkasa',
//       // createAt: '',
//       status: 'onProgress',
//     },
//     {
//       subject: 'Jalan Rusak',
//       userName: 'Dimas Agkasa',
//       // createAt: '',
//       status: 'onProgress',
//     },
//     {
//       subject: 'Jalan Rusak',
//       userName: 'Dimas Agkasa',
//       // createAt: '',
//       status: 'onProgress',
//     },
//   ];

//   return (
//     <div className="overflow-hidden rounded-xl p-3 shadow-md hover:shadow-xl transition duration-300 ease-out bg-gradient-to-br from-indigo-400 to-purple-500 sm:col-span-4 sm:row-span-2">
//       <div className="flex justify-beetwen">
//         <p className="font-bold text-white tracking-wide sm:text-2xl text-xl mb-2">
//           Laporan Masuk Baru
//         </p>
//         <p>lihat semua</p>
//       </div>

//       <div className="bg-white overflow-hidden rounded-lg">
//         <div className="overflow-x-auto w-full rounded-md border-gray-100 border">
//           <Table column={column} data={DATA} className="table w-full" />
//         </div>
//         {/* {DATA.map((i) => (
//           <div className="w-full border-b px-4 py-2">
//             <p className="font-bold text-indigo-500 text-xl"> {i.subject}</p>
//             <p className="">
//               dilaporkan oleh
//               <span className="font-bold">{' ' + i.userName}</span>
//             </p>
//           </div>
//         ))} */}
//       </div>
//     </div>
//   );
// }
