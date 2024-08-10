// store.js
import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockEmployees } from "../mockData/mockEmployees";

const useStore = create(
  persist(
    (set) => ({
      employees: mockEmployees,
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    }),
    {
      name: "employee-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
