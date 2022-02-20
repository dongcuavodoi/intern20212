<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- v-if -->
    <button @click="awesome = !awesome">Toggle</button>

    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <!-- v-for -->
    <ul>
      <li v-bind:key="id" v-for="(value, id, index) in myObject">
        {{ index }}. {{ id }}: {{ value }}
      </li>
    </ul>
    <form v-on:submit.prevent="addNewTodo">
      <label for="new-todo">Add a todo</label>
      <input
        v-model="newTodoText"
        id="new-todo"
        placeholder="E.g. Feed the cat"
      />
      <button>Add</button>
    </form>
    <ul>
      <todo-item
        v-for="(todo, index) in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="todos.splice(index, 1)"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";

export default {
  name: "App",
  components: {
    TodoItem,
  },
  data() {
    return {
      awesome: true,
      myObject: {
        title: "How to do lists in Vue",
        author: "Anonymous author ",
        publishedAt: "2016-04-10 ",
      },
      newTodoText: "",
      todos: [
        {
          id: 1,
          title: "Do the dishes",
        },
        {
          id: 2,
          title: "Take out the trash",
        },
        {
          id: 3,
          title: "Mow the lawn",
        },
      ],
      nextTodoId: 4,
    };
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
      });
      this.newTodoText = "";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
