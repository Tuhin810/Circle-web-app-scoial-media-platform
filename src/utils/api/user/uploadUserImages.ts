import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";

const { patch } = request;

const initialRoute = "user";

export const uploadProfileCoverPicture = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/upload-userProfileCoverImages`;
    const response = await patch(endpoint, payload, {
      ...headers,
      "Content-Type": "multipart/form-data",
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.patch.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const editUserProfileDetails = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/edit-userProfileDetails`;
    const response = await patch(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.patch.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
