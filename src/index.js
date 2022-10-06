import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './helpers/api';
import { getTemplate } from './helpers/helpers';

let currentPage = 1;
let perPage = 40;
let searchData = '';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more');

formEl.addEventListener('submit', async event => {
  currentPage = 1;
  event.preventDefault();
  searchData = event.target.elements.searchQuery.value;

  if (searchData !== '') {
    loadMoreButtonEl.style.display = 'none';
    const images = await fetchImages(searchData);

    if (images.hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      galleryEl.innerHTML = '';
      return;
    }
    galleryEl.innerHTML = getTemplate(images.hits);
    console.log(images);

    if (perPage * currentPage < images.totalHits) {
      loadMoreButtonEl.style.display = 'block';
    } else {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } else {
    Notify.warning('Please enter something :)');
    galleryEl.innerHTML = '';
  }
});

loadMoreButtonEl.addEventListener('click', async event => {
  currentPage += 1;
  const loadMore = await fetchImages(searchData, currentPage);
  galleryEl.insertAdjacentHTML('beforeend', getTemplate(loadMore.hits));
  if (perPage * currentPage < loadMore.totalHits) {
    loadMoreButtonEl.style.display = 'block';
  } else {
    loadMoreButtonEl.style.display = 'none';
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
});
