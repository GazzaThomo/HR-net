// store.js
import create from "zustand";
import { mockEmployees } from "../mockData/mockEmployees";

const useStore = create((set) => ({
  employees: mockEmployees,
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
}));

export default useStore;
