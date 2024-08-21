import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import CreateEmployee from "./components/EmployeeAdd";
import EmployeeEditPage from "./components/EmployeeEditPage";
import EmployeeDetail from "./components/EmployeeDetail";
import NavbarComponent from "./components/Navbar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


// Initialize ApolloClient
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

// Create routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarComponent />
        <EmployeeDirectory />
      </>
    ),
  },
  {
    path: "/create",
    element: (
      <>
        <NavbarComponent />
        <CreateEmployee />
      </>
    ),
  },
  {
    path: "/edit-employee/:id",
    element: (
      <>
        <NavbarComponent />
        <EmployeeEditPage />
      </>
    ),
  },
  {
    path: "/employee-details/:id",
    element: (
      <>
        <NavbarComponent />
        <EmployeeDetail />
      </>
    ),
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
