// action types
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
        users: [
            /*{id: 0, followed: true, photoUrl: 'https://64.media.tumblr.com/avatar_ce0627a8d453_128.pnj', fullName: 'Rick', status: 'wldd', location: {country: 'USA', city: ''}},
            {id: 1, followed: false, photoUrl: 'https://64.media.tumblr.com/avatar_ce0627a8d453_128.pnj', fullName: 'Jarred', status: '30stm', location: {country: 'USA', city: 'Los-Angeles'}},
            {id: 2, followed: false, photoUrl: 'https://64.media.tumblr.com/avatar_ce0627a8d453_128.pnj', fullName: 'Maloy', status: 'Fuck u', location: {country: 'USA', city: 'Brickleberry'}},*/
        ]
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId) {
                        return {
                            ...u,
                            followed: !u.followed
                        }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
}


export const toggleFollowAC = (userId) => ({type: TOGGLE_FOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})


export default usersReducer;