import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from "./reminderSlice"

export default configureStore({
  reducer: {
    reminders: reminderReducer,
  },
});
