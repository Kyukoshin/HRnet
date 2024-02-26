import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
  { firstName: "Alice", lastName: "Smith", dateOfBirth: "1988-03-15", startDate: "2019-05-20", department: "Engineering", street: "456 Oak Street", city: "San Francisco", state: "CA", zipCode: "94105" },
  { firstName: "Bob", lastName: "Johnson", dateOfBirth: "1995-09-28", startDate: "2021-02-10", department: "Finance", street: "789 Pine Avenue", city: "Los Angeles", state: "CA", zipCode: "90001" },
  { firstName: "Catherine", lastName: "Williams", dateOfBirth: "1982-12-08", startDate: "2018-07-03", department: "Human Resources", street: "101 Elm Road", city: "Miami", state: "FL", zipCode: "33101" },
  { firstName: "David", lastName: "Jones", dateOfBirth: "1991-06-25", startDate: "2020-11-14", department: "Marketing", street: "202 Maple Lane", city: "Seattle", state: "WA", zipCode: "98101" },
  { firstName: "Eva", lastName: "Miller", dateOfBirth: "1986-02-19", startDate: "2017-04-22", department: "Sales", street: "303 Birch Street", city: "Dallas", state: "TX", zipCode: "75201" },
  { firstName: "Frank", lastName: "Taylor", dateOfBirth: "1993-11-10", startDate: "2022-08-30", department: "Engineering", street: "404 Cedar Avenue", city: "Denver", state: "CO", zipCode: "80202" },
  { firstName: "Grace", lastName: "Anderson", dateOfBirth: "1984-07-14", startDate: "2016-09-18", department: "Finance", street: "505 Walnut Drive", city: "Chicago", state: "IL", zipCode: "60601" },
  { firstName: "Harry", lastName: "Brown", dateOfBirth: "1990-04-03", startDate: "2023-01-25", department: "Human Resources", street: "606 Oak Lane", city: "Atlanta", state: "GA", zipCode: "30301" },
  { firstName: "Ivy", lastName: "Clark", dateOfBirth: "1989-01-07", startDate: "2015-12-12", department: "Marketing", street: "707 Pine Road", city: "New York", state: "NY", zipCode: "10021" },
  { firstName: "Jake", lastName: "Evans", dateOfBirth: "1994-08-29", startDate: "2024-03-08", department: "Sales", street: "808 Elm Street", city: "Boston", state: "MA", zipCode: "02101" },
  { firstName: "Karen", lastName: "Gomez", dateOfBirth: "1987-05-16", startDate: "2017-08-21", department: "Engineering", street: "909 Maple Drive", city: "Austin", state: "TX", zipCode: "78701" },
  { firstName: "Liam", lastName: "Hall", dateOfBirth: "1996-10-02", startDate: "2023-04-17", department: "Finance", street: "101 Pine Lane", city: "Houston", state: "TX", zipCode: "77001" },
  { firstName: "Mia", lastName: "Irwin", dateOfBirth: "1983-03-28", startDate: "2018-11-09", department: "Human Resources", street: "202 Birch Road", city: "Philadelphia", state: "PA", zipCode: "19101" },
  { firstName: "Nathan", lastName: "Johnson", dateOfBirth: "1992-07-12", startDate: "2022-02-26", department: "Marketing", street: "303 Cedar Avenue", city: "San Diego", state: "CA", zipCode: "92101" },
  { firstName: "Olivia", lastName: "Keller", dateOfBirth: "1985-01-23", startDate: "2016-06-14", department: "Sales", street: "404 Elm Street", city: "Portland", state: "OR", zipCode: "97201" },
  { firstName: "Paul", lastName: "Lopez", dateOfBirth: "1993-11-09", startDate: "2024-09-03", department: "Engineering", street: "505 Oak Drive", city: "Phoenix", state: "AZ", zipCode: "85001" },
  { firstName: "Quinn", lastName: "Morgan", dateOfBirth: "1984-06-13", startDate: "2015-10-08", department: "Finance", street: "606 Pine Lane", city: "Detroit", state: "MI", zipCode: "48201" },
  { firstName: "Riley", lastName: "Nelson", dateOfBirth: "1990-04-30", startDate: "2023-02-15", department: "Human Resources", street: "707 Maple Road", city: "Minneapolis", state: "MN", zipCode: "55401" },
  { firstName: "Sophia", lastName: "Owens", dateOfBirth: "1989-02-14", startDate: "2015-12-22", department: "Marketing", street: "808 Birch Lane", city: "Orlando", state: "FL", zipCode: "32801" },
  { firstName: "Tom", lastName: "Perry", dateOfBirth: "1994-09-27", startDate: "2022-05-11", department: "Sales", street: "909 Elm Avenue", city: "Nashville", state: "TN", zipCode: "37201" },
  { firstName: "Uma", lastName: "Quinn", dateOfBirth: "1986-07-18", startDate: "2017-01-20", department: "Engineering", street: "101 Pine Drive", city: "Salt Lake City", state: "UT", zipCode: "84101" },
  { firstName: "Victor", lastName: "Reyes", dateOfBirth: "1991-05-02", startDate: "2020-10-19", department: "Finance", street: "202 Cedar Road", city: "Charlotte", state: "NC", zipCode: "28201" },
  { firstName: "Wendy", lastName: "Smith", dateOfBirth: "1988-08-17", startDate: "2016-04-13", department: "Human Resources", street: "303 Maple Lane", city: "Raleigh", state: "NC", zipCode: "27601" },
  { firstName: "Xavier", lastName: "Taylor", dateOfBirth: "1995-12-10", startDate: "2021-07-28", department: "Marketing", street: "404 Oak Drive", city: "Tampa", state: "FL", zipCode: "33601" },
  { firstName: "Yasmine", lastName: "Upton", dateOfBirth: "1982-03-25", startDate: "2019-09-15", department: "Sales", street: "505 Pine Avenue", city: "Kansas City", state: "MO", zipCode: "64101" },
  { firstName: "Zane", lastName: "Vaughn", dateOfBirth: "1987-09-21", startDate: "2017-11-28", department: "Engineering", street: "606 Cedar Drive", city: "Denver", state: "CO", zipCode: "80201" },
  { firstName: "Amelia", lastName: "Watson", dateOfBirth: "1996-04-06", startDate: "2023-06-22", department: "Finance", street: "707 Oak Road", city: "Seattle", state: "WA", zipCode: "98101" },
  { firstName: "Benjamin", lastName: "Xavier", dateOfBirth: "1983-10-31", startDate: "2018-02-17", department: "Human Resources", street: "808 Pine Lane", city: "San Francisco", state: "CA", zipCode: "94101" },
  { firstName: "Chloe", lastName: "Young", dateOfBirth: "1992-04-14", startDate: "2022-12-09", department: "Marketing", street: "909 Elm Street", city: "Los Angeles", state: "CA", zipCode: "90001" },
  { firstName: "Dylan", lastName: "Zhang", dateOfBirth: "1985-11-29", startDate: "2016-03-25", department: "Sales", street: "101 Pine Drive", city: "Chicago", state: "IL", zipCode: "60601" },
  { firstName: "Ella", lastName: "Adams", dateOfBirth: "1993-06-15", startDate: "2024-01-12", department: "Engineering", street: "202 Cedar Lane", city: "New York", state: "NY", zipCode: "10001" },
  { firstName: "Felix", lastName: "Bennett", dateOfBirth: "1984-01-18", startDate: "2015-07-06", department: "Finance", street: "303 Birch Road", city: "Boston", state: "MA", zipCode: "02101" },
  { firstName: "Gabriella", lastName: "Cruz", dateOfBirth: "1990-07-02", startDate: "2023-03-19", department: "Human Resources", street: "404 Oak Lane", city: "Miami", state: "FL", zipCode: "33101" },
  { firstName: "Harrison", lastName: "Dunn", dateOfBirth: "1989-02-27", startDate: "2015-10-14", department: "Marketing", street: "505 Pine Avenue", city: "Atlanta", state: "GA", zipCode: "30301" },
  { firstName: "Isabella", lastName: "Evans", dateOfBirth: "1994-09-10", startDate: "2022-05-26", department: "Sales", street: "606 Elm Road", city: "Dallas", state: "TX", zipCode: "75201" },
  { firstName: "Jackson", lastName: "Fisher", dateOfBirth: "1986-04-04", startDate: "2017-12-28", department: "Engineering", street: "707 Maple Lane", city: "Phoenix", state: "AZ", zipCode: "85001" },
  { firstName: "Kylie", lastName: "Garcia", dateOfBirth: "1991-12-17", startDate: "2020-09-08", department: "Finance", street: "808 Birch Avenue", city: "Houston", state: "TX", zipCode: "77001" },
  { firstName: "Liam", lastName: "Hudson", dateOfBirth: "1988-08-12", startDate: "2016-05-02", department: "Human Resources", street: "909 Cedar Lane", city: "Charlotte", state: "NC", zipCode: "28201" },
  { firstName: "Mila", lastName: "Irwin", dateOfBirth: "1995-01-25", startDate: "2021-10-14", department: "Marketing", street: "101 Elm Road", city: "Raleigh", state: "NC", zipCode: "27601" },
  { firstName: "Nolan", lastName: "Jenkins", dateOfBirth: "1982-07-18", startDate: "2019-04-01", department: "Sales", street: "202 Pine Drive", city: "Orlando", state: "FL", zipCode: "32801" },
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
