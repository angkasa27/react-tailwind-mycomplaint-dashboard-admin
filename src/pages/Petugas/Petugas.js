import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import moment from 'moment';
import { getRole } from '../../utils/storage';
import { useHistory, useLocation } from 'react-router-dom';
import { getAll, addNew, updateOperator, deleteOne } from './action';
import queryString from 'querystring';
import ModalConfirm from '../../components/fragments/ModalConfirm';
import ModalFormPetugas from '../../components/fragments/ModalFormPetugas';

export default function Petugas() {
  const history = useHistory();
  const location = useLocation();
  const { page = 1, id, add } = queryString.parse(
    location.search.replace('?', '')
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [hapus, openHapus] = useState(false);
  const [detail, setDetail] = useState({});
  const [formPetugas, openFormPetugas] = useState(false);

  //Mencegah Petugas masuk kenhalaman petugas
  if (getRole() !== 'admin') history.push('/');

  const renderDate = (date) => {
    return moment(date).locale('id').format('D MMMM YYYY');
  };

  const renderAction = (operatorId) => {
    return (
      <div className="flex">
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: operatorId,
              }),
            });
            openFormPetugas(true);
          }}
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
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: operatorId,
              }),
            });
            openHapus(true);
          }}
          className="ml-1 w-6 h-6 btn-icon text-white bg-red-600 transition duration-100 ease-out hover:bg-red-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
      </div>
    );
  };

  const column = [
    {
      heading: 'Nama',
      value: (v) => v.nama_petugas,
    },
    {
      heading: 'Username',
      value: (v) => v.Username,
    },
    {
      heading: 'tgl bergabung',
      value: (v) => renderDate(v.telp),
    },
    {
      heading: '',
      value: (v) => renderAction(v.order),
    },
  ];

  const closeModal = () => {
    openHapus(false);
    openFormPetugas(false);
    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  useEffect(() => {
    getAll(page, setData);
  }, [page, loading]);

  useEffect(() => {
    if (id) {
      const v = data.data;
      if (v) setDetail(v[id]);
    }
  }, [id, loading]);

  const handleDelete = () => {
    deleteOne(detail.id_petugas, setLoading);
    closeModal();
  };

  const handleSubmit = (v) => {
    if (add) addNew(v, setLoading);
    else if (detail.id_petugas)
      updateOperator(detail.id_petugas, v, setLoading);
    closeModal();
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
        <div className="flex justify-between mb-4">
          <button
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  add: true,
                }),
              });
              openFormPetugas(true);
            }}
            className="btn-main w-56 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 mr-1"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Tambah Petugas Baru
          </button>
          <div className="flex w-14 justify-between">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <div className="w-4 h-4 bg-indigo-500 rounded-full" />
            <div className="w-4 h-4 bg-purple-500 rounded-full" />
          </div>
        </div>

        <div className="overflow-x-auto w-full rounded-md border-gray-100 border">
          <Table column={column} data={data.data} className="table w-full" />
        </div>
      </div>
      <ModalConfirm
        open={hapus}
        onClose={closeModal}
        handleAction={() => handleDelete()}
        name="Hapus akun"
        description="Apakah anda ingin MENGHAPUS akun ini? (tidak dapat dikembalikan)"
        buttonText="Hapus"
      />

      <ModalFormPetugas
        open={formPetugas}
        onClose={closeModal}
        data={detail}
        handleAction={(v) => handleSubmit(v)}
      />
    </Dashboard>
  );
}
