"use client"
import { ToastOptions } from "react-toastify";

export const ToastConfiguration: ToastOptions = {
  autoClose: 5000,
  closeOnClick: true,
  draggableDirection: "x",
  draggable: true,
  className: "bg-lightModeSecondary dark:bg-darkModeSecondary text-lightModePrimary dark:text-darkModePrimary",
  progressClassName: "bg-yellow-500",
};