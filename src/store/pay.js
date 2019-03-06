import Cookies from 'js-cookie'

const pay = {
	state: {
		price: Cookies.get('price'),
		number: Cookies.get('number')
	},
	mutations: {
		// SET_MINUTES: (state, data) => {
		// 	state.payTimeMinutes = data
		// 	Cookies.set('minutes', data)
		// },
		// SET_SECONDS: (state, data) => {
		// 	state.payTimeSeconds = data
		// 	Cookies.set('seconds', data)
		// },
		SET_PRICE: (state, data) => {
			state.payPrice = data
			Cookies.set('price', data)
		},
		SET_NUMBER: (state, data) => {
			state.orderNumber = data
			Cookies.set('number', data)
		}
	},
	actions: {
		// setMinutes({commit}, data) {
		// 	commit('SET_MINUTES', data)
		// },
		// setSeconds({commit}, data) {
		// 	commit('SET_SECONDS', data)
		// },
		setPrice({commit}, data) {
			commit('SET_PRICE', data)
		},
		setNumber({commit}, data) {
			commit('SET_NUMBER', data)
		}
	}
}
export default pay