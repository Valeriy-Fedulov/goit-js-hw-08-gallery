import { galleryItems } from './app.js';

const ulGalleryRef = document.querySelector('.gallery');
const divLightBoxRef = document.querySelector('.lightbox');

console.log(ulGalleryRef);

function createImgRef (imgItems) {
  const arrayList = [];
  imgItems.map(img => {
    const { preview, original, description } = img;
    const listGalleryRef = document.createElement('li');
    listGalleryRef.classList.add('gallery__item');
    console.log(listGalleryRef);
        listGalleryRef.innerHTML = `<a class="gallery__link"> <img class="gallery__image" src="${preview}" alt="${description}"></a>`;
    arrayList.push(listGalleryRef);
  });
  return ulGalleryRef.append(...arrayList);
};

createImgRef(galleryItems);

function openModal() {
   // ulGalleryRef.preventDefault();
    divLightBoxRef.classList.add('is-open');
    document.querySelector('.lightbox__image').src = "vfg";
};
    
ulGalleryRef.addEventListener('click', () => { openModal() });