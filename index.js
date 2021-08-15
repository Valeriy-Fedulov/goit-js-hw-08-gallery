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
    listGalleryRef.innerHTML = `<a class="gallery__link" href="${original}"> <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"></a>`;
    arrayList.push(listGalleryRef);
  });
  return ulGalleryRef.append(...arrayList);
};

createImgRef(galleryItems);

function openModal(e) {

  if (e.target.nodeName === 'IMG') {
    e.preventDefault();
    divLightBoxRef.classList.add('is-open');
    document.querySelector('.lightbox__image').src = e.target.dataset.source;
    divLightBoxRef.addEventListener('click', closeModal, 'once');
    window.addEventListener('keydown', closeModalByKey);
  };
  
  if (e.target.nodeName === 'A') {
    e.preventDefault();
    divLightBoxRef.classList.add('is-open');
    document.querySelector('.lightbox__image').src = e.target.href;
    divLightBoxRef.addEventListener('click', closeModal, 'once');
    window.addEventListener('keydown', closeModalByKey);
  };
};
    
function closeModal(e) {
  if (e.target.dataset.action === 'close-lightbox' || e.target.classList.value === 'lightbox__overlay') {
    imgLightBox.src = "";
    divLightBoxRef.classList.remove('is-open');
    window.removeEventListener('keydown', closeModalByKey);
  };
};

ulGalleryRef.addEventListener('click', openModal);

function closeModalByKey(e) {
  e.preventDefault(); 
  if (e.code === 'Escape') {
    imgLightBox.src = "";
    divLightBoxRef.classList.remove('is-open');
    window.removeEventListener('keydown', closeModalByKey);
  };
};