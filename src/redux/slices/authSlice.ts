import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Empleado from "../../entidades/Empleado";

interface UserState {
  empleado: Empleado | null;
  login: boolean;
  loading: boolean;
}

const initialState: UserState = {
  empleado: null,
  login: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmpleado: (state, action: PayloadAction<any>) => {
      state.empleado = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.empleado = null;
    },
    login: (state) => {
      state.login = true;
    },
  },
});

export const { setEmpleado, login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
