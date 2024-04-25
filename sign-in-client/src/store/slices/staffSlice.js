import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
const initialState = [];

const signInOutReducer = (state, action) =>
  state.map(member => {
    if (member.id !== action.payload) {
      return member;
    }
    return { ...member, signedIn: !member.signedIn };
  });

export const staffSlice = createAppSlice({
  name: 'staff',
  initialState,
  reducers: create => ({
    signInOut: create.reducer(signInOutReducer),
    serverSignInOut: create.reducer(signInOutReducer),
    fetchStaffSuccess: create.reducer((state, action) => {
      console.log('fetch succeded');
    }),
    pushStaff: create.reducer((state, action) => action.payload.slice()),
  }),
});

export const { signInOut, serverSignInOut, fetchStaffSuccess, pushStaff } =
  staffSlice.actions;

export default staffSlice.reducer;
