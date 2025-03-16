/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as AdminGuestRouteImport } from './routes/admin/_guest/route'
import { Route as AdminAuthenticatedRouteImport } from './routes/admin/_authenticated/route'
import { Route as AdminAuthenticatedIndexImport } from './routes/admin/_authenticated/index'
import { Route as AdminGuestRegisterImport } from './routes/admin/_guest/register'
import { Route as AdminGuestLoginImport } from './routes/admin/_guest/login'
import { Route as AdminAuthenticatedUserIndexImport } from './routes/admin/_authenticated/user/index'

// Create Virtual Routes

const AdminImport = createFileRoute('/admin')()

// Create/Update Routes

const AdminRoute = AdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminGuestRouteRoute = AdminGuestRouteImport.update({
  id: '/_guest',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAuthenticatedRouteRoute = AdminAuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAuthenticatedIndexRoute = AdminAuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminAuthenticatedRouteRoute,
} as any)

const AdminGuestRegisterRoute = AdminGuestRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AdminGuestRouteRoute,
} as any)

const AdminGuestLoginRoute = AdminGuestLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AdminGuestRouteRoute,
} as any)

const AdminAuthenticatedUserIndexRoute =
  AdminAuthenticatedUserIndexImport.update({
    id: '/user/',
    path: '/user/',
    getParentRoute: () => AdminAuthenticatedRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_authenticated': {
      id: '/admin/_authenticated'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAuthenticatedRouteImport
      parentRoute: typeof AdminRoute
    }
    '/admin/_guest': {
      id: '/admin/_guest'
      path: ''
      fullPath: '/admin'
      preLoaderRoute: typeof AdminGuestRouteImport
      parentRoute: typeof AdminImport
    }
    '/admin/_guest/login': {
      id: '/admin/_guest/login'
      path: '/login'
      fullPath: '/admin/login'
      preLoaderRoute: typeof AdminGuestLoginImport
      parentRoute: typeof AdminGuestRouteImport
    }
    '/admin/_guest/register': {
      id: '/admin/_guest/register'
      path: '/register'
      fullPath: '/admin/register'
      preLoaderRoute: typeof AdminGuestRegisterImport
      parentRoute: typeof AdminGuestRouteImport
    }
    '/admin/_authenticated/': {
      id: '/admin/_authenticated/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminAuthenticatedIndexImport
      parentRoute: typeof AdminAuthenticatedRouteImport
    }
    '/admin/_authenticated/user/': {
      id: '/admin/_authenticated/user/'
      path: '/user'
      fullPath: '/admin/user'
      preLoaderRoute: typeof AdminAuthenticatedUserIndexImport
      parentRoute: typeof AdminAuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

interface AdminAuthenticatedRouteRouteChildren {
  AdminAuthenticatedIndexRoute: typeof AdminAuthenticatedIndexRoute
  AdminAuthenticatedUserIndexRoute: typeof AdminAuthenticatedUserIndexRoute
}

const AdminAuthenticatedRouteRouteChildren: AdminAuthenticatedRouteRouteChildren =
  {
    AdminAuthenticatedIndexRoute: AdminAuthenticatedIndexRoute,
    AdminAuthenticatedUserIndexRoute: AdminAuthenticatedUserIndexRoute,
  }

const AdminAuthenticatedRouteRouteWithChildren =
  AdminAuthenticatedRouteRoute._addFileChildren(
    AdminAuthenticatedRouteRouteChildren,
  )

interface AdminGuestRouteRouteChildren {
  AdminGuestLoginRoute: typeof AdminGuestLoginRoute
  AdminGuestRegisterRoute: typeof AdminGuestRegisterRoute
}

const AdminGuestRouteRouteChildren: AdminGuestRouteRouteChildren = {
  AdminGuestLoginRoute: AdminGuestLoginRoute,
  AdminGuestRegisterRoute: AdminGuestRegisterRoute,
}

const AdminGuestRouteRouteWithChildren = AdminGuestRouteRoute._addFileChildren(
  AdminGuestRouteRouteChildren,
)

interface AdminRouteChildren {
  AdminAuthenticatedRouteRoute: typeof AdminAuthenticatedRouteRouteWithChildren
  AdminGuestRouteRoute: typeof AdminGuestRouteRouteWithChildren
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAuthenticatedRouteRoute: AdminAuthenticatedRouteRouteWithChildren,
  AdminGuestRouteRoute: AdminGuestRouteRouteWithChildren,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminGuestRouteRouteWithChildren
  '/admin/login': typeof AdminGuestLoginRoute
  '/admin/register': typeof AdminGuestRegisterRoute
  '/admin/': typeof AdminAuthenticatedIndexRoute
  '/admin/user': typeof AdminAuthenticatedUserIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminAuthenticatedIndexRoute
  '/admin/login': typeof AdminGuestLoginRoute
  '/admin/register': typeof AdminGuestRegisterRoute
  '/admin/user': typeof AdminAuthenticatedUserIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/_authenticated': typeof AdminAuthenticatedRouteRouteWithChildren
  '/admin/_guest': typeof AdminGuestRouteRouteWithChildren
  '/admin/_guest/login': typeof AdminGuestLoginRoute
  '/admin/_guest/register': typeof AdminGuestRegisterRoute
  '/admin/_authenticated/': typeof AdminAuthenticatedIndexRoute
  '/admin/_authenticated/user/': typeof AdminAuthenticatedUserIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/admin/login'
    | '/admin/register'
    | '/admin/'
    | '/admin/user'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin' | '/admin/login' | '/admin/register' | '/admin/user'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/admin/_authenticated'
    | '/admin/_guest'
    | '/admin/_guest/login'
    | '/admin/_guest/register'
    | '/admin/_authenticated/'
    | '/admin/_authenticated/user/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin/_authenticated",
      "children": [
        "/admin/_authenticated",
        "/admin/_guest"
      ]
    },
    "/admin/_authenticated": {
      "filePath": "admin/_authenticated/route.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_authenticated/",
        "/admin/_authenticated/user/"
      ]
    },
    "/admin/_guest": {
      "filePath": "admin/_guest/route.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_guest/login",
        "/admin/_guest/register"
      ]
    },
    "/admin/_guest/login": {
      "filePath": "admin/_guest/login.tsx",
      "parent": "/admin/_guest"
    },
    "/admin/_guest/register": {
      "filePath": "admin/_guest/register.tsx",
      "parent": "/admin/_guest"
    },
    "/admin/_authenticated/": {
      "filePath": "admin/_authenticated/index.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/user/": {
      "filePath": "admin/_authenticated/user/index.tsx",
      "parent": "/admin/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
