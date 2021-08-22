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
    listGalleryRef.innerHTML = `<a class="gallery__link" href="${original}"> <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}" data-index=${arrayList.length}></a>`;
    arrayList.push(listGalleryRef);
  });
  return ulGalleryRef.append(...arrayList);
};

createImgRef(galleryItems);

function openModal(e) {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'A') {
    e.preventDefault();
    divLightBoxRef.classList.add('is-open');
    if (e.target.nodeName === 'IMG') {
      imgLightBox.src = e.target.dataset.source;
      imgLightBox.alt = e.target.alt;
      imgLightBox.dataset.index = e.target.dataset.index;
    }
    else {
      const hrefImg = e.target.querySelector('.gallery__image');
      imgLightBox.src = hrefImg.src;
      imgLightBox.alt = hrefImg.alt;
      imgLightBox.dataset.index = hrefImg.dataset.index;
    };

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
  if (e.code === 'Escape') {
    imgLightBox.src = "";
    divLightBoxRef.classList.remove('is-open');
    window.removeEventListener('keydown', modalByKey);
  };

  if (e.code === 'ArrowLeft') {
    let imgIndex = parseInt(imgLightBox.dataset.index) - 1;
    if (imgIndex === -1) imgIndex = ulGalleryRef.querySelectorAll('li').length - 1;
  
    imgLightBox.src = ulGalleryRef.querySelector(`img[data-index = "${imgIndex}"]`).src;
    imgLightBox.dataset.index = imgIndex;
  };
  
  if (e.code === 'ArrowRight') {
    let imgIndex = parseInt(imgLightBox.dataset.index) + 1;
    if (imgIndex === ulGalleryRef.querySelectorAll('li').length) imgIndex = 0;
  
    imgLightBox.src = ulGalleryRef.querySelector(`img[data-index = "${imgIndex}"]`).src;
    imgLightBox.dataset.index = imgIndex;
  };
};