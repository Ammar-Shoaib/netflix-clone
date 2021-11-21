import axios from 'axios'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from './UserActions'

export const getUsers = async(dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await axios.get('/users', {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure())
    }
}

// export const updateMovie = async(movie, dispatch) => {
//     dispatch(updateMovieStart())
//     try {
//         const res = await axios.put('/movies/'+movie._id, movie, {
//             headers: {
//                 token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
//             }
//         })
//         dispatch(updateMovieSuccess(res.data))
//     } catch (error) {
//         dispatch(updateMovieFailure())
//     }
// }

export const deleteUser = async(id, dispatch) => {
    dispatch(deleteUserStart())
    try {
        await axios.delete('/users/'+id, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteUserSuccess(id))
    } catch (error) {
        dispatch(deleteUserFailure())
    }
}