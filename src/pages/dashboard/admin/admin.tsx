import React from 'react';

import AdminUserDashboard from '../../../components/adminUserDashBoard';
import AdminProductDashboard from '../../../components/adminProductDashboard';
import AdminSideBar from '../../../components/admin-sidebar';

import { useSelector } from 'react-redux';
import { AppState } from '../../../types';

import './admin.scss';


const Admin = () => {
  const {verifiedAdmin:verified, adminView: view }= useSelector((state: AppState) => state.ui);

  return (
    <>
      {verified && (
        <div className='admin'>
          <AdminSideBar />
          {view? <AdminUserDashboard /> : <AdminProductDashboard/>}
          
        </div>
      )}
    </>
  );
};

export default Admin;
