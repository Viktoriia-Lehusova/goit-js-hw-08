// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
console.log(gallery);

const galleryMarkup = galleryItems
  .map(
    ({
      preview,
      original,
      description,
    }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', onClickLargeImg);

function onClickLargeImg(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
