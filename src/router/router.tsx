import React, {
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";

import Loading from "@/components/ui/Loading";
import ErrorPage from "@/components/ui/ErrorPage";

// Type definitions
type LazyComponent = LazyExoticComponent<ComponentType<unknown>>;
interface RouteConfig {
  path: string;
  component: LazyComponent;
  children?: RouteConfig[];
}

/**
 * Wraps a lazy component in Suspense with loading indicator
 */
const lazyLoad = (Component: LazyComponent) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

/**
 * Convert RouteConfig array to React Router RouteObject array
 */
const convertToRouteObjects = (routes: RouteConfig[]): RouteObject[] =>
  routes.map(({ path, component, children }) => ({
    path,
    element: lazyLoad(component),
    errorElement: <ErrorPage />,
    ...(children && { children: convertToRouteObjects(children) }),
  }));

/**
 * Auth / public routes (no admin layout)
 */
const authRoutes: RouteObject[] = [
  {
    path: "/signin",
    element: lazyLoad(React.lazy(() => import("@/pages/SignIn"))),
    errorElement: <ErrorPage />,
  },
];

/**
 * Main dashboard routes (each page uses AdminLayout internally)
 */
const mainRoutes: RouteConfig[] = [
  {
    path: "/products",
    component: React.lazy(() => import("@/pages/Products")),
  },
  {
    path: "/add-product",
    component: React.lazy(() => import("@/pages/Products/AddProduct")),
  },
  
  {
    path: "/dashboard",
    component: React.lazy(() => import("@/pages/dashboard")),
  },

];

/**
 * Root-level routes: redirect, main routes, auth, 404
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  ...convertToRouteObjects(mainRoutes),
  ...authRoutes,
  {
    path: "*",
    element: lazyLoad(React.lazy(() => import("@/pages/NotFound"))),
    errorElement: <ErrorPage />,
  },
]);

export default router;
