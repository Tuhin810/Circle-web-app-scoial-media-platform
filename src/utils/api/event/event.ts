import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { Payload } from "../../../@types/api/api.types";

const { post, get, del } = request;

const initialRoute = "event";

export const createEvent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/create-event`;
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

export const getEvent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-event?user_id=${payload.user_id}`;
    const response = await get(endpoint, {
      ...headers,
    });
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

export const deleteEvent = async () => {
  try {
    const endpoint = `${initialRoute}/delete-event`;
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEventsByUser = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-events-by-user`;
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

export const joinEvent = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/join-event`;
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEventDetails = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-event-details`;
    const response = await get(endpoint, { ...headers }, payload);
    if (response?.data?.message === MESSAGE.get.succ) {
      return response.data.result;
    }
    throw new Error("Failed to fetch event details.");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
