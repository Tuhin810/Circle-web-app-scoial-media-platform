import {request} from '../api';
import {headers} from '../../../config/config';
import {MESSAGE} from '../../../constants/api/message';
import {Payload} from '../../../@types/api/api.types';

const {get,post} = request;

const initialRoute = 'chat';


export const getChatList = async (userId: any) => {
  try {
    const endpoint = `${initialRoute}/get-rooms/${userId}`;
    const response = await get(endpoint,{
      ...headers,
    },
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


export const createRoom = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/create-room`;
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