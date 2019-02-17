const user = {
  state: {
    token: '',
    username: ''
  },
  mutations: {
    SET_STATE: (state, data) => {
      state.token = localStorage.getItem('myToken')
      localStorage.setItem('username', data.username)
      state.token = data.token
      state.username = data.username
    },
    REMOVE_STATE: state => {
      localStorage.removeItem('myToken')
      localStorage.removeItem('username')
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
