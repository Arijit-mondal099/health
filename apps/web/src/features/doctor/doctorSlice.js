import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// *** initial state of the doctor slice *** //
const initialState = {
    doctors: [],
    loading: false,
    error: null,
};

// exction -> doctor/getAllDoctors
export const getAllDoctors = createAsyncThunk("doctor/getAllDoctors", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctors`);

        if (!data?.success) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        return data?.response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message || "Failed to fetch doctors!");
    }
});

const doctorSlice = createSlice({
    name: "doctor",
    initialState,

    // normal reducers
    reducers: {},

    // async reducers
    extraReducers: (builder) => {
        builder
            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload?.filter((doc) => doc?.available && doc);
                state.loading = false;
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default doctorSlice.reducer;