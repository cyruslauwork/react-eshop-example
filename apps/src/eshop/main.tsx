import React from "react";
import ReactDOM from "react-dom/client";
import { EShop } from "./eshop";
import { Navbar } from "./navbar";
// import Library from "./lib";

const ComponentType = {
  EShop: "eshop",
  Navbar: "navbar",
  // Library: "lib",
};

// Render the component based on the component type
export function renderComponent(componentType, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    ReactDOM.createRoot(element).render(
      <React.StrictMode>{getComponent(componentType)}</React.StrictMode>
    );
  }
}

// Helper function to get the component based on the component type
function getComponent(componentType) {
  switch (componentType) {
    case ComponentType.EShop:
      return <EShop />;
    case ComponentType.Navbar:
      return <Navbar />;
    // case ComponentType.Library:
    //   return <Library />;
    default:
      throw new Error(`Invalid component type: ${componentType}`);
  }
}
