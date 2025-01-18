import {request} from '../api';
import {headers} from '../../../config/config';
import {MESSAGE} from '../../../constants/api/message';
import {Payload} from '../../../@types/api/api.types';

const {get} = request;

const initialRoute = 'resort';


export const getResortDetails = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/getById-resort`;
    const response = await get(endpoint,{
      ...headers,
    },
    payload);
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


