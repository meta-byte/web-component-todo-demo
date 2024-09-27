class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.todos = [];
  }

  render() {
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "styles.css");

    //The HTML Template for the todo-app component component
    this.shadowRoot.innerHTML = `
        <input type="text" id="todo-input" placeholder="Add a new todo" />
        <button id="add-todo">Add Todo</button>
        <ul id="todo-list"></ul>
    `;

    this.shadowRoot.appendChild(styleLink);

    this.shadowRoot.querySelector("#add-todo").addEventListener("click", () => {
      this.addTodo();
    });
  }

  addTodo() {
    const input = this.shadowRoot.querySelector("#todo-input");
    const todoText = input.value.trim();

    if (todoText) {
      this.todos.push(todoText);
      input.value = "";
      this.updateTodoList();
    }
  }

  updateTodoList() {
    const todoList = this.shadowRoot.querySelector("#todo-list");
    todoList.innerHTML = "";
    this.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo;
      todoList.appendChild(li);
    });
  }
}

customElements.define("todo-app", TodoApp);
