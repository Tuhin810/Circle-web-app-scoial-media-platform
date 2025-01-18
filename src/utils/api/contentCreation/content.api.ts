import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";

const { post, get, del } = request;

const initialRoute = "content";

export const contentCreation = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/content-creation`;
    const response = await post(endpoint, payload, {
      ...headers,
      "Content-Type": "multipart/form-data",
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
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

export const getContent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-content`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      payload
    );
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
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

export const deleteContent = async () => {
  try {
    const endpoint = `${initialRoute}/delete-content`;
    const response = await del(endpoint, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.delete.succ) {
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

//like content stuffs-->
export const likeContent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/like-post`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
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

export const commentContent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/add-comment`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
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

export const getComments = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-comment`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      payload
    );
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
