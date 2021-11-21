import axios from "axios";
import { getUsersFailure, getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess } from './AuthActions'

export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('auth/login', user)
        res.data.isAdmin && dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

// export const getUsers = async (dispatch) => {
//     dispatch(getUsersStart())
//     try {
//         const res = await axios.get('/users', {
//             headers: {
//                 token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
//             }
//         })
//         dispatch(getUsersSuccess(res.data))
//     } catch (error) {
//         dispatch(getUsersFailure())
//     }
// }