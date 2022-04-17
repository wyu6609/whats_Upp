import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
  name: 'currentRoom',
  initialState: {
    value: {
      room: {}, 
      users: [],
      messages: []
    },
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setValue } = roomSlice.actions

export default roomSlice.reducer
