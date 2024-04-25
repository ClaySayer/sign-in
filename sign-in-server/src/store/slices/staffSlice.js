import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import fs from 'node:fs/promises';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  fetching: false,
  saving: false,
  data: [],
};

export const staffSlice = createAppSlice({
  name: 'staff',
  initialState,
  reducers: create => ({
    signInOut: create.reducer((state, action) => ({
      ...state,
      data: state.data.map(member => {
        if (member.id === action.payload) {
          return { ...member, signedIn: !member.signedIn };
        }
        return member;
      }),
    })),
    fetchStaff: create.asyncThunk(
      async () => {
        const filePath = './data.json';
        const contents = await fs.readFile(filePath, { encoding: 'utf8' });
        return JSON.parse(contents);
      },
      {
        pending: state => {
          state.fetching = true;
        },
        rejected: state => {
          state.fetching = false;
        },
        fulfilled: (state, action) => {
          state.fetching = false;
          state.data = action.payload;
        },
      },
    ),
    serializeStore: create.asyncThunk(
      async (arg, { getState }) => {
        const state = getState();
        await fs.writeFile('./data.json', JSON.stringify(state.staff.data));
      },
      {
        pending: state => {
          state.saving = true;
        },
        rejected: state => {
          state.saving = false;
        },
        fulfilled: state => {
          state.saving = false;
        },
      },
    ),
  }),
  selectors: {
    selectStaff: state => state,
  },
});

export const { signInOut, fetchStaff, serializeStore } = staffSlice.actions;
export const { selectStaff } = staffSlice.selectors;
export default staffSlice.reducer;
