import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

interface SettingState {
    open: boolean,
    type: string,
    key: string,
    name: string,
}

// Define the initial state using that type
const initialState: SettingState = {
    open: false,
    type: "",
    key: "",
    name: "",
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<SettingState, 'open'>>) => {
      state.open = true
      state.key = action.payload.key
      state.name = action.payload.name
      state.type = action.payload.type
    },
    closeModal: (state) => {
      state.open = false,
      state.type = "",
      state.key = "",
      state.name = ""
    },
   
  },
})

export const { openModal, closeModal } = settingSlice.actions


const store= configureStore({
  reducer: {
    setting: settingSlice.reducer
  },
})
export default store

export const useSettingDispatch: () => typeof store.dispatch = useDispatch
export const useSettingSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector