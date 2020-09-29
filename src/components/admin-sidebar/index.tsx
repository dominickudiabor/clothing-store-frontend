import React from 'react';

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import {
  adminBanOrUnbanUser,
  adminDeleteUser,
  adminGetAllUsers,
  addProductDataToDatabase,
  toggleAdminView,
  adminFetchProducts,
  removeHightlight,
  adminDeleteProduct,
  toggleLoadingStatus,
} from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, NewUser, Admin } from '../../types';

import { v4 as uuidv4 } from 'uuid';

import inventory from '../../data/inventory';

import SideBarIcons from '../sidebar-icons';

import { Button } from '@material-ui/core';
import CreateProduct from '../create-product';

import './admin-sidebar.scss';
import ProductUpdate from '../product-update';

const AdminSideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();

  const { currentUser, adminModification, filteredUsers } = useSelector(
    (state: AppState) => state.user
  );
  const { filteredProducts, shopData, sections, adminEdit } = useSelector(
    (state: AppState) => state.product
  );

  const modifyId = adminModification?._id;
  const highlightId = adminEdit?._id;

  const { firstname, lastname, photo, _id: adminId } = currentUser as NewUser;

  const handleBanUser = async () => {
    const data = { modifyId };
    modifyId && dispatch(adminBanOrUnbanUser(data));
  };

  const handleDelete = async () => {
    const data = { modifyId };

    modifyId && dispatch(adminDeleteUser(data));
  };

  const handleGetUsers = async () => {
    dispatch(adminGetAllUsers());
  };

  const handleBatchInsert = async () => {
    const data = {
      adminId,
      inventory,
      requestType: 'inventory',
    } as Admin;
    dispatch(addProductDataToDatabase(data));
  };

  const handleAdminViewToggle = () => {
    dispatch(removeHightlight());
    dispatch(toggleAdminView());
  };

  const handleFetchProducts = async () => {
    filteredProducts.length === 0 && dispatch(adminFetchProducts());
    dispatch(toggleLoadingStatus(true));
  };

  const handleDeleteProduct = async () => {
    const data = { modifyId: highlightId, adminId };
    dispatch(adminDeleteProduct(data));
    dispatch(toggleLoadingStatus(true));
  };
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleUpdateOpen = () => setUpdate(true);
  const handleUpdateClose = () => setUpdate(false);

  const icons = [
    {
      click: handleGetUsers,
      label: 'Fetch Users',
      icon: <PeopleAltOutlinedIcon />,
      disabled: filteredUsers.length > 0,
    },
    {
      click: handleBanUser,
      label: 'Ban / Unban',
      icon: <PersonAddDisabledOutlinedIcon />,
      disabled: false,
    },
    {
      click: handleDelete,
      label: 'Delete a user',
      icon: <DeleteOutlineIcon />,
      disabled: false,
    },
    {
      click: handleBatchInsert,
      label: 'Populate Database',
      icon: <QueueOutlinedIcon />,
      disabled: shopData.hasOwnProperty('hats') || sections.length === 0,
    },
    {
      click: handleFetchProducts,
      label: 'Fetch products',
      icon: <LibraryAddCheckOutlinedIcon />,
      disabled: filteredProducts.length > 0,
    },
    {
      click: handleDialogOpen,
      label: 'Create new product',
      icon: <CreateOutlinedIcon />,
      disabled: false,
    },
    {
      click: handleUpdateOpen,
      label: 'Update product',
      icon: <UpdateOutlinedIcon />,
      disabled: false,
    },
    {
      click: handleDeleteProduct,
      label: 'Delete product',
      icon: <HighlightOffOutlinedIcon />,
      disabled: false,
    },
  ];

  return (
    <>
      <div className='admin'>
        <div className='admin__sidebar'>
          <div className='admin__user'>
            {photo ? (
              <img
                className='admin__image'
                src={
                  photo || 'https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'
                }
                alt='current logged in profile'
              />
            ) : (
              <img
                className='admin__image'
                src='https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'
                alt='current logged in profile'
              />
            )}
            <h4>{`${firstname} ${lastname}`}</h4>
            <p>Administrator</p>
            <Button onClick={handleAdminViewToggle} className='admin__toggle'>
              Toggle View
            </Button>
          </div>
          <div className='admin__links'>
            {icons.map((item) => {
              const { click, label, disabled, icon } = item;
              return (
                <SideBarIcons
                  key={uuidv4()}
                  handleClick={click}
                  buttonLabel={label}
                  disabled={disabled}
                >
                  {icon}
                </SideBarIcons>
              );
            })}
          </div>
        </div>
        <CreateProduct open={open} onClose={handleDialogClose} />
        <ProductUpdate open={update} onClose={handleUpdateClose} />
      </div>
    </>
  );
};

export default AdminSideBar;
