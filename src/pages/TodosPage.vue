<template>
  <div class="todos-container">
    <div class="todos-filters">
      <div><SearchOutlined /></div>
      <div
        :class="{ activeBin: showBin }"
        @click="showBin = !showBin"
      >
        <DeleteOutlined />
        <div>{{ binCount }}</div>
      </div>
    </div>
    <div class="todos-list-container">
      <div class="todo-list-header">
        <div class="todo-add-btn">
          <button
            class="newtask-btn"
            @click="showModal"
          >
            + New Task
          </button>
        </div>
        <div class="todo-sorts">
          <div
            class="sortShadow"
            :class="{ major: sortType === 'major' }"
            @click="handleSortChange('major')"
          >
            <a>major</a>
          </div>
          <div
            class="sortShadow"
            :class="{ minor: sortType === 'minor' }"
            @click="handleSortChange('minor')"
          >
            <a>minor</a>
          </div>
          <div
            class="sortShadow"
            :class="{ low: sortType === 'low' }"
            @click="handleSortChange('low')"
          >
            <a>low</a>
          </div>
        </div>
      </div>

      <ul
        v-if="!showBin"
        class="todo-display custom-bullet"
      >
        <li
          v-for="todo in paginatedTodos(todosTemp)"
          :key="todo.id"
          :class="{ li_completed: todo.completed }"
        >
          <span
            @click="toggleComplete(todo.id)"
            :class="{ completed: todo.completed }"
          >
            {{ todo.text }}
            <div class="sm-date">sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}</div>
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
          <div>sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}</div>
          <span
            ><div
              role="button"
              @click="handleRemoveToBin(todo.id)"
            >
              <DeleteOutlined /></div
          ></span>
        </li>
      </ul>
      <ul
        v-if="showBin"
        class="todo-display custom-bullet"
      >
        <li
          v-for="todo in paginatedTodos(todosBin, true)"
          :key="todo.id"
        >
          <span>
            {{ todo.text }}
            <div class="sm-date">sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}</div>
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
          <div>sDate&nbsp;{{ todo.startDate }} eDate&nbsp;{{ todo.endDate }}</div>
          <span
            ><div
              role="button"
              @click="handleRedoTask(todo.id)"
            >
              <RedoOutlined /></div
          ></span>
        </li>
      </ul>
      <div v-if="todos">
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
    </div>
    <a-modal
      class="custom-modal-style"
      v-model:open="openNewTask"
      :footer="null"
    >
      <form @submit.prevent="handleSubmitTask">
        <div>
          <label for="text">Text:</label>
          <input
            type="text"
            id="text"
            v-model="form.text"
            required
          />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="form.description"
            required
          ></textarea>
        </div>
        <div>
          <label for="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            v-model="form.startDate"
            required
          />
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            v-model="form.endDate"
            required
          />
        </div>
        <div>
          <label for="priority">Priority:</label>
          <select
            id="priority"
            v-model="form.priority"
            required
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="low">Low</option>
            <!-- Add more options if needed -->
          </select>
        </div>

        <button type="submit">+ Create Task</button>
      </form>
    </a-modal>
  </div>
