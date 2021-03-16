import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pengaduan from './pages/Pengaduan';
import Pengguna from './pages/Pengguna';
import Petugas from './pages/Petugas';
import Login from './pages/Login';
import './App.css';
import { getToken } from './utils/storage';
import { useLocation, useHistory } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const history = useHistory();

  const noAuthRoutes = ['/login', '/Login'];
  const noAuth = noAuthRoutes.some((r) => location.pathname.match(r));

  // useEffect(() => {
  //   setToken(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtYSI6InBldHVnYXMiLCJ1cyI6InBldHVnYXMiLCJsZXZlbCI6InBldHVnYXMiLCJpYXQiOjE2MTUzNTM1NzUsImV4cCI6MTYxNTUyNjM3NX0.4cTM1AqFdu15oKMWZxna9hIHnPiR76d19y9YJWhH4IU'
  //   );
  // }, []);

  useEffect(() => {
    if (!getToken() && !noAuth) {
      history.push('/login');
    } else if (getToken() && noAuth) {
      history.push('/dashboard');
    }
  }, [location.pathname]);

  return (
    <div className=" bg-fixed bg-gray-50 bg-cover  text-gray-600">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/pengaduan" component={Pengaduan} />
        <Route exact path="/pengguna" component={Pengguna} />
        <Route exact path="/petugas" component={Petugas} />
      </Switch>
    </div>
  );
}
