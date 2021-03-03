import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import ModalDetail from '../../components/fragments/ModalDetail';
import ModalTanggapan from '../../components/fragments/ModalTanggapan';
import ModalConfirm from '../../components/fragments/ModalConfirm';
import moment from 'moment';

export default function Pengaduan() {
  const [detail, openDetail] = useState(false);
  const [tanggapan, openTanggapan] = useState(false);
  const [hapus, openHapus] = useState(false);
  const [terima, openTerima] = useState(false);

  const renderDetail = (detail) => {
    if (detail)
      return (
        <span onClick={() => openDetail(true)} className="text-active">
          lihat detail
        </span>
      );
    else return <p className="text-gray-400">laporan dibatalkan</p>;
  };

  const renderResponse = (response) => {
    if (response)
      return (
        <p onClick={() => openTanggapan(true)} className="text-active">
          lihat tanggapan
        </p>
      );
    else return <p className="text-gray-400">belum ada tanggapan</p>;
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'submitted':
        return (
          <div className="flex">
            <p className="animate-pulse text-xs text-white bg-blue-500 rounded-full  px-3 py-1">
              laporan baru
            </p>
          </div>
        );
      case 'onProgress':
        return (
          <div className="flex">
            <p className="text-xs text-white bg-indigo-500 rounded-full  px-3 py-1">
              sedang ditinjau
            </p>
          </div>
        );
      case 'responded':
        return (
          <div className="flex">
            <p className="text-xs text-white bg-indigo-500 rounded-full  px-3 py-1">
              tanggapan terkirim
            </p>
          </div>
        );
      case 'done':
        return (
          <div className="flex">
            <p className="text-xs text-white bg-purple-600 rounded-full  px-3 py-1">
              selesai
            </p>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex">
            <p className="text-xs text-gray-400 bg-gray-100 rounded-full  px-3 py-1">
              ditolak
            </p>
          </div>
        );
      default:
        return (
          <div className="flex">
            <p className="text-xs text-gray-400 bg-gray-100 rounded-full  px-3 py-1">
              dibatalkan
            </p>
          </div>
        );
    }
  };

  const renderDate = (date) => {
    return moment(date).locale('id').format('LL');
  };

  const renderAction = (status) => {
    if (status === 'submitted' || status === 'onProgress')
      return (
        <div className="flex">
          {status === 'submitted' && (
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
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          )}
          {status === 'onProgress' && (
            <span className="mr-1 bg-indigo-500 transition duration-100 ease-out hover:bg-indigo-700 text-white w-6 h-6 btn-icon  cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          )}
          <span
            onClick={() => openHapus(true)}
            className=" w-6 h-6 btn-icon text-white bg-purple-500 transition duration-100 ease-out hover:bg-purple-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      );
    else
      return (
        <div className="flex">
          <span
            onClick={() => openHapus(true)}
            className=" w-6 h-6 btn-icon text-gray-400 bg-gray-100  cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      );
  };

  const column = [
    {
      heading: 'Subjek',
      value: (v) => v.subject,
    },
    {
      heading: 'pelapor',
      value: (v) => v.userName,
    },
    {
      heading: 'detail laporan',
      value: (v) => renderDetail(v.detail),
    },
    {
      heading: 'tgl pengaduan',
      value: (v) => renderDate(v.createAt),
    },
    {
      heading: 'status',
      value: (v) => renderStatus(v.status),
    },

    {
      heading: 'tanggapan',
      value: (v) => renderResponse(v.response),
    },
    {
      heading: 'petugas',
      value: (v) => v.operatorName,
    },
    {
      heading: '',
      value: (v) => renderAction(v.status),
    },
  ];

  const data = [
    {
      subject: 'Pelyananan Kurang Memuaskan',
      userName: 'Bambang Pamungkas',
      detail: true,
      response: false,
      operatorName: 'Adinda Fara Putri',
      createAt: '12/12/2020',
      status: 'submitted',
    },
    {
      subject: 'Jalan Rusak',
      userName: 'Naufal Ahmad Firdaus',
      detail: true,
      response: false,
      operatorName: 'Adinda Fara Putri',
      createAt: '12/01/2020',
      status: 'onProgress',
    },
    {
      subject: 'Jalan Rusak',
      userName: 'Samid Angkasa Nurindra',
      detail: true,
      response: true,
      operatorName: 'Adinda Fara Putri',
      createAt: '02/12/2021',
      status: 'responded',
    },
    {
      subject: 'Jalan Rusak',
      userName: 'Sultan Latfhul',
      detail: true,
      response: true,
      operatorName: 'Adinda Fara Putri',
      createAt: '01/20/2021',
      status: 'done',
    },
    {
      subject: 'Jalan Rusak',
      userName: 'Nanda Putra Wangsa Wardani',
      detail: true,
      response: true,
      operatorName: 'Adinda Fara Putri',
      createAt: '12/20/2020',
      status: 'rejected',
    },
    {
      subject: 'Jalan Rusak',
      userName: 'Bayu Aji',
      detail: false,
      response: false,
      operatorName: 'Adinda Fara Putri',
      createAt: '11/27/2020',
      status: 'canceled',
    },
  ];

  const closeModal = () => {
    openDetail(false);
    openTanggapan(false);
    openHapus(false);
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Pengaduan
      </p>
      <div className="card bg-white mt-9">
        <div className="overflow-x-auto w-full rounded-md border-gray-100 border">
          <Table column={column} data={data} className="table w-full" />
        </div>
      </div>
      <ModalDetail open={detail} onClose={closeModal} data={data[0]} />
      <ModalTanggapan open={tanggapan} onClose={closeModal} data={data[0]} />
      <ModalConfirm
        open={hapus}
        onClose={closeModal}
        name="Tolak laporan"
        description="Apakah anda ingin menghapus laporan ini?"
        buttonText="Tolak"
      />
      <ModalConfirm
        open={terima}
        onClose={closeModal}
        name="Terima laporan"
        description="Apakah anda memproses laporan ini?"
        buttonText="Proses"
      />
    </Dashboard>
  );
}
