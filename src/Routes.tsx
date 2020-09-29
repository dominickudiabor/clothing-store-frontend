import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { AppState } from './types';

import PasswordResetForm from './components/password-reset';
import ResetPassword from './pages/reset-password/reset';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import NavBar from './components/Navigation';
import DashBoard from './pages/dashboard/user/dashboard';
import Admin from './pages/dashboard/admin/admin';
import ProductPage from './pages/shop/shop';
import Category from './components/product-category';
import CheckoutPage from './pages/checkout/checkout';
import Footer from './components/footer';
import UpdateProduct from './components/password-update';
import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from '../src/components/backdrop/auth';
import { useSnackbar } from 'notistack';
import ImageUpload from './components/image-upload';
import PasswordUpdate from './components/password-update';
import ProfileUpdate from './components/profile-update';

const Routes = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    currentUser: isLoggedIn,
    isLoading: loadingData,
    notification,
    error,
  } = useSelector((state: AppState) => state.user);
  const verified = useSelector((state: AppState) => state.ui.verifiedAdmin);

  useEffect(() => {
    const showNotifications = () => {
      notification
        ? enqueueSnackbar(notification, { variant: 'success' })
        : error && enqueueSnackbar(error, { variant: 'error' });
    };
    (notification || error) && showNotifications();
  }, [enqueueSnackbar, error, notification]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin/update' component={UpdateProduct} />
        <Route exact path='/password/requestSignIn' component={ResetPassword} />
        <Route
          exact
          path='/password/reset/:token'
          component={PasswordResetForm}
        />
        <Route
          exact
          path='/upload-photo'
          render={() => (isLoggedIn ? <ImageUpload /> : <Home />)}
        />
        <Route
          exact
          path='/profile/update-password'
          render={() => (isLoggedIn ? <PasswordUpdate /> : <Home />)}
        />
        <Route
          exact
          path='/profile/update'
          render={() => (isLoggedIn ? <ProfileUpdate /> : <Home />)}
        />
        <Route
          exact
          path='/profile/:username'
          render={() => (isLoggedIn ? <DashBoard /> : <Home />)}
        />
        <Route
          exact
          path='/login'
          render={() => (!isLoggedIn ? <Authentication /> : <ProductPage />)}
        />

        <Route
          exact
          path='/admin/:username'
          render={() => (verified ? <Admin /> : <Home />)}
        />

        <Route exact path='/shop' component={ProductPage} />
        <Route path={'/shop/:categoryName'} component={Category}></Route>
        <Route
          exact
          path='/checkout'
          render={() => (isLoggedIn ? <CheckoutPage /> : <Authentication />)}
        />
      </Switch>
      <Backdrop className={classes.backdrop} open={loadingData}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Footer />
    </>
  );
};

export default Routes;
