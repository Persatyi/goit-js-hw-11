import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=25733485-485cb9dd944de62854e3a0445';
const MAIN_DOMAIN = 'https://pixabay.com/api/';
const PARAMETERS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 'per_page=40';

// const fetchImages = (value, page) => {
//   return fetch(`${MAIN_DOMAIN}?${API_KEY}&q=${value}&${PARAMETERS}&page=${page}&${PER_PAGE}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.message);
//       }
//       return response.json();
//     },
//   );
// };

////////////////////////////////axios///////////////////////////////////////////////////

// const fetchImages = (value, page) => {
//   return axios
//     .get(`?${API_KEY}&q=${value}&${PARAMETERS}&page=${page}&${PER_PAGE}`)
//     .then(response => {
//       return response.data;
//     });
// };

///////////////////////////////////////async - axios/////////////////////////////////////////

const fetchImages = async (value, page) => {
  const response = await axios.get(`?${API_KEY}&q=${value}&${PARAMETERS}&page=${page}&${PER_PAGE}`);
  return response.data;
};

export { fetchImages };
