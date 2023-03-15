
// VARIABLES DEL DOM
const form = document.querySelector('#form');
const todoContainer = document.querySelector('.todo-container');
const count = document.querySelector('#count');

// OPTIONS LINKS
const completed = document.querySelector('#completed');
const active = document.querySelector('#active');
const all = document.querySelector('#all');
const clear = document.querySelector('#clear');

// INDEX DRAG&DROP
let indexStart, indexEnd;
// ARRAY TODOS
let todos = [];
// REGEX VALIDATION
const regex = /[a-zA-Z][a-zA-Z0-9-_ ]{3,32}/;

/*************FUNCTIONS ******************/
// FUNCTION GETLOCALSTORAGE
const getLocalStorage = e => {
    todos = JSON.parse(localStorage.getItem('todosItems')) || [];
    createTodoList(todos);
}
// FUNCTION SETLOCALSTORAGE
const setLocalStorage = e =>{
    localStorage.setItem('todosItems', JSON.stringify(todos));
}
// FUNCTION TO RESET FORM
const resetForm = e => form.reset();
// SHOW MESSAGE
const showMessage = message =>{
    const p = document.createElement('P');
    p.textContent = message;
    p.classList.add('error')
    const mistakes = document.querySelectorAll('.error').length;
    if (mistakes === 0) {
        form.insertAdjacentElement('afterend', p);
        setTimeout(() =>{
            p.remove();
        }, 3000);
    }

}
// CLEAR ALL
const clearAll = e => {
    todos = [];
    createTodoList(todos)
}
// COMPLETED ITEMS
const filterCompleted = e => {
    const todoCompleted = todos.filter(todo => !todo.active);
    createTodoList(todoCompleted);
}
// ACTIVE ITEMS
const filterActive = e => {
    const todoActive = todos.filter(todo => todo.active);
    createTodoList(todoActive);
}
// COMPLETED ITEMS
const filterAll = e => {
    createTodoList(todos)
}
// CLEAN HTML
const cleanHTML = e => {
    while (todoContainer.firstElementChild) {
        todoContainer.removeChild(todoContainer.firstElementChild)
    }
}
// COUNTER ITEMS
const countTodo = todosLength => count.innerHTML = `${todosLength - document.querySelectorAll('.check-button .completed').length} items left`;

// CHECK TODO
const checkTodo = (dataId, checkBtn) =>{
    todos.map(todo => {
        if (dataId === todo.id && todo.active) {
            todo.active = false;
            checkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check completed" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2l4 -4" />
            </svg>`;
            createTodoList(todos);
            return todo;
        } 
        if(dataId === todo.id && !todo.active){
            todo.active = true;
            checkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle active" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"               stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            </svg>`
          createTodoList(todos);
            return todo;
        }
    });
}
// REMOVE TODO
const removeTodo = dataId => {
    todos = todos.filter(todo => todo.id !== dataId);
    createTodoList(todos);
}
const detectEvent = e => {
    const deleteBtn = e.target.closest('.delete-button');
    const checkBtn = e.target.closest('.check-button');
    if (deleteBtn) {
        removeTodo(Number(deleteBtn.dataset.id));
        return;
    }
    if (checkBtn) {
        checkTodo(Number(checkBtn.dataset.id), checkBtn);
        return;
    }
}
const swapItems = (todos, firstIndex, secondIndex) => {
    let aux = todos[firstIndex];
    todos[firstIndex] = todos[secondIndex];
    todos[secondIndex] = aux
    createTodoList(todos);
}
// CREATE LISTTODO
const createTodoList = todos =>{
    cleanHTML();
    todos.forEach((todo, i) => {
        // console.log(i);
        const {name, id, active} = todo;
        const liTodo = document.createElement('LI');
        liTodo.classList.add('todo-lista');
        liTodo.dataset.id = id;
        liTodo.dataset.index = i;
        liTodo.draggable = true
        if (active) {
            liTodo.innerHTML += `
            <button class="delete-button" data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash trash" viewBox="0 0 24 24"
                stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
            <p>${name}</p>
            <button class="check-button active" data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle active" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"               stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                </svg>
            </button>
            `;
        } else {
            liTodo.classList.add('line-through');
            liTodo.innerHTML += `
            <button class="delete-button completed" data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash trash" viewBox="0 0 24 24"
                stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
            <p>${name}</p>
            <button class="check-button" data-id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check completed" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2l4 -4" />
            </svg>
            </button>
            `;
        }
       
        todoContainer.appendChild(liTodo);
        liTodo.addEventListener('click', detectEvent);
        // DRAG & DROP
        liTodo.addEventListener('dragstart', e => {
            e.target.classList.add('dragging');
            indexStart = e.target.closest('.todo-lista').dataset.index;
            // console.log(indexStart);
        });
        liTodo.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        })
        liTodo.addEventListener('dragenter', e => {
            e.target.closest('.todo-lista').classList.add('bg-hover');
        })
        liTodo.addEventListener('dragleave', e => {
            e.target.closest('.todo-lista').classList.remove('bg-hover');
        })
        liTodo.addEventListener('dragover', e => {
            e.preventDefault()
            e.target.closest('.todo-lista').classList.add('bg-hover');
        })
        liTodo.addEventListener('drop', e => {
            e.preventDefault()
            e.target.closest('.todo-lista').classList.remove('bg-hover');
            indexEnd = e.target.closest('.todo-lista').dataset.index;
            // console.log(indexEnd);
            swapItems(todos, indexStart, indexEnd);
        })
        // touch
       
    });
    // console.log(todos);
    countTodo(todos.length);
    setLocalStorage();
}

// CREATE OBJECT
const createObject = name => {
    const todo = {
        name,
        id: Date.now(),
        active: true
    }
    resetForm();
    todos = [...todos, todo]
    createTodoList(todos);
}
// FUNCTION TO VALIDATE FORM
const validateForm = e =>{
    e.preventDefault(); 
    if (e.target.firstElementChild.value.length > 0 && regex.test(e.target.firstElementChild.value)) {
        createObject(e.target.firstElementChild.value);
    } else {
        showMessage('Debe llenar el campo correctamente');
    }
}
// EVENT LISTENERS
const eventListeners = e => {
    document.addEventListener('DOMContentLoaded', e => {
        resetForm(); 
        getLocalStorage()
     });
     form.addEventListener('submit', validateForm);
     completed.addEventListener('click', filterCompleted);
     active.addEventListener('click', filterActive);
     all.addEventListener('click', filterAll);
     clear.addEventListener('click', clearAll);
}

eventListeners()
