import { createRouter, createWebHistory } from "vue-router";

import TaskIndex from "/src/pages/Task/Index.vue";
import TaskCreate from "/src/pages/Task/Create.vue";
import TaskEdit from "/src/pages/Task/Edit.vue";

const routes = [
  {
    path: "/",
    component: TaskIndex,
    name: "task.index",
  },
  {
    path: "/create",
    component: TaskCreate,
    name: "task.create",
  },
  {
    path: "/edit",
    component: TaskEdit,
    name: "task.edit",
    props: true,
  },
  // Fallback route, matches any route that doesn't exist
  {
    path: "*",
    component: TaskIndex,
    name: "task.index",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
