import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for submitting the book form
export const submitBookForm = createAsyncThunk(
  "bookForm/submitBookForm",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().bookForm;
      const formData = new FormData();
      formData.append("bookName", state.bookName);
      formData.append("author", state.authorName);
      if (state.imageFile) formData.append("imageFile", state.imageFile);
      if (state.pdfFile) formData.append("bookFile", state.pdfFile);

      const response = await axios.post("http://localhost:5000/api/uploadBook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data; // will be available in fulfilled action
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  bookName: "",
  authorName: "",
  imageFile: null,
  imagePreview: null,
  pdfFile: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const bookFormSlice = createSlice({
  name: "bookForm",
  initialState,
  reducers: {
    setBookName: (state, action) => {
      state.bookName = action.payload;
    },
    setAuthorName: (state, action) => {
      state.authorName = action.payload;
    },
    setImage: (state, action) => {
      state.imageFile = action.payload.file;
      state.imagePreview = action.payload.preview;
    },
    setPDF: (state, action) => {
      state.pdfFile = action.payload;
    },
    resetForm: (state) => {
      state.bookName = "";
      state.authorName = "";
      state.imageFile = null;
      state.imagePreview = null;
      state.pdfFile = null;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBookForm.pending, (state) => {
        state.status = "loading";
        state.error = null; // clear previous error
      })
      .addCase(submitBookForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null; // ensure error cleared
      })
      .addCase(submitBookForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  setBookName,
  setAuthorName,
  setImage,
  setPDF,
  resetForm,
  clearError,
} = bookFormSlice.actions;

export default bookFormSlice.reducer;

