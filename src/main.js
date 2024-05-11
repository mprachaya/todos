import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";

import { createMemoryHistory, createRouter } from "vue-router";
import TodosPage from "./pages/TodosPage.vue";

const routes = [
  { path: "/", component: TodosPage },
  { path: "/todos", component: TodosPage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);

app.use(Antd).use(router).mount("#app");
