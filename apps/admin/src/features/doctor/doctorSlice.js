import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Initial state of the admin slice
 * @typeof Object { loading, doctorToken, appointments dashboard }
 */
const initialState = {
    loading: false,
    doctorToken: localStorage.getItem("doctorToken") || null,
    appointments: [],
    dashboard: null,
    doctor: null,
};

/**
 * Async Thunks: Actions
 * @function doctorLogin
 * @function doctorAppointments
 * @function completeAppointment
 * @function cancelAppointment
 * @function getDoctorDashboard
 * @function getDoctorProfile
 * @function editDoctorProfile
 */

export const doctorLogin = createAsyncThunk("doctor/doctorLogin", async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/login`,
            credentials,
        );

        if (!data.success) {
            return thunkAPI.rejectWithValue(data.message);
        }

        return data.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const doctorAppointments = createAsyncThunk(
    "doctor/doctorAppointments",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("doctorToken");

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/appointments`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data.response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const completeAppointment = createAsyncThunk(
    "doctor/completeAppointment",
    async (appointmentId, thunkAPI) => {
        try {
            const token = localStorage.getItem("doctorToken");

            const { data } = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/complete-appointment`,
                { appointmentId },
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return appointmentId;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const cancelAppointment = createAsyncThunk(
    "doctor/concelAppointment",
    async (appointmentId, thunkAPI) => {
        try {
            const token = localStorage.getItem("doctorToken");

            const { data } = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/cancel-appointment`,
                { appointmentId },
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return appointmentId;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getDoctorDashboard = createAsyncThunk(
    "doctor/getDoctorDashboard",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("doctorToken");

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/dashboard`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data.response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getDoctorProfile = createAsyncThunk("doctor/getDoctorProfile", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("doctorToken");

        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/profile`,
            { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!data.success) {
            return thunkAPI.rejectWithValue(data.message);
        }

        return data.response;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const editDoctorProfile = createAsyncThunk(
    "doctor/editDoctorProfile",
    async (credentials, thunkAPI) => {
        try {
            const token = localStorage.getItem("doctorToken");

            const { data } = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors/update-profile`,
                credentials,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data.response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const doctorSlice = createSlice({
    name: "doctor",
    initialState,

    reducers: {
        doctorLogout: (state) => {
            state.doctorToken = null;
            localStorage.removeItem("doctorToken");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(doctorLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(doctorLogin.fulfilled, (state, action) => {
                state.doctorToken = action.payload;
                localStorage.setItem("doctorToken", state.doctorToken);
                state.loading = false;
            })
            .addCase(doctorLogin.rejected, (state) => {
                state.loading = false;
            })

            .addCase(doctorAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(doctorAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.loading = false;
            })
            .addCase(doctorAppointments.rejected, (state) => {
                state.loading = false;
            })

            .addCase(completeAppointment.fulfilled, (state, action) => {
                const id = action.payload;
                state.appointments = state.appointments.map((a) =>
                    a._id === id ? { ...a, isCompleted: true } : a,
                );
            })

            .addCase(cancelAppointment.fulfilled, (state, action) => {
                const id = action.payload;
                state.appointments = state.appointments.map((a) =>
                    a._id === id ? { ...a, cancel: true } : a,
                );
            })

            .addCase(getDoctorDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDoctorDashboard.fulfilled, (state, action) => {
                state.dashboard = action.payload;
                state.loading = false;
            })
            .addCase(getDoctorDashboard.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getDoctorProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDoctorProfile.fulfilled, (state, action) => {
                state.doctor = action.payload;
                state.loading = false;
            })
            .addCase(getDoctorProfile.rejected, (state) => {
                state.loading = false;
            })

            .addCase(editDoctorProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(editDoctorProfile.fulfilled, (state, action) => {
                state.doctor = action.payload;
                state.loading = false;
            })
            .addCase(editDoctorProfile.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { doctorLogout } = doctorSlice.actions;
export default doctorSlice.reducer;