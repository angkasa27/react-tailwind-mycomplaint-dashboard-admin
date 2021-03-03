import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import ModalEditPengguna from '../../components/fragments/ModalEditPengguna';
import moment from 'moment';

export default function Pengguna() {
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
      heading: 'Nomor Telepon',
      value: (v) => v.phone,
    },
    {
      heading: 'NIK',
      value: (v) => v.nik,
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
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
      createAt: '12/12/2020',
    },
    {
      name: 'Bambang Pamungkas',
      username: 'bambang1212',
      phone: '081122334455',
      nik: 8273847561727374,
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Pengguna
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
