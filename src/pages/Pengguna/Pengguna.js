import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import ModalEditPengguna from '../../components/fragments/ModalEditPengguna';
import ModalConfirm from '../../components/fragments/ModalConfirm';
import moment from 'moment';
import { getAll, editUser, deleteOne } from './action';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import Pagination from '../../components/elements/Pagination';
import { getRole } from '../../utils/storage';

export default function Pengguna() {
  const history = useHistory();
  const location = useLocation();
  const [terima, openTerima] = useState(false);
  const [detail, setDetail] = useState({});
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const { page = 1, id } = queryString.parse(location.search.replace('?', ''));
  const [hapus, openHapus] = useState(false);

  // useEffect(() => {
  //   if (response.message === 'token tidak valid') history.push('/login');
  // }, [response]);

  const renderDate = (date) => {
    return moment(date).locale('id').format('D MMMM YYYY');
  };

  const renderAction = (userId) => {
    return (
      <div className="flex">
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: userId,
              }),
            });
            openTerima(true);
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
        {getRole() === 'admin' && (
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: userId,
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
        )}
      </div>
    );
  };

  const column = [
    {
      heading: 'Nama',
      value: (v) => v.nama,
    },
    {
      heading: 'Username',
      value: (v) => v.username,
    },
    {
      heading: 'Nomor Telepon',
      value: (v) => v.telp,
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
      value: (v) => renderAction(v.order),
    },
  ];

  const closeModal = () => {
    openTerima(false);
    openHapus(false);
    setDetail({});
    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  useEffect(() => {
    getAll(page, setResponse);
  }, [page, loading]);

  useEffect(() => {
    if (id) {
      const data = response.data;
      if (data) setDetail(data[id]);
    }
  }, [id, loading]);

  const handleEdit = (v) => {
    editUser(v.nik, v, setLoading);
    closeModal();
  };

  const handleDelete = () => {
    deleteOne(detail.nik, setLoading);
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Pengguna
      </p>
      <div className="card bg-white mt-9">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button className="btn-main w-32 items-center justify-center hidden mr-4 sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 mr-1"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>

              {'Total : ' + (response.meta ? response.meta.totalData : 0)}
            </button>
            <button className="btn-outline w-52 items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 mr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clip-rule="evenodd"
                />
              </svg>
              Download dokumen
            </button>
          </div>
          <div className="flex w-14 justify-between">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <div className="w-4 h-4 bg-indigo-500 rounded-full" />
            <div className="w-4 h-4 bg-purple-500 rounded-full" />
          </div>
        </div>
        <div className="overflow-x-auto w-full rounded-md border-gray-100 border">
          <Table
            column={column}
            data={response.data}
            className="table w-full"
          />
        </div>
        {response.meta && response.meta.totalData === 0 && (
          <div className="flex justify-center mt-4">
            <p className="">Data Kosong</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Pagination location={location.pathname} meta={response.meta} />
        </div>
      </div>
      <ModalEditPengguna
        open={terima}
        onClose={closeModal}
        data={detail}
        handleAction={(v) => handleEdit(v)}
      />

      {getRole() === 'admin' && (
        <ModalConfirm
          open={hapus}
          onClose={closeModal}
          handleAction={() => handleDelete()}
          name="Hapus akun"
          description="Apakah anda ingin MENGHAPUS akun ini? (tidak dapat dikembalikan)"
          buttonText="Hapus"
        />
      )}
    </Dashboard>
  );
}
