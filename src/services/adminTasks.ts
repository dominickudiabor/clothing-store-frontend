import axios from "axios";
import { Admin } from "../types";

const adminUrl = "admin/";

export default {
  requestAdminAccess: async (data: Admin) => {
    const { adminId } = data;
    const apiResponse = await axios.post(
      `${adminUrl}verification/${adminId}`,
      {}
    );

    return apiResponse;
  },

  banOrUnBanUser: async (data: Admin) => {
    const { modifyId } = data;
    const apiResponse = await axios.put(`${adminUrl}ban-user/${modifyId}`, {});

    return apiResponse;
  },

  deleteUser: async (data: Admin) => {
    const { modifyId } = data;
    const apiResponse = await axios.delete(`${adminUrl}eradicate/${modifyId}`);

    return apiResponse;
  },

  getUsers: async () => {
    const apiResponse = await axios.get(`${adminUrl}`);

    return apiResponse;
  },

  updateSectionInventory: async (data: Admin) => {
    const { adminId, sections } = data;
    const apiResponse = await axios.post(`${adminUrl}batch-insert/${adminId}`, {
      sections,
    });

    return apiResponse;
  },
  updateShopInventory: async (data: Admin) => {
    const { adminId, inventory } = data;
    const apiResponse = await axios.post(`${adminUrl}inventory/${adminId}`, {
      inventory,
    });

    return apiResponse;
  },
  getAllProducts: async () => {
    const apiResponse = await axios.get(`${adminUrl}fetchProducts`);
    return apiResponse;
  },
  createNewProduct: async (data: Admin) => {
    const { adminId, product } = data;
    const apiResponse = await axios.post(
      `${adminUrl}createProduct/${adminId}`,
      { product }
    );

    return apiResponse;
  },

  deleteProduct: async (data: Admin) => {
    const { modifyId } = data;
    const apiResponse = await axios.delete(
      `${adminUrl}eliminateProduct/${modifyId}`
    );

    return apiResponse;
  },
  updateProduct: async (data: Admin) => {
    const { modifyId, product } = data;
    const apiResponse = await axios.put(
      `${adminUrl}modify-product/${modifyId}`,
      { product }
    );

    return apiResponse;
  },
  loadShopSections: async () => {
    const apiResponse = await axios.get(`${adminUrl}fetchSections`);

    return apiResponse;
  },
  loadShopInventory: async () => {
    const apiResponse = await axios.get(`${adminUrl}fetchInventory`);

    return apiResponse;
  },
};
