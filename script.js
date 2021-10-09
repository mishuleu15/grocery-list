const submitBtn = document.querySelector('[type="submit"]');
const inputText = document.querySelector('[type="text"]');
const editBtn = document.querySelector('.fa-edit');
const container = document.querySelector('.container');
const listContainer = document.querySelector('.list-container');

const storedData = JSON.parse(localStorage.getItem('myList')) || [];

function removeAllItems() {
  localStorage.removeItem('myList');
  location.reload();
}

const h3 = document.createElement('h3');
function addClearItemsBtn() {
  h3.textContent = 'Clear Items';
  h3.classList.add('remove-all');
  container.appendChild(h3);
}

function removeClearItemsBtn() {
  if (container.lastElementChild.textContent === 'Clear Items') {
    container.removeChild(h3);
  }
}

function checkData() {
  if (storedData.length > 0) {
    addClearItemsBtn();
  } else {
    removeClearItemsBtn();
  }
}

function displayList() {
  listContainer.innerHTML = '';
  storedData.forEach((el, index) => {
    let ele = Object.values(el);
    const div = `<div class="list">
    <span>${ele}</span>
    <div class="edit-delete">
      <i class="fas fa-edit"></i>
      <i class="fas fa-trash-alt" onclick="removeItem(this)" id=${index}></i>
    </div>
  </div>`;

    listContainer.innerHTML += div;
  });
  checkData();
}

function addItem(e) {
  e.preventDefault();

  // Check if value entered
  if (inputText.value === '') {
    const p = document.createElement('p');
    p.textContent = 'Please Enter Value';
    container.appendChild(p);
    setTimeout(() => {
      container.removeChild(p);
      submitBtn.disabled = false;
    }, 1000);
    submitBtn.disabled = true;
  } else {
    createList();

    inputText.value = '';
    localStorage.setItem('myList', JSON.stringify(storedData));
    displayList();

    const p = document.createElement('p');
    p.textContent = 'Item Added';
    p.classList.add('add-item');
    container.appendChild(p);
    setTimeout(() => {
      container.removeChild(p);
    }, 1000);
  }
}

function createList() {
  const id = Math.random();
  storedData.push({ [id]: inputText.value });
}

function removeItem(ele) {
  const selectedItemId = ele.getAttribute('id');

  for (let i = 0; i < listContainer.children.length; i++) {
    const elementId = listContainer.children[i].children[1].children[1].id;

    if (selectedItemId === elementId) {
      storedData.splice(selectedItemId, 1);
      localStorage.setItem('myList', JSON.stringify(storedData));
    }
  }

  displayList();
  const p = document.createElement('p');
  p.textContent = 'Item Removed';
  container.appendChild(p);
  setTimeout(() => {
    container.removeChild(p);
  }, 1000);
}

// On Load
displayList();
checkData();

submitBtn.addEventListener('click', addItem);
h3.addEventListener('click', removeAllItems);
