import axios from 'axios';

class ApiService {
  DATA_URL = 'http://www.filltext.com';

  #fetchData = async config => axios.get(this.DATA_URL, config);

  fetchSmallData = async () => {
    const config = {
      params: {
        rows: 32,
        id: '{number|1000}',
        firstName: '{firstName}',
        lastName: '{lastName}',
        email: '{email}',
        phone: '{phone|(xxx)xxx-xx-xx}',
        address: '{addressObject}',
        description: '{lorem|32}',
      },
    };
    return this.#fetchData(config);
  };

  fetchBigData = async () => {
    const config = {
      params: {
        rows: 1000,
        id: '{number|1000}',
        firstName: '{firstName}',
        delay: 3,
        lastName: '{lastName}',
        email: '{email}',
        phone: '{phone|(xxx)xxx-xx-xx}',
        address: '{addressObject}',
        description: '{lorem|32}',
      },
    };
    return this.#fetchData(config);
  };
}

export default ApiService;
