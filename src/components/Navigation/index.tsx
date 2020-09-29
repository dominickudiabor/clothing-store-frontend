import React, { useEffect } from 'react';

import CartDropdown from '../cart-dropdown/index';

import { AppBar, Toolbar, IconButton, Badge, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useDispatch, useSelector } from 'react-redux';
import { toggleCartHidden } from '../../redux/actions/cart';
import { AppState } from '../../types';
import { Link, useHistory } from 'react-router-dom';

import { signOut, adminRequestAccess } from '../../redux/actions';

import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const { hidden, cartItems } = useSelector((state: AppState) => state.cart);
  const { currentUser, token: authCheck } = useSelector(
    (state: AppState) => state.user
  );
  const verified = useSelector((state: AppState) => state.ui.verifiedAdmin);

  const cartItemsTotal = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );

  const handleProfile = () => history.push(`/profile/${currentUser?.username}`);

  const handleRoute = () => history.push('/shop');

  const handleAdmin = async () =>
    history.push(`/admin/${currentUser?.username}`);

  const handleSignOut = async () => {
    dispatch(signOut());
  };
  const handleCartToggle = () => dispatch(toggleCartHidden());

  useEffect(() => {
    function activateAdminCheck() {
      const data = { adminId: currentUser?._id, authCheck };
      if (!verified) {
        dispatch(adminRequestAccess(data));
      }
    }
    currentUser?.role === 'admin' && activateAdminCheck();
  }, [dispatch, verified, authCheck, currentUser]);

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Link className={classes.link} to='/'>
            <img
              className={classes.menuIcon}
              src='https://i.ibb.co/yXm3M3c/logo.png'
              alt='appbar logo'
            />
          </Link>

          <div className={classes.grow} />
          <Button className={classes.admin} onClick={handleRoute}>
            SHOP
          </Button>
          {currentUser && (
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleProfile}
            >
              <img
                className={classes.photo}
                src={
                  currentUser.photo ||
                  'https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'
                }
                alt='avatar of user'
              />
            </Button>
          )}
          {currentUser?.role === 'admin' && (
            <Button className={classes.admin} onClick={handleAdmin}>
              Admin
            </Button>
          )}

          {!currentUser && (
            <Button color='inherit'>
              <Link to='/login' className={classes.link}>
                {' '}
                <AccountCircleOutlinedIcon className={classes.account} />
              </Link>
            </Button>
          )}
          {cartItems.length > 0 && (
            <IconButton color='inherit' onClick={handleCartToggle}>
              <Badge badgeContent={cartItemsTotal} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {!hidden && <CartDropdown />}
          {currentUser && (
            <ExitToAppIcon className={classes.exit} onClick={handleSignOut} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
