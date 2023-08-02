import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const token = localStorage.getItem('access_token')


const initialState = {
  MessageList: [],
  ChatRoomList: [],
};

// export const EnterRoom = createAsyncThunk("ChatRoomList/enter", async ({ token }) => {
//   try {
//     const response = await axios.post(`api/v1/chat/${lessonId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error("API 요청에 실패했습니다.");
//   }
// });


// export const Chatting = createAsyncThunk("MessageList/Chatting", async (contents, thunkAPI) => {
//   try {

//     const response = await axios.post(
//       `api/v1/chat/send/${lessonId}`,
//       { userId, lessonId, contents,token },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("API 요청에 실패했습니다.");
//   }
// });

// export const CheckChat = createAsyncThunk("/CheckChat", async ({ lessonId, userId, contents, accessToken }) => {
//   try {
//     const response = await axios.get(
//       `api/v1/chat/send/${lessonId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("API 요청에 실패했습니다.");
//   }
// });

// export const CheckChatList = createAsyncThunk("chat/CheckChatList", async ({token }) => {
//   try {
//     const response = await axios.get(
//       `api/v1/chat/send/${lessonId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("API 요청에 실패했습니다.");
//   }
// });

// export const ChatRoomOut = createAsyncThunk("/ChatRoomOut", async ({ token }) => {
//   try {
//     const response = await axios.delete(
//       `api/v1/chat/send/${lessonId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error("API 요청에 실패했습니다.");
//   }
// });

export const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    Chatting: (state, action) => {
      state.MessageList.push(action.payload.data);
    },
  },
  extraReducers: 
  (builder) => {
    builder.addCase(Chatting.fulfilled, (state, action) => {
      state.MessageList.push(action.payload.data);
    });
  },
});

export const { } = chat.actions;
export default chat.reducer;
