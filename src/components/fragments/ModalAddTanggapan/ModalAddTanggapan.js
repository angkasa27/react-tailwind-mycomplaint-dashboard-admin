import React, { useState, useEffect } from 'react';
import ModalBase from '../../elements/ModalBase';
import PropTypes from 'prop-types';
import moment from 'moment';
import TextArea from '../../input/InputTextArea';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';

export default function ModalAddTanggapan({ open, onClose, handleAction }) {
  const location = useLocation();
  const { id } = queryString.parse(location.search.replace('?', ''));
  const [description, setDescription] = useState('');

  const date = () => {
    return moment().format();
  };

  const handleSubmit = () => {
    handleAction({ description, createAt: date() });
  };

  useEffect(() => {
    if (!id) setDescription('');
  }, [id]);

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="w-72 md:w-96">
        <h2 className="txt-h1 text-center mb-2">Tambah Tanggapan</h2>

        <TextArea
          name="Tanggapan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mt-2 flex flex-col md:flex-row-reverse justify-between">
          <button
            onClick={() => handleSubmit()}
            className="btn-main w-full md:ml-1 mt-2"
          >
            Simpan
          </button>
          <button
            onClick={() => onClose()}
            className="btn-outline w-full md:mr-1 mt-2"
          >
            Batal
          </button>
        </div>
      </div>
    </ModalBase>
  );
}

ModalAddTanggapan.defaultProps = {
  open: false,
  onClose: () => {},
  handleAction: () => {},
};

ModalAddTanggapan.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleAction: PropTypes.func,
};
