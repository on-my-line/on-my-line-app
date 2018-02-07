const SET_LOADING = "SET_LOADING"

export const setLoading = loading => ({type: SET_LOADING, loading})

export default function (state = false, action) {
	switch (action.type) {
		case SET_LOADING:
			return action.loading
		default:
			return state
	}
}