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
import { Route as AdminauthRouteImport } from './routes/admin/(auth)/route'
import { Route as AdminauthRegisterImport } from './routes/admin/(auth)/register'
import { Route as AdminauthLoginImport } from './routes/admin/(auth)/login'

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

const AdminauthRouteRoute = AdminauthRouteImport.update({
  id: '/admin/(auth)',
  getParentRoute: () => AdminRoute,
} as any)

const AdminauthRegisterRoute = AdminauthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AdminauthRouteRoute,
} as any)

const AdminauthLoginRoute = AdminauthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AdminauthRouteRoute,
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
    '/admin/(auth)': {
      id: '/admin/(auth)'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminauthRouteImport
      parentRoute: typeof AdminRoute
    }
    '/admin/(auth)/login': {
      id: '/admin/(auth)/login'
      path: '/login'
      fullPath: '/admin/login'
      preLoaderRoute: typeof AdminauthLoginImport
      parentRoute: typeof AdminauthRouteImport
    }
    '/admin/(auth)/register': {
      id: '/admin/(auth)/register'
      path: '/register'
      fullPath: '/admin/register'
      preLoaderRoute: typeof AdminauthRegisterImport
      parentRoute: typeof AdminauthRouteImport
    }
  }
}

// Create and export the route tree

interface AdminauthRouteRouteChildren {
  AdminauthLoginRoute: typeof AdminauthLoginRoute
  AdminauthRegisterRoute: typeof AdminauthRegisterRoute
}

const AdminauthRouteRouteChildren: AdminauthRouteRouteChildren = {
  AdminauthLoginRoute: AdminauthLoginRoute,
  AdminauthRegisterRoute: AdminauthRegisterRoute,
}

const AdminauthRouteRouteWithChildren = AdminauthRouteRoute._addFileChildren(
  AdminauthRouteRouteChildren,
)

interface AdminRouteChildren {
  AdminauthRouteRoute: typeof AdminauthRouteRouteWithChildren
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminauthRouteRoute: AdminauthRouteRouteWithChildren,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminauthRouteRouteWithChildren
  '/admin/login': typeof AdminauthLoginRoute
  '/admin/register': typeof AdminauthRegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminauthRouteRouteWithChildren
  '/admin/login': typeof AdminauthLoginRoute
  '/admin/register': typeof AdminauthRegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/(auth)': typeof AdminauthRouteRouteWithChildren
  '/admin/(auth)/login': typeof AdminauthLoginRoute
  '/admin/(auth)/register': typeof AdminauthRegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/admin' | '/admin/login' | '/admin/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin' | '/admin/login' | '/admin/register'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/admin/(auth)'
    | '/admin/(auth)/login'
    | '/admin/(auth)/register'
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
      "filePath": "admin/(auth)",
      "children": [
        "/admin/(auth)"
      ]
    },
    "/admin/(auth)": {
      "filePath": "admin/(auth)/route.tsx",
      "parent": "/admin",
      "children": [
        "/admin/(auth)/login",
        "/admin/(auth)/register"
      ]
    },
    "/admin/(auth)/login": {
      "filePath": "admin/(auth)/login.tsx",
      "parent": "/admin/(auth)"
    },
    "/admin/(auth)/register": {
      "filePath": "admin/(auth)/register.tsx",
      "parent": "/admin/(auth)"
    }
  }
}
ROUTE_MANIFEST_END */
