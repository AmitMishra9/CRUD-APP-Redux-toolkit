import {
  createSlice,
  createAsyncThunk,
  asyncThunkCreator,
} from "@reduxjs/toolkit";

// Corrected URL with backticks for template literal
export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
});

export const deletePost = createAsyncThunk("post/deletePosts", async ({}) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return id;
});


export const createPost = createAsyncThunk("post/createPost", async ({ title, body }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) {
    throw new Error("Failed to Create Post");
  }
  
  return response.json();
});




export const updatePost = createAsyncThunk("post/updatePost", async ({ id , title ,body}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) {
    throw new Error("Failed to Create Post");
  }
  
  return response.json();
});


const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    post: null,
    error: null,
    body:'',
    edit:false
  },
  reducers:{
      setEdit:(state,action)=>{
          state.body=action.payload.body;
          state.edit=action.payload.edit
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Correctly assign to post
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Correctly assign to post
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Correctly assign to post
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Correctly assign to post
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

export const {setEdit}=postSlice.actions;
export default postSlice.reducer;
