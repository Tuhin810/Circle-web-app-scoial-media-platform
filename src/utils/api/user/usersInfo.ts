import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";

const { get, post } = request;

const initialRoute = "user";

export const getUser = async (filter: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-all-users`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      filter
    );
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: { result, pagination },
        } = response;
        return { result, pagination };
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const getOnlyUser = async (filter: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-user`;
    const response = await get(
      endpoint,
      {
        ...headers,
      },
      filter
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

export const getUserDetailsWithContent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-user-details-with-content`;
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

export const getUserLatestContent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-user-latest-content`;
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
          data: { result, pagination },
        } = response;
        return { result, pagination };
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const followUser = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/follow-user`;
    const response = await post(endpoint, payload, {
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

export const getFollowers = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-followers`;
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
    console.log("Errror while fetching followers", error);
    throw error;
  }
};

export const searchUserByName = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/search-users`;
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
    console.log("Errror while fetching followers", error);
    throw error;
  }
};
