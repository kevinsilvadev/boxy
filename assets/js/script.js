const box = document.getElementById('box');
const copyButton = document.getElementById('copy-button');

const controllers = [
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

controllers.map(({ name, attr }) => {
  const input = document.getElementsByName(name)[0];
  const button = input.parentElement.children[1];

  input.addEventListener('input', ({ target }) => {
    changeBoxBorderRadius(attr, `${target.value}px`);
  });

  button.addEventListener('click', ({ target }) => {
    changeBoxBorderRadius(attr, changeUnit(box.style[attr]));
    target.innerText = getUnit(box.style[attr]);
  });
});

function changeBoxBorderRadius(border, value) {
  box.style[border] = value;
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
