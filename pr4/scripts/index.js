const editProfileIcon = document.querySelector('.profile__editor');
const addCardIcon = document.querySelector('.profile__add-mesto');
const popupProfile = document.querySelector('#profile-popup');
const popupCards = document.querySelector('#cards-popup');
const popupImageZoom = document.querySelector('#image-popup');
const popupProfileCloseIcon = popupProfile.querySelector('.popup__close');
const popupCardsCloseIcon = popupCards.querySelector('.popup__close');
const popupImageZoomCloseIcon = popupImageZoom.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupProfile.querySelector('.popup__input_item_name');
const nameCardInput = popupCards.querySelector('.popup__input_item_name');
const descriptionInput = popupProfile.querySelector('.popup__input_item_description');
const linkCardInput = popupCards.querySelector('.popup__input_item_description');
const cardsArea = document.querySelector('.cards');

const popupOpen = function (popupName) {
  popupName.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const popupClose = function (popupName) {
  popupName.classList.remove('popup_opened');
}

const addCards = function (name, link) {
  const contentCardTemplate = document.querySelector('#card-template').content;
  const copyCardTemplate = contentCardTemplate.querySelector('.cards__item').cloneNode(true);

  copyCardTemplate.querySelector('.cards__description').textContent = name;
  copyCardTemplate.querySelector('.cards__image').src = link;

  copyCardTemplate.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });

  copyCardTemplate.querySelector('.cards__delete').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  const getZoomImages = function () {
    popupImageZoom.querySelector('.popup__description').textContent = name;
    popupImageZoom.querySelector('.popup__image').src = link;
    popupOpen(popupImageZoom); 
  }

  copyCardTemplate.querySelector('.cards__image').addEventListener('click', getZoomImages);

  return copyCardTemplate;
}

const integrationCard = function (evt) {
  evt.preventDefault();
  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value));
  popupClose(popupCards);
}

const integrationInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsArea.append(addCards(card.name, card.link));
  });
}

integrationInitialCards();

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose(popupProfile);
}

editProfileIcon.addEventListener('click', () => popupOpen(popupProfile));

addCardIcon.addEventListener('click', () => popupOpen(popupCards)); 

popupProfileCloseIcon.addEventListener('click', () => popupClose(popupProfile));

popupCardsCloseIcon.addEventListener('click', () => popupClose(popupCards));

popupImageZoomCloseIcon.addEventListener('click', () => popupClose(popupImageZoom));

popupProfile.addEventListener('submit', formSubmitHandler);

popupCards.addEventListener('submit', integrationCard);
