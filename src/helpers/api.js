import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: '30313621-ff7fe66ba11e046cf69a4fc60',
      q: query,
      safesearch: true,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 40,
    },
  });

  return data;
};
