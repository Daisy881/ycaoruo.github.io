const loading = {
	state: {
		LOADING: false
	},
	mutations: {
		SHOW_LOADING: (state, boolean) => {
			state.LOADING = boolean
		},
		HIDE_LOADING: (state, boolean) => {
			state.LOADING = boolean
		}
	},
	actions: {
		showLoading({commit}, boolean) {
			commit('SHOW_LOADING', true)
		},
		hideLoading({commit}, boolean) {
			commit('HIDE_LOADING', false)
		}
	}
}
export default loading