# Customer Management Dashboard

A modern **Customer Management Dashboard** built with **Angular 20**, designed to
demonstrate scalable frontend architecture, reusable UI components, and
state management using **NgRx Signal Store**.

The application provides features such as **customer management,
analytics visualization, KPI indicators, and dynamic tables with
filtering and search**.

This project follows a **feature-based architecture** and includes
reusable components such as charts, tables, filters, and layout modules.

------------------------------------------------------------------------

# Features

-   Customer entry form with **Reactive Forms**
-   Form validation with proper error handling
-   Data persistence using **LocalStorage**
-   Dynamic **Data Table with Filters, Search, Delete Records and Pagination** features
-   Interactive **Charts using D3.js (Bar, Pie, Lie)** charts
-   Data table filtering by **D3.js Charts using store signals**. 
-   Modular **Feature-based architecture**
-   **State management using NgRx Signals Store**
-   Reusable shared UI components
-   Responsive layout with **TailwindCSS**
-   Angular **Standalone Components**
-   Implemented RBAC support using **canActivate Route Guards** 

------------------------------------------------------------------------

# Tech Stack

-   Angular 20
-   Angular Material
-   NgRx Signal Store
-   NgRx Signal Effects
-   D3.js
-   TailwindCSS
-   RxJS
-   TypeScript

------------------------------------------------------------------------

# Packages Used (Manually Installed)

``` json
{
  "@angular/material": "^20.2.14",
  "@angular/cdk": "^20.2.14",
  "@ngrx/store": "^20.0.1",
  "@ngrx/effects": "^20.1.0",
  "@ngrx/store-devtools": "^20.1.0",
  "@ngrx/signals": "^20.1.0",
  "d3": "^7.9.0",
  "tailwindcss": "^4.2.1",
  "postcss": "^8.5.8",
  "@tailwindcss/postcss": "^4.2.1"
}
```

------------------------------------------------------------------------

# Installation

## 1 Install Node.js

Make sure you have **Node.js 18+** installed.

``` bash
node -v
```

## 2 Clone the Repository

``` bash
git clone <repository-url>
cd management-dashboard
```

## 3 Install Dependencies

``` bash
npm install
```

## 4 Run the Application

``` bash
npm start
```

or

``` bash
ng serve
```

Application will start at:

    http://localhost:4200

------------------------------------------------------------------------

# Project Architecture

The project follows a **clean modular architecture** separating core
services, shared components, and feature modules.

    src/app
    │
    core/
    │
    ├── guards
    ├── models
    ├── services
    ├── types
    └── utils

    features/
    │
    ├── analytics
    ├── customer-form
    ├── dashboard
    └── key-performance-indicator

    layout/
    │
    ├── main-layout
    ├── navbar
    └── sidebar

    shared/
    │
    ├── components
    │   ├── bar-chart
    │   ├── card
    │   ├── data-table
    │   ├── line-chart
    │   ├── pie-chart
    │   ├── table-filters
    │   └── table-search
    │
    └── constants

    store/
    │
    └── global

------------------------------------------------------------------------

# Folder Responsibilities

## Core

Contains **singleton services, models, utilities, and guards** used
across the application.

## Features

Each feature module contains its own:

-   components
-   business logic
-   feature specific UI

Example:

    customer-form
    dashboard
    analytics
    kpi

## Layout

Responsible for **application layout and navigation**.

Components include:

-   Main Layout
-   Sidebar
-   Navbar

## Shared

Reusable UI components used across features.

Examples:

-   Charts
-   Cards
-   Tables
-   Filters
-   Search

## Store

Global state management using **NgRx**.

Handles:

-   Global application state
-   Application State
-   Computed Selectors
-   State Manipulation Methods

------------------------------------------------------------------------

# Charts

Charts are built using **D3.js** and include:

-   Bar Chart
-   Line Chart
-   Pie Chart

Each chart is implemented as a **reusable standalone component**.

------------------------------------------------------------------------

# Data Table Features

The reusable **Data Table component** includes:

-   Dynamic columns
-   Search
-   Filters
-   Sorting
-   Pagination ready structure

------------------------------------------------------------------------

# Development Commands

## Run App

``` bash
npm start
```

## Build App

``` bash
npm run build
```

## Run Tests

``` bash
npm test
```

------------------------------------------------------------------------

# Future Improvements

-   Authentication & Role Based Access
-   Pagination and Server Side APIs
-   Dashboard Widgets Drag & Drop
-   More lazy loaded routes for side nav
-   Export to Excel / CSV
-   Unit Test Coverage Improvement
