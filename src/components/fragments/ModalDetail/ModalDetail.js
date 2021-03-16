import React from 'react';
import ModalBase from '../../elements/ModalBase';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';
import moment from 'moment';
export default function ModalDetail({ open, onClose, data, handleAction }) {
  const location = useLocation();
  const { id } = queryString.parse(location.search.replace('?', ''));

  if (data)
    return (
      <ModalBase open={open} onClose={onClose}>
        {parseInt(id) === data.pengaduanId && (
          <div className="w-72 md:w-96">
            <h2 className="txt-h1 text-center mb-2">Detail Laporan</h2>
            <img
              className="h-48 w-full object-cover rounded"
              src={data.detail && data.detail.image}
              alt="gambar laporan"
            />
            <h3 className="font-bold mt-2">{data.subject}</h3>
            <span className="text-xs block text-gray-300 mb-2">
              {data.userName +
                ', ' +
                moment(data.createAt).locale('id').format('D MMMM YYYY')}
            </span>
            <p className="overflow-y-auto max-h-32">
              {data.detail && data.detail.description}
            </p>
            <div className="mt-2 flex flex-col md:flex-row-reverse justify-between">
              {data.status === 'submitted' && (
                <button
                  onClick={() => handleAction()}
                  className="btn-main w-full md:ml-1 mt-2"
                >
                  Proses / Tinjau
                </button>
              )}
              <button
                onClick={() => onClose()}
                className="btn-outline w-full md:mr-1 mt-2"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </ModalBase>
    );
}

ModalDetail.defaultProps = {
  open: false,
  onClose: () => {},
  handleAction: () => {},
  data: {},
};

ModalDetail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleAction: PropTypes.func,
  data: PropTypes.object,
};
