import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/get-images';

const searchFormRef = document.querySelector('#search-form');
const searchInputRef = document.querySelector('input[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

searchFormRef.addEventListener('submit', searchPicture);

let inputValue = '';
let page = 1;

function searchPicture(e) {
  e.preventDefault();

  inputValue = searchInputRef.value.trim();

  if (!inputValue) {
    clearPage();
    return;
  }

  fetchImages(inputValue, page)
    .then(response => {
      renderGallery(response.hits);
      Notify.success('Hooray! We found totalHits images.');
    })
    .catch(error =>
      Notify.failure('Sorry, there are no images matching your search query. Please try again.'),
    );
}

function renderGallery(array) {
  const markup = array
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b> ${downloads}
                    </p>
                </div>
            </div>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function clearPage() {
  galleryRef.innerHTML = '';
}

loadMoreBtnRef.addEventListener('click', loadMorePictures);

function loadMorePictures() {
  page += 1;
  fetchImages(inputValue, page)
    .then(response => {
      renderGallery(response.hits);
      Notify.success('Hooray! We found totalHits images.');
    })
    .catch(error =>
      Notify.failure('Sorry, there are no images matching your search query. Please try again.'),
    );
}
