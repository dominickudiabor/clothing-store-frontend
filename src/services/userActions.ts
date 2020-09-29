import axios from 'axios';

import { UpdatedUser, UpdatedPassword, Admin, PaymentRequest } from '../types';

const userUrl = 'users/';

export default {
  fetchEmailUser: async (email: string, password: string) => {
    const response = await axios.post(`${userUrl}login`, { email, password });
    return response;
  },

  fetchGoogleUser: async (tokenId: string) => {
    const googleResponse = await axios.post(`${userUrl}google-authenticate`, {
      id_token: tokenId,
    });

    return googleResponse;
  },

  fetchLoginToken: async (token: string) => {
    var base64Url = token?.split('.')[1] as any;
    var base64 = await base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    var decipher = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const timeLimit = await JSON.parse(decipher);
    const timeRemaining = (timeLimit.exp * 1000) as number;

    return timeRemaining;
  },

  createUser: async (user: {
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post(`${userUrl}signup`, {
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    return response;
  },

  updateProfile: async (user: UpdatedUser) => {
    const { userId } = user;
    const response = await axios.put(`${userUrl}${userId}`, { user });

    return response;
  },
  updateProfilePhoto: async (user: UpdatedUser) => {
    const { userId, photo } = user;
    const data = new FormData();
    data.append('photo', photo);
    const response = await axios.post(
      `${userUrl}upload-photo/${userId}`,
      data,
      {
        headers: { 'Content-type': 'multipart/form-data' },
      }
    );

    return response;
  },

  updatePassword: async (data: UpdatedPassword) => {
    const { userId } = data;
    const response = await axios.post(`${userUrl}update-password/${userId}`, {
      data,
    });

    return response;
  },

  confirmEmail: async (data: Admin) => {
    const { userId } = data;
    const apiResponse = await axios.post(
      `${userUrl}confirm-email/${userId}`,
      {}
    );
    return apiResponse;
  },

  processPayments: async (data: PaymentRequest) => {
    const { userId } = data;
    const response = await axios.post(`${userUrl}stripe-payment/${userId}`, {
      data,
    });

    return response;
  },
};
