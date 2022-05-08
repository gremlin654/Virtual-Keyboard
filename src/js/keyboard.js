/* eslint-disable import/extensions */
import keyObjEng from './keyEng.js';
import keyObjRus from './keyRus.js';

const keyboardBody = document.createElement('div');

class Keyboard {
  constructor(keyboard, textarea) {
    this.keyboard = keyboard;
    this.textarea = textarea;
    this.layout = localStorage.getItem('language') === 'rus' ? 'rus' : 'eng';
    this.keys = [];
    this.flagKey = false;
    this.flagMouse = false;
  }

  getKey() {
    for (let i = 0; i < keyObjEng.length; i += 1) {
      for (let j = 0; j < keyObjEng[i].length; j += 1) {
        const key = document.createElement('div');
        key.classList.add('keyboard__key', 'key', keyObjEng[i][j].code);
        key.id = keyObjEng[i][j].code;
        key.setAttribute('caseDown-eng', keyObjEng[i][j].caseDown);
        key.setAttribute('caseDown-rus', keyObjRus[i][j].caseDown);
        key.setAttribute('caseUp-eng', keyObjEng[i][j].caseUp);
        key.setAttribute('caseUp-rus', keyObjRus[i][j].caseUp);
        key.setAttribute('description-eng', keyObjEng[i][j].description);
        key.setAttribute('description-rus', keyObjRus[i][j].description);
        key.textContent = this.layout === 'eng' ? keyObjEng[i][j].caseDown : keyObjRus[i][j].caseDown;
        keyboardBody.append(key);
        this.keys.push(key);
      }
    }
  }

  insertText(text, opt) {
    let start = this.textarea.selectionStart;
    let end = this.textarea.selectionEnd;
    if (this.textarea.selectionStart === this.textarea.selectionEnd) {
      if (opt === 'Delete') end += 1;
      else if (opt === 'Backspace') start = Math.max(0, start - 1);
    }
    if (opt === 'Delete' || opt === 'Backspace') {
      this.textarea.setRangeText('', start, end);
    } else this.textarea.setRangeText(text);
    this.textarea.selectionStart = start + text.length;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  upText(noCaps) {
    this.keys.forEach((element) => {
      const key = element;
      if (noCaps || key.getAttribute('description-eng') === 'letter') {
        const atr = key.getAttribute('caseDown-eng');
        key.setAttribute('caseDown-eng', key.getAttribute('caseUp-eng'));
        key.setAttribute('caseUp-eng', atr);
      }
      if (noCaps || key.getAttribute('description-rus') === 'letter') {
        const atr = key.getAttribute('caseDown-rus');
        key.setAttribute('caseDown-rus', key.getAttribute('caseUp-rus'));
        key.setAttribute('caseUp-rus', atr);
      }
      key.innerText = this.layout === 'eng' ? key.getAttribute('caseDown-eng') : key.getAttribute('caseDown-rus');
    });
  }

  keyEventListener() {
    document.addEventListener('keydown', (e) => {
      const keyId = document.getElementById(e.code);
      if (keyId) {
        keyId.classList.add('active');
        e.preventDefault();
        const descriptionEng = keyId.getAttribute('description-eng');
        if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) this.upText(true);
        else if (e.code === 'CapsLock' && !e.repeat) {
          this.upText(false);
          if (this.flagKey) keyId.classList.remove('active');
          this.flagKey = !this.flagKey;
        } else if (e.ctrlKey && e.altKey) {
          this.layout = this.layout === 'rus' ? 'eng' : 'rus';
          localStorage.setItem('language', this.layout);
          this.keys.forEach((element) => {
            if (this.layout === 'eng') {
              const keyArr = element;
              keyArr.innerText = element.getAttribute('caseDown-eng');
            } else if (this.layout === 'rus') {
              const keyArr = element;
              keyArr.innerText = element.getAttribute('caseDown-rus');
            }
          });
        } else if (e.code === 'Tab') this.insertText('    ');
        else if (e.code === 'Backspace') this.insertText('', 'Backspace');
        else if (e.code === 'Enter') this.insertText('\n');
        else if (e.code === 'Delete') this.insertText('', 'Delete');
        else if (descriptionEng !== 'function') this.insertText(keyId.textContent);
      }
    });

    document.addEventListener('keyup', (e) => {
      const keyId = document.getElementById(e.code);
      if (keyId) {
        if (e.code !== 'CapsLock') keyId.classList.remove('active');
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.upText(true);
      }
    });
  }

  mouseEventListener() {
    this.keyboard.addEventListener('mousedown', (e) => {
      if (!e.target.classList.contains('keyboard__body')) {
        const keyDown = new KeyboardEvent('keydown', {
          code: e.target.id,
        });
        document.dispatchEvent(keyDown);
        this.flagMouse = true;
      }
    });

    this.keyboard.addEventListener('mouseup', (e) => {
      const eventKeyUp = new KeyboardEvent('keyup', { code: e.target.id });
      document.dispatchEvent(eventKeyUp);
      this.flagMouse = false;
    });

    this.keyboard.addEventListener('mouseout', (e) => {
      if (this.flagMouse) {
        const keyUp = new KeyboardEvent('keyup', {
          code: e.target.id,
        });
        document.dispatchEvent(keyUp);
      }
    });
  }
}

export { Keyboard, keyboardBody };
