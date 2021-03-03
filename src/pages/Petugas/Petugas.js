import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import ModalEditPengguna from '../../components/fragments/ModalEditPengguna';
import moment from 'moment';

export default function Petugas() {
  const [terima, openTerima] = useState(false);

  const renderDate = (date) => {
    return moment(date).locale('id').format('LL');
  };

  const renderAction = () => {
    return (
      <div className="flex">
        <span
          onClick={() => openTerima(true)}
          className="mr-1 bg-blue-500 transition duration-100 ease-out hover:bg-blue-700 text-white w-6 h-6 btn-icon  cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
    );
  };

  const column = [
    {
      heading: 'Nama',
      value: (v) => v.name,
    },
    {
      heading: 'Username',
      value: (v) => v.username,
    },
    {
      heading: 'tgl bergabung',
      value: (v) => renderDate(v.createAt),
    },
    {
      heading: '',
      value: () => renderAction(),
    },
  ];

  const data = [
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      createAt: '12/12/2020',
    },
  ];

  const closeModal = () => {
    openTerima(false);
  };

  return (
    <Dashboard>
      <p className="txt-h1 mx-5 md:mx-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 md:w-8 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Petugas
      </p>
      <div className="card bg-white mt-9">
        <div className="overflow-x-auto w-full rounded-md border-gray-100 border">
          <Table column={column} data={data} className="table w-full" />
        </div>
      </div>
      <ModalEditPengguna
        open={terima}
        onClose={closeModal}
        name="Terima laporan"
        description="Apakah anda memproses laporan ini?"
      />
    </Dashboard>
  );
}
