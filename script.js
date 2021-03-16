const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todo-list');
const todos = JSON.parse(localStorage.getItem('todos'))
if(todos){
    todos.forEach(todo=>{
        addToDo(todo);
    });
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addToDo();
});

function addToDo(todo) {
    let todoText = input.value;
    if(todo){
        todoText = todo.content;
        console.log(todo);
    }
    if(todoText){
        const toDo = document.createElement('div');
        toDo.classList.add('todo');
        toDo.innerHTML = `
            <li></li>
            <div class="tools">
                <button class="edit"><i class="fas fa-check"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        const todoEl = toDo.querySelector('li');
        const editBtn = toDo.querySelector('.edit');
        const delBtn = toDo.querySelector('.delete');
        
        console.log(toDo);
        todoEl.innerText = todoText;
        if(todo && todo.completed){
            todoEl.classList.add('completed'); 
        }
        editBtn.addEventListener('click',()=>{
            // console.log(todoEl);
            todoEl.classList.toggle('completed');  
            updateLS();  
        })

        delBtn.addEventListener('click',()=>{
            toDo.remove();
            updateLS();
        })
        
        todosUL.appendChild(toDo);
        updateLS();
        input.value = "";
    }
}

function updateLS() {
    const todoList = document.querySelectorAll('.todo');
    const todos = [];
    todoList.forEach(todo=>{
        const todoEl = todo.querySelector('li');
        todos.push({
            content: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })
    localStorage.setItem('todos',JSON.stringify(todos));
}