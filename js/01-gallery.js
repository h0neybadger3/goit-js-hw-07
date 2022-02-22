import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
let modal;

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
        <div  class="gallery__item">
        <a class="gallery__link" href="large-image.jpg">
            <img
                class="gallery__image"
                src='${preview}'
                data-source='${original}'
                alt='${description}'
            />
        </a>
        </div>
        `;
        })
        .join('');
}

function onGalleryContainerClick(e) {
    e.preventDefault();
    const currentEl = e.target;
    if (currentEl.nodeName !== 'IMG') {
        return;
    }

    createModal(currentEl);
}

function createModal(currentEl) {
    modal = basicLightbox.create(
        `
        <div class="modal">
            <img width="1100" height="700" src="${currentEl.dataset.source}">
        </div>
        `
    );

    onOpenModal(modal);
}

function onOpenModal(modal) {
    modal.show();
    window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    modal.close();
}

function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;
    if (isEscKey) {
        onCloseModal();
    }
}
