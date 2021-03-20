import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import Table from '../../components/elements/Table';
import ModalDetail from '../../components/fragments/ModalDetail';
import ModalTanggapan from '../../components/fragments/ModalTanggapan';
import ModalAddTanggapan from '../../components/fragments/ModalAddTanggapan';
import ModalConfirm from '../../components/fragments/ModalConfirm';
import moment from 'moment';
import {
  getAll,
  getDetail,
  updateStatus,
  getDokumen,
  sendTanggapan,
  deleteOne,
} from './action';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import Pagination from '../../components/elements/Pagination';
import { getRole } from '../../utils/storage';
// import { Document, Page } from 'react-pdf';

export default function Pengaduan() {
  const history = useHistory();
  const location = useLocation();
  const [detail, openDetail] = useState(false);
  const [tanggapan, openTanggapan] = useState(false);
  const [addTanggapan, openAddTanggapan] = useState(false);
  const [tolak, openTolak] = useState(false);
  const [hapus, openHapus] = useState(false);
  const [terima, openTerima] = useState(false);
  const [data, setData] = useState({});
  const [dataDetail, setDataDetail] = useState({});
  const [dokumen, setDokumen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { page = 1, id } = queryString.parse(location.search.replace('?', ''));

  const renderDetail = (detail, pengaduanId) => {
    if (detail)
      return (
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: pengaduanId,
              }),
            });
            openDetail(true);
          }}
          className="text-active"
        >
          lihat detail
        </span>
      );
    else return <p className="text-gray-400">laporan dibatalkan</p>;
  };

  const renderResponse = (response, pengaduanId) => {
    if (response)
      return (
        <p
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: pengaduanId,
              }),
            });
            openTanggapan(true);
          }}
          className="text-active"
        >
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
    return moment(date).locale('id').format('D MMMM YYYY');
  };

  const renderAction = (status, pengaduanId) => {
    // if (status === 'submitted' || status === 'onProgress')
    return (
      <div className="flex">
        {status === 'submitted' || status === 'onProgress' ? (
          <>
            {status === 'submitted' && (
              <span
                onClick={() => {
                  history.push({
                    search: queryString.stringify({
                      page,
                      id: pengaduanId,
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
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            )}
            {status === 'onProgress' && (
              <span
                onClick={() => {
                  history.push({
                    search: queryString.stringify({
                      page,
                      id: pengaduanId,
                    }),
                  });
                  openAddTanggapan(true);
                }}
                className="mr-1 bg-indigo-500 transition duration-100 ease-out hover:bg-indigo-700 text-white w-6 h-6 btn-icon  cursor-pointer"
              >
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
              onClick={() => {
                history.push({
                  search: queryString.stringify({
                    page,
                    id: pengaduanId,
                  }),
                });
                openTolak(true);
              }}
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
          </>
        ) : (
          <span className="ml-7 w-6 h-6 btn-icon text-gray-400 bg-gray-100">
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
        )}
        {getRole() === 'admin' && (
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: pengaduanId,
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
      heading: 'Subjek',
      value: (v) => v.subject,
    },
    {
      heading: 'pelapor',
      value: (v) => v.userName,
    },
    {
      heading: 'detail laporan',
      value: (v) => renderDetail(v.detail, v.pengaduanId),
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
      value: (v) => renderResponse(v.response, v.pengaduanId),
    },
    {
      heading: 'petugas',
      value: (v) => v.operatorName,
    },
    {
      heading: '',
      value: (v) => renderAction(v.status, v.pengaduanId),
    },
  ];

  const closeModal = () => {
    openDetail(false);
    openTanggapan(false);
    openTolak(false);
    openTerima(false);
    openAddTanggapan(false);
    openHapus(false);

    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  const handleUpdateStatus = (status) => {
    updateStatus(id, { status }, setLoading);
    closeModal();
  };

  const handleDownloadDokumen = () => {
    getDokumen(setDokumen);
  };

  useEffect(() => {
    getAll(page, setData);
  }, [page, loading]);

  useEffect(() => {
    if (id) getDetail(id, setDataDetail);
  }, [id, loading]);

  const submitTanggapan = (v) => {
    sendTanggapan(id, v, setLoading);
    closeModal();
  };

  const handleDelete = () => {
    deleteOne(id, setLoading);
    closeModal();
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(dokumen);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button className="btn-main w-32 hidden md:flex items-center justify-center mr-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 mr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
              {'Total : ' + (data.meta ? data.meta.totalData : 0)}
            </button>

            <button
              onClick={() => handleDownloadDokumen()}
              className="btn-outline w-52 items-center justify-center flex"
            >
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
          <Table column={column} data={data.data} className="table w-full" />
        </div>
        {data.meta && data.meta.totalData === 0 && (
          <div className="flex justify-center mt-4">
            <p className="">Data Kosong</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Pagination location={location.pathname} meta={data.meta} />
        </div>
      </div>
{/* 
      <div>
        <Document file={dokumen} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div> */}

      <ModalDetail
        open={detail}
        onClose={closeModal}
        data={dataDetail.data}
        handleAction={() => handleUpdateStatus('onProgress')}
      />
      <ModalTanggapan
        open={tanggapan}
        onClose={closeModal}
        data={dataDetail.data}
      />
      <ModalAddTanggapan
        open={addTanggapan}
        onClose={closeModal}
        handleAction={(v) => submitTanggapan(v)}
      />

      <ModalConfirm
        open={tolak}
        onClose={closeModal}
        handleAction={() => handleUpdateStatus('rejected')}
        name="Tolak laporan"
        description="Apakah anda ingin menolak laporan ini?"
        buttonText="Tolak"
      />

      {getRole() === 'admin' && (
        <ModalConfirm
          open={hapus}
          onClose={closeModal}
          handleAction={() => handleDelete()}
          name="Hapus laporan"
          description="Apakah anda ingin MENGHAPUS laporan ini? (tidak dapat dikembalikan)"
          buttonText="Hapus"
        />
      )}

      <ModalConfirm
        open={terima}
        onClose={closeModal}
        handleAction={() => handleUpdateStatus('onProgress')}
        name="Terima laporan"
        description="Apakah anda memproses laporan ini?"
        buttonText="Proses"
      />
    </Dashboard>
  );
}
