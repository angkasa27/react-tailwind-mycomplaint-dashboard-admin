import axios from 'axios';
// import { useLocation } from 'react-router-dom';

import { getToken, clearStorage } from './storage';

// const BEARER_AUTH = { Authorization: `${getToken()}` };
export function BEARER_AUTH() {
  return { Authorization: `${getToken()}` };
}

const BASE_URL = 'http://localhost:8080/admin';

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => {
        if (res.data.message === 'token tidak valid') clearStorage();
        else resolve(res.data);
      })
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        if (!err.message) reject(defaultError);
        else reject(err);
      });
  });
};

export const loginAdmin = async (data) =>
  await fetch(`${BASE_URL}/login`, 'post', data);

export const getProfile = async () =>
  await fetch(`${BASE_URL}/profile`, 'get', { headers: BEARER_AUTH() });

export const getStatistic = async () =>
  await fetch(`${BASE_URL}/statistic`, 'get', { headers: BEARER_AUTH() });

export const getAllPengaduan = async (page) =>
  await fetch(`${BASE_URL}/pengaduan?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const getDetailPengaduan = async (id) =>
  await fetch(`${BASE_URL}/pengaduan/${id}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const putStatusPengaduan = async (id, data) =>
  await fetch(`${BASE_URL}/pengaduan/${id}/status`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const getDokumenPengaduan = async () =>
  await fetch(`${BASE_URL}/laporan/pengaduan`, 'get', {
    headers: BEARER_AUTH(),
  });

export const addTanggapanPengaduan = async (id, data) =>
  await fetch(`${BASE_URL}/pengaduan/${id}/response`, 'post', data, {
    headers: BEARER_AUTH(),
  });

export const deletePengaduan = async (id) =>
  await fetch(`${BASE_URL}/pengaduan/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });

export const getAllUsers = async (page) =>
  await fetch(`${BASE_URL}/user?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const putDataUser = async (id, data) =>
  await fetch(`${BASE_URL}/user/${id}`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const deleteUser = async (id) =>
  await fetch(`${BASE_URL}/user/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });

export const getAllOperator = async (page) =>
  await fetch(`${BASE_URL}/operator?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const addOperator = async (data) =>
  await fetch(`${BASE_URL}/operator`, 'post', data, {
    headers: BEARER_AUTH(),
  });

export const editOperator = async (id, data) =>
  await fetch(`${BASE_URL}/operator/${id}`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const deleteOperator = async (id) =>
  await fetch(`${BASE_URL}/operator/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });
