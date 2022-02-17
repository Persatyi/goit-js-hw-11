import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
    hideLoadMoreBtn();
    clearPage();
    return;
  }

  hideLoadMoreBtn();
  clearPage();

  fetchImages(inputValue, page)
    .then(response => {
      if (response.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }

      renderGallery(response.hits);

      Notify.success(`Hooray! We found ${response.totalHits} images.`);

      if (response.hits.length < 40) {
        return;
      }
      loadMoreBtn();
    })
    .catch(error => Notify.failure('Sorry, something went wrong. Please try again.'));
}

function renderGallery(array) {
  const markup = array
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
                <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
                </a>
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

  lightbox.refresh();
}

function clearPage() {
  galleryRef.innerHTML = '';
}

loadMoreBtnRef.addEventListener('click', loadMorePictures);

function loadMorePictures() {
  page += 1;
  loadMoreBtnRef.disabled = true;
  lightbox.refresh();
  fetchImages(inputValue, page)
    .then(response => {
      renderGallery(response.hits);

      if (response.hits.length < 40) {
        hideLoadMoreBtn();
        Notify.info("We're sorry, but you've reached the end of search results.");
        return;
      }
      loadMoreBtn();
    })
    .catch(error =>
      Notify.failure('Sorry, there are no images matching your search query. Please try again.'),
    );
}

function loadMoreBtn() {
  loadMoreBtnRef.classList.remove('is-hidden');
  loadMoreBtnRef.disabled = false;
}

function hideLoadMoreBtn() {
  loadMoreBtnRef.disabled = true;
  loadMoreBtnRef.classList.add('is-hidden');
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});