import React, { useState, useEffect } from 'react';
import ModalBase from '../../elements/ModalBase';
import PropTypes from 'prop-types';
import InputText from '../../input/InputText';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';
import moment from 'moment';

export default function ModalEditPengguna({
  open,
  onClose,
  data,
  handleAction,
}) {
  const location = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const { add } = queryString.parse(location.search.replace('?', ''));

  useEffect(() => {
    if (data) {
      setName(data.nama_petugas);
      setUsername(data.Username);
    }
  }, [data]);

  const date = () => {
    return moment().format();
  };

  const handleSubmit = () => {
    if (add) handleAction({ name, username, telp: date() });
    else handleAction({ name, username });
  };

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="w-72 md:w-96">
        <h2 className="txt-h1 text-center mb-2 capitalize">Edit data</h2>
        <InputText
          placeholder="name lengkap"
          type="text"
          className="mb-2"
          name="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputText
          placeholder="username tanpa spasi"
          type="text"
          name="Username"
          className="mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

ModalEditPengguna.defaultProps = {
  open: false,
  onClose: () => {},
  handleAction: () => {},
  data: {},
};

ModalEditPengguna.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleAction: PropTypes.func,
  data: PropTypes.object,
};
