document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      if (todo.isCompleted) todoItem.classList.add('completed');

      const todoText = document.createElement('span');

      todoText.textContent = todo.text;
      todoText.className = todo.isCompleted ? 'completed' : '';
      todoText.classList.add('todo-text');
      
      if (todo.isEditing) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.className = 'edit-input';

        
        input.addEventListener('blur', () => saveTodoText(todo.id, input.value));
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            saveTodoText(todo.id, input.value);
          }
        });

        todoItem.appendChild(input);
        input.focus();
      } else {
        const controls = document.createElement('div');
        controls.classList.add('todo-controls');

         
          const checkbox = document.createElement('label');
          checkbox.classList.add('custom-checkbox');
          const checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';
          checkboxInput.checked = todo.isCompleted; 
          checkbox.appendChild(checkboxInput);
          const checkmark = document.createElement('span');
          checkmark.classList.add('checkmark');
          checkbox.appendChild(checkmark);

        checkboxInput.addEventListener('change', () => {
          toggleTodoState(todo.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', () => editTodoInline(todo.id));

        controls.append(checkbox, editBtn, deleteBtn);
        todoItem.append(todoText, controls);
      }
     
      todoList.appendChild(todoItem);
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodoText = todoInput.value.trim(); 

    if (newTodoText === '') {
     
      todoInput.classList.add('error-border');
      return;
    }

   
    todoInput.classList.remove('error-border');
    const newTodo = {
      id: new Date().getTime(),
      text: todoInput.value,
      isCompleted: false,
      isEditing: false, 
    };
    todos.push(newTodo);
    todoInput.value = '';
    updateLocalStorage();
    renderTodos();
  };

 todoInput.addEventListener('input', () => {
  if (todoInput.value.trim() !== '') {
    todoInput.classList.remove('error-border');
  }
});
  const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    updateLocalStorage();
    renderTodos();
  };

  const toggleTodoState = (id) => {
    todos = todos.map(todo => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    updateLocalStorage();
    renderTodos();
  };

 
  const editTodoInline = (id) => {
    todos = todos.map(todo => {
      if (todo.id === id) todo.isEditing = true;
      return todo;
    });
    renderTodos();
  };

  
  const saveTodoText = (id, newText) => {
    if (newText.trim() !== '') {
      todos = todos.map(todo => {
        if (todo.id === id) {
          todo.text = newText;
          todo.isEditing = false;
        }
        return todo;
      });
      updateLocalStorage();
      renderTodos();
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  todoForm.addEventListener('submit', addTodo);
  renderTodos();
});
