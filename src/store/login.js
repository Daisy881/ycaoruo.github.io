const user = {
  state: {
    token: '',
    username: '',
    phoneNumber: ''
  },
  mutations: {
    SET_STATE: (state, data) => {
      state.token = sessionStorage.getItem('myToken')
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('phoneNumber', data.phoneNumber)
      state.token = data.token
      state.username = data.username
      state.phoneNumber = data.phoneNumber
    },
    REMOVE_STATE: state => {
      sessionStorage.removeItem('myToken')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('phoneNumber')
      state.token = ''
      state.username = ''
      state.phoneNumber = ''
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, data) {
      return new Promise(resolve => {
        if (!data.username) {
          data.username = data.phoneNumber
        }
        commit('SET_STATE', data)
        resolve()
      })
    },
    // 退出
    LogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('REMOVE_STATE', '')
        resolve()
      })
    }
  }
}

export default user
