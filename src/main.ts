import "@fontsource-variable/inter";
import "./style.css";

import {
  capitalCase,
  kebabCase,
  splitSeparateNumbers,
  type Options as CaseOptions,
} from "change-case";
import { createApp, type Component } from "vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import App from "./App.vue";

const views = import.meta.glob<Component>("./views/*.vue", {
  import: "default",
  eager: true,
});

const routes = Object.entries(views).map(([path, component], index) => {
  const name = path.match(/([^\/]+)\.vue/)![1];
  const options: CaseOptions = { split: splitSeparateNumbers };
  return {
    path: `/${kebabCase(name, options)}`,
    component,
    meta: {
      title: capitalCase(name, options),
    },
  } satisfies RouteRecordRaw;
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: routes[0].path,
    },
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

createApp(App).use(router).mount("#app");
