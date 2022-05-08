/* eslint-disable import/extensions */
import {
  keyboardWrapper, keyboardTitle, keyboardTextarea, keyboardDescriptional, keyboardLanguage,
} from './variables.js';
import { Keyboard, keyboardBody } from './keyboard.js';

const getBody = () => {
  keyboardTextarea.classList.add('keyboard__text-area');
  keyboardTextarea.id = 'textarea';
  keyboardTextarea.rows = 5;
  keyboardTextarea.cols = 50;

  keyboardBody.classList.add('keyboard__body');
  keyboardBody.classList.add('keyboard');
  keyboardBody.id = 'keyboard';

  keyboardWrapper.classList.add('wrapper');

  keyboardTitle.innerText = 'RSS Virtual Keybord';
  keyboardTitle.classList.add('keyboard__title');

  keyboardTextarea.classList.add('keyboard__text-area');
  keyboardTextarea.id = 'textarea';
  keyboardTextarea.rows = 5;
  keyboardTextarea.cols = 50;

  keyboardDescriptional.textContent = 'The keyboard was created on the Windows operating system';
  keyboardDescriptional.classList.add('keyboard__descriptional');

  keyboardLanguage.textContent = 'To switch language combination: left ctrl + alt';
  keyboardLanguage.classList.add('keyboard__language');

  document.body.prepend(keyboardWrapper);
  keyboardWrapper.append(keyboardTitle);
  keyboardWrapper.append(keyboardTextarea);
  keyboardWrapper.append(keyboardBody);
  keyboardWrapper.append(keyboardDescriptional);
  keyboardWrapper.append(keyboardLanguage);
};
const changeColor = () => {
  keyboardLanguage.innerHTML += `
<div class="colors"> Change keyboard color
    <input class="colors__input" type="color">
</div>
<div class="colors"> Change page color
    <input class="colors__input2" type="color">
</div>
`;
};

const keyboardContainer = new Keyboard(keyboardBody, keyboardTextarea);
getBody();
keyboardContainer.getKey();
keyboardContainer.keyEventListener();
keyboardContainer.mouseEventListener();
changeColor();

keyboardTextarea.onblur = () => keyboardTextarea.focus();
keyboardTextarea.focus();

const colorsInput = document.querySelector('.colors__input');
const colorsInput2 = document.querySelector('.colors__input2');
colorsInput.addEventListener('input', () => {
  document.querySelector('.keyboard').style.background = colorsInput.value;
});
colorsInput2.addEventListener('input', () => {
  document.body.style.background = colorsInput2.value;
});
