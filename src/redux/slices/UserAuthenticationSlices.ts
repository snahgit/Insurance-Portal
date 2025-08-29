import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserLoginProps } from "../../types/UserInterface";
import type { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

interface UserDataInnerprops {
  email: string;
  name: string;
  _id: string;
}
interface UserDataProps {
  token: string;
  user: UserDataInnerprops;
}
interface UserAuthenticationProps {
  data: UserDataProps;
  loading: boolean;
  error: null | string;
}

export const login = createAsyncThunk(
  "counter/fetchUserData",
  async (userdetails: UserLoginProps, thunkAPI) => {
    const {
      // email,
      // password,
      // userType,
      // userrole,
      // firebaseToken,
      // gRecaptchaResponse,
    } = userdetails;
    try {
      console.log(userdetails);

      // const response = await serviceAxiosInstance.post("/auth/signin", {
      //   email,
      //   password,
      //   userType,
      //   userrole,
      //   firebaseToken,
      //   gRecaptchaResponse,
      // });

      notifications.show({
        color: "green",
        title: "Success",
        message: "Login Successfully",
      });
      localStorage.setItem("snah_token", 'tokem');
      localStorage.setItem("snah_user", JSON.stringify({ "_id": "63f624cf7622256e00005169", "email": "mk.rahulbiswas07@gmail.com", "name": "Oscar Health Insurance" }));
      location.reload();
      return { "_id": "63f624cf7622256e00005169", "email": "mk.rahulbiswas07@gmail.com", "name": "Oscar Health Insurance" };
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Something went wrong",
      });
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const userData = localStorage.getItem("snah_user");
const userDataParse = userData && JSON.parse(userData);

const initialState: UserAuthenticationProps = {
  data: {
    token: localStorage.getItem("snah_token") || "",
    user: userDataParse,
  },
  loading: false,
  error: null,
};

const userAuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("snah_token");
      localStorage.removeItem("snah_user");
      state.data.token = "";
      state.data.user = {
        name: "",
        email: "",
        _id: "",
      };
      //   state.isAuthenticated = false;
      // localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        (state.data = action.payload), (state.error = null);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            (action.payload as string) || "Failed to load user data");
      });
  },
});

export const { logout } = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;