</template>
<script setup>
import { SearchOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons-vue';

import { onMounted, ref } from 'vue';
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
//     isDeleted: false,
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
//     isDeleted: false,
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
//     isDeleted: false,
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
//     isDeleted: false,
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
//     isDeleted: false,
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
//     isDeleted: false,
//   },
//   {
//     id: 7,
//     text: "Implement new feature",
//     description: "Add a new feature requested by stakeholders or users.",
//     startDate: "2024-06-11",
//     endDate: "2024-06-15",
//     priority: "major",
//     completed: false,
//     isDeleted: false,
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
//     isDeleted: false,
//   },
//   // Add more todos as needed
// ]);

const currentPage = ref(1);
const pageSize = ref(5);
const sortType = ref('');
const openNewTask = ref(false);
const binCount = ref(0);
const showBin = ref(false);
const Initialform = ref({
  id: 0,
  text: '',
  description: '',
  startDate: '',
  endDate: '',
  priority: 'major',
  completed: false,
  isDeleted: false,
});

const form = ref({
  id: 0,
  text: '',
  description: '',
  startDate: '',
  endDate: '',
  priority: 'major',
  completed: false,
  isDeleted: false,
});

const showModal = () => {
  openNewTask.value = true;
};
const handleUpdateBin = () => {
  if (!todosTemp.value) return;
  const binItem = todosTemp.value.filter((todo) => todo.isDeleted);
  todosBin.value = binItem;
};

const handleSubmitTask = () => {
  if (form.value.startDate > form.value.endDate) {
    return alert('End Date cannot be earlier than Start Date.');
  }
  // console.log("Form submitted:", form.value);
  var maxId = 0;
  var updateTodos = [];
  if (todos.value) {
    maxId = Math.max(...todos.value.map((todo) => todo.id));
    form.value.id = maxId;
    updateTodos = [form.value, ...todos.value];
  } else {
    maxId = 1;
    form.value.id = maxId;
    updateTodos.push(form.value);
  }

  todos.value = updateTodos;
  todosTemp.value = updateTodos;
  localStorage.setItem('todos', JSON.stringify(todos.value));
  form.value = Initialform.value;
  openNewTask.value = false;
};

const handleBinCount = () => {
  if (!todos.value) return;
  else {
    const count = todos.value.filter((todo) => todo.isDeleted);
    // console.log(count);
    binCount.value = count.length;
  }
};

const handleRedoTask = (todoId) => {
  if (!todoId) return;
  else {
    const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      const result = confirm('Restore this todo: ' + todos.value[todoIndex].text);
      if (result) {
        todos.value[todoIndex].isDeleted = false;
        todosTemp.value = todos.value;
        handleBinCount();
        handleUpdateBin();
        localStorage.setItem('todos', JSON.stringify(todos.value));
      } else {
        return;
      }
    } else return;
  }
};

const handleRemoveToBin = (todoId) => {
  if (!todoId) return;
  else {
    const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      const result = confirm('Delete this todo: ' + todos.value[todoIndex].text);
      if (result) {
        todos.value[todoIndex].isDeleted = true;
        todosTemp.value = todos.value;
        handleBinCount();
        handleUpdateBin();
        localStorage.setItem('todos', JSON.stringify(todos.value));
      } else {
        return;
      }
    } else return;
  }
};

const todos = ref([]);
const todosTemp = ref([]);
const todosBin = ref([]);
const toggleComplete = async (todoId) => {
  // console.log("toggleComplete");
  const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos.value[todoIndex].completed = !todos.value[todoIndex].completed;
    localStorage.setItem('todos', JSON.stringify(todos.value));
  } else {
    return;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const filteredTodos = (todosArray) => {
  if (!todosArray) {
    return;
  }
  // Partition todos into two arrays based on priority matching sortType
  const [priorityMatch, otherTodos] = todosArray.reduce(
    (acc, todo) => {
      if (todo.priority === sortType.value) {
        acc[0].push(todo);
      } else {
        acc[1].push(todo);
      }
      return acc;
    },
    [[], []]
  );

  // Sort the array with priority matching sortType to the top
  priorityMatch.sort((a, b) => {
    // Implement your sorting logic here for priority matched todos
    return a.priority - b.priority;
  });

  // Concatenate the sorted priority matched todos with other todos
  return priorityMatch.concat(otherTodos);
};

const paginatedTodos = (todosArray, bin) => {
  if (!todosArray) return;
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;

  // console.log("filterTodos", filterTodos);
  if (sortType.value) {
    const sortTodos = filteredTodos(todosArray);
    const filterTodosBySort = sortTodos.filter((todo) => !todo.isDeleted);
    // console.log(filterTodosBySort.slice(startIndex, endIndex));
    return (todosArray.value = filterTodosBySort.slice(startIndex, endIndex));
  } else {
    if (!bin) {
      const filterTodos = todosArray.filter((todo) => !todo.isDeleted);
      // console.log(todosArray);
      return filterTodos.slice(startIndex, endIndex);
    } else {
      return todosArray.slice(startIndex, endIndex);
    }
  }
};

const handleSortChange = (sortName) => {
  if (!sortName) return;
  // console.log(sortName);
  if (sortType.value === sortName) {
    sortType.value = '';
  } else {
    sortType.value = sortName;
  }
  // console.log(sortType.value);
};

onMounted(() => {
  // localStorage.clear();
  // localStorage.setItem("todos", JSON.stringify(todosDummy.value));
  const getTodos = JSON.parse(localStorage.getItem('todos'));
  todos.value = getTodos;
  todosTemp.value = getTodos;
  handleUpdateBin();
  handleBinCount();
});
</script>
<style lang="scss">
@import '../styles/todospage.scss';
</style>
