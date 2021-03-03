import React from 'react';
import ModalBase from '../../elements/ModalBase';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function ModalTanggapan({ open, onClose, data, handleAction }) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="w-72 md:w-96">
        <h2 className="txt-h1 text-center mb-2">Detail Tanggapan</h2>
        <h3 className="font-bold mt-2">{data.subject}</h3>{' '}
        <span className="text-xs block text-gray-300 mb-2">
          {data.userName + ', ' + moment(data.date).locale('id').format('LL')}
        </span>
        <p className="overflow-y-auto max-h-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          necessitatibus molestias ullam illum doloribus tempore animi suscipit
          similique natus tempora, voluptas explicabo perferendis vitae beatae
          repellat et! Iste, ullam obcaecati?
        </p>
        <span className="text-xs block text-gray-300 my-1">
          {data.operatorName + ', March 3 2021'}
        </span>
        <div className="mt-2 flex flex-col md:flex-row-reverse justify-between">
          <button
            onClick={() => onClose()}
            className="btn-outline w-full md:mr-1 mt-2"
          >
            Tutup
          </button>
        </div>
      </div>
    </ModalBase>
  );
}

ModalTanggapan.defaultProps = {
  open: false,
  onClose: () => {},
  handleAction: () => {},
  data: {},
};

ModalTanggapan.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleAction: PropTypes.func,
  data: PropTypes.object,
};
