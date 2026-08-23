import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Initial state of the admin slice
 * @typeof Object { loading, error, adminToken, doctors, appointments dashboard }
 */
const initialState = {
    loading: false,
    error: null,
    adminToken: localStorage.getItem("adminToken") || null,
    doctors: [],
    appointments: [],
    dashboard: {},
};

/**
 * Async Thunks: Actions
 * @function adminLogin
 * @function addDoctor
 * @function getAllDoctors
 * @function getAllAppointments
 * @function toggleAvailblity
 * @function cancelAppointment
 */

export const adminLogin = createAsyncThunk("admin/adminLogin", async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/login`,
            credentials,
        );

        if (!data?.success) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        return data?.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addDoctor = createAsyncThunk("admin/addDoctor", async (credentials, thunkAPI) => {
    try {
        const adminToken = localStorage.getItem("adminToken");

        const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/add-doctor`,
            credentials,
            { headers: { Authorization: `Bearer ${adminToken}` } },
        );

        if (!data?.success) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        return data?.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getAllDoctors = createAsyncThunk("admin/getAllDoctors", async (_, thunkAPI) => {
    try {
        const adminToken = localStorage.getItem("adminToken");

        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/all-doctors`,
            { headers: { Authorization: `Bearer ${adminToken}` } },
        );

        if (!data?.success) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        return data?.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getAllAppointments = createAsyncThunk(
    "admin/getAllAppointments",
    async (_, thunkAPI) => {
        try {
            const adminToken = localStorage.getItem("adminToken");

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/all-appointments`,
                { headers: { Authorization: `Bearer ${adminToken}` } },
            );

            if (!data?.success) {
                return thunkAPI.rejectWithValue(data?.message);
            }

            return data?.response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const toggleAvailblity = createAsyncThunk("admin/toggleAvailblity", async (id, thunkAPI) => {
    try {
        const adminToken = localStorage.getItem("adminToken");

        const { data } = await axios.patch(
            `
        ${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/toggle-availblity`,
            { id },
            { headers: { Authorization: `Bearer ${adminToken}` } },
        );

        if (!data?.success) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        return { id, available: data?.response?.available };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getDashboard = createAsyncThunk("admin/getDashboard", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("adminToken");

        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/dashboard`,
            { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!data.success) {
            return thunkAPI.rejectWithValue(data.message);
        }

        return data.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const cancelAppointment = createAsyncThunk(
    "admin/cancelAppointment",
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem("adminToken");

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/cancel-appointment/${id}`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        logout: (state) => {
            state.adminToken = null;
            localStorage.removeItem("adminToken");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.adminToken = action.payload;
                localStorage.setItem("adminToken", state.adminToken);
                state.loading = false;
                state.error = null;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(addDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDoctor.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(toggleAvailblity.fulfilled, (state, action) => {
                const { id, available } = action.payload;
                const doctor = state.doctors.find((doc) => doc._id === id);
                if (doctor) doctor.available = available;
            })

            .addCase(getAllAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.loading = false;
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(cancelAppointment.fulfilled, (state, action) => {
                const id = action.payload;
                state.appointments = state.appointments.map((a) =>
                    a._id === id ? { ...a, cancel: true } : a,
                );
            })

            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.dashboard = action.payload;
                state.loading = false;
            })
            .addCase(getDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;