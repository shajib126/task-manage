import {configureStore} from '@reduxjs/toolkit'
import settingsReducer from './stateSlice/settingSlice'
import taskReducer from './stateSlice/taskSlice'
import summeryReducer from './stateSlice/summeryslice'
import profileReducer from './stateSlice/profileSlice'
export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summery:summeryReducer,
        profile:profileReducer
    }
})