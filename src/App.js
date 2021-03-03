import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pengaduan from './pages/Pengaduan';
import Pengguna from './pages/Pengguna';
import Petugas from './pages/Petugas';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <div className=" bg-fixed bg-gray-50 bg-cover  text-gray-600">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/pengaduan" component={Pengaduan} />
        <Route exact path="/pengguna" component={Pengguna} />
        <Route exact path="/petugas" component={Petugas} />
      </Switch>
    </div>
  );
}
