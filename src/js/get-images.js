const API_KEY = 'key=25733485-485cb9dd944de62854e3a0445';
const MAIN_DOMAIN = 'https://pixabay.com/api/';
const PARAMETERS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 'per_page=40';

const fetchImages = (value, page) => {
  return fetch(`${MAIN_DOMAIN}?${API_KEY}&q=${value}&${PARAMETERS}&page=${page}&${PER_PAGE}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    },
  );
};

export { fetchImages };
