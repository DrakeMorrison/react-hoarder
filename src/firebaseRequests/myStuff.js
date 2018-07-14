import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/mystuff.json`)
      .then(res => {
        const stuff = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            stuff.push(res.data[fbKey]);
          });
        }
        resolve(stuff);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (itemId) => {
  const newItem = {};
  newItem[itemId] = 1;
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/mystuff.json`, newItem)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getRequest, postRequest };
