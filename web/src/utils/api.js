
import Cookies from 'js-cookie';

export const fetchWithToken = (url, options = {}) => {
  const accessToken = Cookies.get('accessToken');

  if (accessToken) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };
  }

  return fetch(url, options);
};
