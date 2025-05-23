"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { StoreHydrator } from "../components/StoreHydrator"; // Adjusted path

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydrator />
      {children}
    </Provider>
  );
}
