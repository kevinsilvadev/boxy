const box = document.getElementById('box');
const copyButton = document.getElementById('copy-button');

const inputs = [
  {
    name: 'border-radius-top-left',
    attr: 'borderTopLeftRadius',
  },
  {
    name: 'border-radius-top-right',
    attr: 'borderTopRightRadius',
  },
  {
    name: 'border-radius-bottom-left',
    attr: 'borderBottomLeftRadius',
  },
  {
    name: 'border-radius-bottom-right',
    attr: 'borderBottomRightRadius',
  },
];

inputs.map((input) => {
  const element = document.getElementsByName(input.name)[0];
  const button = element.parentElement.children[1];

  element.addEventListener('input', ({ target }) => {
    changeBoxBorderRadius(input.attr, `${target.value}px`);
  });

  button.addEventListener('click', ({ target }) => {
    changeBoxBorderRadius(input.attr, changeUnit(box.style[input.attr]));
    target.innerText = getUnit(box.style[input.attr]);
  });
});

function changeBoxBorderRadius(border, value) {
  box.style[border] = value;
}

function getUnit(string) {
  return string.match(/px|%/);
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
