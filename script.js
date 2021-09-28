const submitBtn = document.querySelector('[type="submit"]');
const inputText = document.querySelector('[type="text"]');
const editBtn = document.querySelector('.fa-edit');
const listContainer = document.querySelector('.list-container');

const storedData = JSON.parse(localStorage.getItem('myList')) || [];

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
}

function addItem(e) {
  e.preventDefault();

  createList();
  inputText.value = '';
  localStorage.setItem('myList', JSON.stringify(storedData));
  displayList();
}

function createList() {
  const id = Math.random();
  storedData.push({ [id]: inputText.value });
}

function removeItem(ele) {
  const itemId = ele.getAttribute('id');

  for (let i = 0; i < listContainer.children.length; i++) {
    const elementId = listContainer.children[i].children[1].children[1].id;

    if (itemId === elementId) {
      storedData.splice(itemId, 1);
      localStorage.setItem('myList', JSON.stringify(storedData));
    }
  }
  displayList();
}

// On Load
displayList();

submitBtn.addEventListener('click', addItem);
