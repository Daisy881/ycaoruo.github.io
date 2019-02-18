const user = {
  state: {
    token: '',
    username: ''
  },
  mutations: {
    SET_STATE: (state, data) => {
      state.token = sessionStorage.getItem('myToken')
      sessionStorage.setItem('username', data.username)
      state.token = data.token
      state.username = data.username
    },
    REMOVE_STATE: state => {
      sessionStorage.removeItem('myToken')
      sessionStorage.removeItem('username')
      state.token = ''
      state.username = ''
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, data) {
      return new Promise(resolve => {
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
