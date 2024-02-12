import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-05-12",
      startDate: "2020-01-01",
      department: "Marketing",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    {
      firstName: "Jack",
      lastName: "Black",
      dateOfBirth: "1992-07-23",
      startDate: "2022-10-12",
      department: "Sales",
      street: "145 Second Street",
      city: "Chicago",
      state: "WN",
      zipCode: "25847",
    },
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    purgeUsers: (state, action) => {
      console.log("Purge ...");
      return initialState;
    },
  },
});

export const { addUser, purgeUsers } = userSlice.actions;
export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
