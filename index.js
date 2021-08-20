import { galleryItems } from './app.js';

const ulGalleryRef = document.querySelector('.js-gallery');
const divLightBoxRef = document.querySelector('.js-lightbox');
const imgLightBox = divLightBoxRef.querySelector('.lightbox__image');

window.preventDefault;

function createImgRef (imgItems) {
  const arrayList = [];
  imgItems.map(img => {
    const { preview, original, description } = img;
    const listGalleryRef = document.createElement('li');
    listGalleryRef.classList.add('gallery__item');
    listGalleryRef.innerHTML = `<a class="gallery__link" href="${original}"> <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}" data-index="${arrayList.length}"></a>`;
    arrayList.push(listGalleryRef);
  });
  return ulGalleryRef.append(...arrayList);
};

createImgRef(galleryItems);

function openModal(e) {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'A') {
    e.preventDefault();
    divLightBoxRef.classList.add('is-open');
    e.target.nodeName === 'IMG' ? document.querySelector('.lightbox__image').src = e.target.dataset.source : document.querySelector('.lightbox__image').src = e.target.href;

    divLightBoxRef.addEventListener('click', closeModal, 'once');
    window.addEventListener('keydown', modalByKey);
  };
};
    
function closeModal(e) {
  if (e.target.dataset.action === 'close-lightbox' || e.target.classList.value === 'lightbox__overlay') {
    imgLightBox.src = "";
    divLightBoxRef.classList.remove('is-open');
    window.removeEventListener('keydown', modalByKey);
  };
};

ulGalleryRef.addEventListener('click', openModal);

function modalByKey(e) {
  e.preventDefault();
  console.log(e.code);
  if (e.code === 'Escape') {
    imgLightBox.src = "";
    divLightBoxRef.classList.remove('is-open');
    window.removeEventListener('keydown', modalByKey);
  };

  if (e.code === 'ArrowLeft') {
    console.log(e.target);
    document.querySelector('.lightbox__image').src = e.target.closest('li').nextSibling.querySelector('.gallery__image').dataset.source;
   openModal(e.target.closest('li').nextSibling.querySelector('.gallery__image'));
  };
};