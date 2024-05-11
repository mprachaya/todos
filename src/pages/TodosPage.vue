<template>
  <div class="todos-container">
    <div class="todos-filters">filters</div>
    <div class="todos-list-container">
      <div class="todo-list-header">
        <div class="todo-header-label">
          todos list<span>from ... to ..</span>
        </div>
        <div class="todo-add-btn">
          <button class="newtask-btn">+ New Task</button>
        </div>
      </div>

      <ul class="todo-display custom-bullet">
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="{ li_completed: todo.completed }"
        >
          <span
            @click="toggleComplete(todo.id)"
            :class="{ completed: todo.completed }"
          >
            {{ todo.text }}
            <span class="sm-date"
              >sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{
                todo.endDate
              }}</span
            >
          </span>
          <span
            :class="{
              major: todo.priority === 'major',
              minor: todo.priority === 'minor',
              low: todo.priority === 'low',
            }"
            >{{ todo.priority }}</span
          >
          <span
            >sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}</span
          >
          <span><DeleteOutlined /></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { DeleteOutlined } from "@ant-design/icons-vue";

import { onBeforeMount, onMounted, ref } from "vue";

// const todosDummy = ref([
//   {
//     id: 1,
//     text: "Learn Vue.js",
//     startDate: "2024-05-10",
//     endDate: "2024-05-15",
//     priority: "major",
//     completed: false,
//   },
//   {
//     id: 2,
//     text: "Build a project",
//     startDate: "2024-05-16",
//     endDate: "2024-05-20",
//     priority: "minor",
//     completed: false,
//   },
//   {
//     id: 3,
//     text: "Deploy to production",
//     startDate: "2024-05-21",
//     endDate: "2024-05-25",
//     priority: "low",
//     completed: true,
//   },
//   // Add more todos as needed
// ]);

const todos = ref([]);

const toggleComplete = (todoId) => {
  const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos.value[todoIndex].completed = !todos.value[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }
};

onMounted(() => {
  const getTodos = JSON.parse(localStorage.getItem("todos"));
  todos.value = getTodos;
});
</script>
<style lang="scss">
@import "../styles/todospage.scss";
</style>
