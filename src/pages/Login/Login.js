import React from 'react';
import { useHistory } from 'react-router-dom';
import InputText from '../../components/input/InputText';

export default function Login() {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center font-nunito h-screen ">
      <div className="mt-16 w-full mx-10 sm:w-96 md:mt-24">
        <div className="overflow-hidden bg-white rounded-xl px-10 pt-8 pb-10 shadow-md hover:shadow-xl transition duration-300 ease-out">
          <div className="relative h-10">
            <h1 className="text-7xl font-bold text-center text-indigo-50 absolute -top-6 -inset-x-1/2 ">
              MyComplaint
            </h1>
            <h1 className="text-center absolute z-10 top-0 -inset-x-1/2 txt-h1">
              Masuk!
            </h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-5 z-20">
            <InputText
              placeholder="Masukan username"
              type="text"
              className="mb-2"
              name="Username"
            />
            <InputText
              placeholder="Masukan password"
              type="password"
              name="Password"
            />
            <div className="flex mt-4 flex-col md:flex-row-reverse justify-between">
              <button
                type="submit"
                className="btn-main mt-2 md:w-36 w-full tracking-wider"
              >
                Masuk
              </button>
              <button
                onClick={() => history.push('/register')}
                className="btn-outline mt-2 md:w-36 w-full tracking-wider"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
        <span className="text-gray-800 opacity-30">
          by: Dimas Angkasa Nurindra
        </span>
      </div>
    </div>
  );
}
