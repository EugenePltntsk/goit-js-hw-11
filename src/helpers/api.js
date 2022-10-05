import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const fetchImages = async (query, page = 1) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=30313621-ff7fe66ba11e046cf69a4fc60&q=${query}&safesearch=true&image_type=photo&orientation=horizontal&page=${page}&per_page=40`
  );
  
return data;
};

