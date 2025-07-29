import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// *** initial state of the user slice *** //
const initialState = {
  userData: null,
  token: localStorage.getItem("userToken") || null,
  loading: false,
  error: null,
  appointments: [],
  order: null,
};

// action -> user/userSignup
export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
        credentials
      );

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data?.message);
      }

      return data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// action -> user/userLogin
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        credentials
      );

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data?.message);
      }

      return data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// action -> user/getUser
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token)

    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!data?.success) {
      return thunkAPI.rejectWithValue(data?.message);
    }

    return data?.response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// action -> user/updateUserProfile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (credentials, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.patch(
        `
        ${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-profile`,
        credentials,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data?.message);
      }

      return data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// action -> user/appointmentBook
export const appointmentBook = createAsyncThunk(
  "user/appointmentBook",
  async (credentials, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/book-appointment`,
        credentials,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data?.message);
      }

      return data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// action -> user/userAppointments
export const userAppointments = createAsyncThunk(
  "user/userAppointments",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data?.message);
      }

      return data?.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// action -> user/cancelAppointment
export const cancelAppointment = createAsyncThunk(
  "user/cancelAppointment",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/cancel-appointment/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.success) {
        console.log(data?.success);
        return thunkAPI.rejectWithValue(data?.message);
      }

      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("userToken", state.token);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("userToken", state.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(appointmentBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentBook.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(appointmentBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(userAppointments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.appointments = state.appointments.map((a) =>
          a._id === id ? { ...a, cancel: true } : a
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
