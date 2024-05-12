<template>
  <div class="todos-container">
    <div class="todos-filters">
      <div><SearchOutlined /></div>
      <div><DeleteOutlined /></div>
    </div>
    <div class="todos-list-container">
      <div class="todo-list-header">
        <div class="todo-add-btn">
          <button class="newtask-btn" @click="showModal">+ New Task</button>
        </div>
        <div class="todo-sorts">
          <div>major</div>
          <div>minor</div>
          <div>low</div>
        </div>
      </div>

      <ul class="todo-display custom-bullet">
        <li
          v-for="todo in paginatedTodos(todos)"
          :key="todo.id"
          :class="{ li_completed: todo.completed }"
        >
          <span
            @click="toggleComplete(todo.id)"
            :class="{ completed: todo.completed }"
          >
            {{ todo.text }}
            <div class="sm-date">
              sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}
            </div>
            <div class="todo-details">
              {{ todo.description }}
            </div>
          </span>
          <span
            :class="{
              major: todo.priority === 'major',
              minor: todo.priority === 'minor',
              low: todo.priority === 'low',
            }"
            >{{ todo.priority }}</span
          >
          <div>
            sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}
          </div>
          <span><DeleteOutlined /></span>
        </li>
      </ul>

      <a-pagination
        @change="handlePageChange"
        class="pagination"
        size="small"
        :total="todos.length > 0 ? todos.length : 0"
        :showSizeChanger="false"
        :current="currentPage"
        :pageSize="pageSize"
      />
    </div>
    <a-modal
      class="custom-modal-style"
      v-model:open="openNewTask"
      ok-text="Create Task"
      @ok="handleSubmitTask"
    >
      <p>Some contents.......................</p>
    </a-modal>
  </div>
</template>
<script setup>
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";

import { onMounted, ref } from "vue";
// const todosDummy = ref([
//   {
//     id: 1,
//     text: "Learn Vue.js",
//     description:
//       "Learn the basics of Vue.js and explore its advanced features.",
//     startDate: "2024-05-10",
//     endDate: "2024-05-15",
//     priority: "major",
//     completed: false,
//   },
//   {
//     id: 2,
//     text: "Build a project",
//     description:
//       "Start a new project using Vue.js and implement various functionalities.",
//     startDate: "2024-05-16",
//     endDate: "2024-05-20",
//     priority: "minor",
//     completed: false,
//   },
//   {
//     id: 3,
//     text: "Deploy to production",
//     description:
//       "Prepare the project for deployment and deploy it to a production environment.",
//     startDate: "2024-05-21",
//     endDate: "2024-05-25",
//     priority: "low",
//     completed: true,
//   },
//   {
//     id: 4,
//     text: "Write documentation",
//     description:
//       "Document all the features and functionalities of the project.",
//     startDate: "2024-05-26",
//     endDate: "2024-05-30",
//     priority: "major",
//     completed: false,
//   },
//   {
//     id: 5,
//     text: "Refactor code",
//     description:
//       "Review and improve the existing codebase for better performance and readability.",
//     startDate: "2024-05-31",
//     endDate: "2024-06-05",
//     priority: "minor",
//     completed: false,
//   },
//   {
//     id: 6,
//     text: "Fix bugs",
//     description:
//       "Identify and resolve any bugs or issues reported by users or QA.",
//     startDate: "2024-06-06",
//     endDate: "2024-06-10",
//     priority: "major",
//     completed: false,
//   },
//   {
//     id: 7,
//     text: "Implement new feature",
//     description: "Add a new feature requested by stakeholders or users.",
//     startDate: "2024-06-11",
//     endDate: "2024-06-15",
//     priority: "major",
//     completed: false,
//   },
//   {
//     id: 8,
//     text: "Test new feature",
//     description:
//       "Thoroughly test the newly implemented feature to ensure its functionality.",
//     startDate: "2024-06-16",
//     endDate: "2024-06-20",
//     priority: "minor",
//     completed: false,
//   },
//   // Add more todos as needed
// ]);

const currentPage = ref(1);
const pageSize = ref(5);
const openNewTask = ref(false);

const showModal = () => {
  openNewTask.value = true;
};
const handleSubmitTask = (newTodo) => {
  console.log("newTodo", newTodo);
};

const todos = ref([]);
const toggleComplete = (todoId) => {
  // console.log("toggleComplete");
  const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos.value[todoIndex].completed = !todos.value[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos.value));
  } else {
    return;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
const paginatedTodos = (todos) => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return todos.slice(startIndex, endIndex);
};

onMounted(() => {
  // localStorage.setItem("todos", JSON.stringify(todosDummy.value));
  const getTodos = JSON.parse(localStorage.getItem("todos"));
  todos.value = getTodos;
});
</script>
<style lang="scss">
@import "../styles/todospage.scss";
</style>
