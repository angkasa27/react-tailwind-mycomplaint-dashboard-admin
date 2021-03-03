import React from 'react';
import ModalBase from '../../elements/ModalBase';
import PropTypes from 'prop-types';
import InputText from '../../input/InputText';

export default function ModalEditPengguna({
  open,
  onClose,
  data,
  description,
  handleAction,
  name,
  buttonText,
}) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="w-72 md:w-96">
        <h2 className="txt-h1 text-center mb-2 capitalize">Edit data</h2>
        <InputText
          placeholder="nama lengkap"
          type="text"
          className="mb-2"
          name="Nama Lengkap"
        />
        <InputText
          placeholder="username tanpa spasi"
          type="text"
          name="Username"
          className="mb-2"
        />
        <InputText
          placeholder="minimal 12 digit angka"
          type="text"
          name="Nomor Telepon"
          className="mb-2"
        />
        <InputText
          placeholder="15 digit NIK"
          type="text"
          name="NIK"
          className="mb-2"
        />
        <div className="mt-2 flex flex-col md:flex-row-reverse justify-between">
          <button
            onClick={() => handleAction()}
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
  description: '',
  buttonText: '',
  name: '',
  onClose: () => {},
  handleAction: () => {},
  data: {},
};

ModalEditPengguna.propTypes = {
  open: PropTypes.bool,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
  handleAction: PropTypes.func,
  data: PropTypes.object,
};
