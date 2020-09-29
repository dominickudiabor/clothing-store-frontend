import axios from "axios";
const userUrl = "auth/";
export default {
  passwordRequest: async (email: string) => {
    const response = await axios.post(`${userUrl}password-request`, {
      email,
    });
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response;
  },
};
