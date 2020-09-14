import {createSlice} from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name: "reminder",
    initialState: {
        reminders : []
    },
    reducers : {
        setReminder : (state, action) => {
            state.reminders = action.payload
        },
        addReminder : (state, action) => {
            state.reminders.push(action.payload);
        }
    }
})

export const {addReminder, setReminder} = reminderSlice.actions;
export default reminderSlice.reducer;