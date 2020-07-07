import axios from 'axios';

export default function({ dispatch ,types, customPayload, ...params }) {
  return new Promise((resolve, reject) => {
    dispatch({type: types[0], request: true });
    axios(params)
      .then(res => {
        const payload = customPayload || res.data;
        dispatch({
          type: types[1],
          payload,
        });
      resolve(payload);
      })
      .catch(error => {
        dispatch({
          type: types[2],
          error: true,
          payload: error.response.data,
        });
        reject(error.response.data);
      });
  });
}