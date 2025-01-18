import {request} from '../api';
import {headers} from '../../../config/config';
import {MESSAGE} from '../../../constants/api/message';
import {Payload} from '../../../@types/api/api.types';

const {get,post,patch} = request;

const initialRoute = 'live';


export const getStreamList = async (filterQuery: any) => {
  try {
    const endpoint = `${initialRoute}/getAll-live-room`;
    const response = await get(
        endpoint,
        {
            ...headers
        },
        filterQuery
    );
    if (response) {
      const {
        data: {message},
      } = response;
      if (message === MESSAGE.get.succ) {
        const {
          data: {result},
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


export const closeLiveRoom = async (payload: any) => {
    try {
      const endpoint = `${initialRoute}/deactivate-live-room`;
      const response = await patch(endpoint, payload, {
        ...headers,
      });
      if (response) {
        const {
          data: {message},
        } = response;
        if (message === MESSAGE.patch.succ) {
          const {
            data: {result},
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

export const createLiveRoom = async (payload: any) => {
  try {
    const endpoint = `${initialRoute}/create-live-room`;
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
}