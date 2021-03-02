const box = document.getElementById('box');
const copyButton = document.getElementById('copy-button');
const controllersElements = document.getElementsByClassName('controller');

const controllers = [...controllersElements];

controllers.map((controller) => {
  const input = controller.children[0];
  const button = controller.children[1];

  input.addEventListener('input', handleInputChange);
  button.addEventListener('click', (event) => handleButtonClick(event, input));
});

copyButton.addEventListener('click', handleCopyButtonClick);

function handleInputChange({ target }) {
  const attr = snakeToCamel(target.getAttribute('name'));

  changeBoxBorderRadius(attr, `${target.value}px`);
}

function handleButtonClick(event, input) {
  /*
  TODO: try another way to pass 'input' object to this function
  */

  const attr = snakeToCamel(input.getAttribute('name'));

  changeBoxBorderRadius(attr, changeUnit(box.style[attr]));
  event.target.innerText = getUnit(box.style[attr]);
}

function handleCopyButtonClick() {
  const style = `\
  width: ${getComputedStyle(box).width};
  height: ${getComputedStyle(box).height};

  border: ${getComputedStyle(box).border}
  border-radius: ${getComputedStyle(box).borderRadius};
  `;

  copyTextToClipboard(style);
}

// utils
function changeBoxBorderRadius(border, value) {
  box.style[border] = value;
}

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Successfully copied to clipboard!');
    },
    function (err) {
      console.error('Could not copy text: ', err);
    }
  );
}

function snakeToCamel(str) {
  return str.replace(/([-_]\w)/g, (subStr) => subStr.toUpperCase()[1]);
}

function getUnit(string) {
  return string ? string.match(/px|%/) : 'px';
}

function changeUnit(string) {
  const unit = getUnit(string);

  if (unit == 'px') {
    return removeUnit(string) + '%';
  }
  return removeUnit(string) + 'px';
}

function removeUnit(string) {
  return string.match(/\d+/);
}
