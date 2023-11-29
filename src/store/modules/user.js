import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roles: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
};

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          // const { data } = response;
          // console.log("哈哈，data是啥" + response);
          // console.log(response);
          commit("SET_TOKEN", response.token);
          // console.log("@" + data.token);
          setToken(response.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          // console.log('haha,response is what' + response);
          // const { data } = response;

          // const data = {
          //   roles: ['admin'],
          //   introduction:'admin',
          //   avatar:'',
          //   name: 'admin',
          // }

          // if (!data) {
          //   return reject("Verification failed, please Login again.");
          // }

          // const { name, avatar,roles } = data;

          commit("SET_NAME", response.name);
          commit("SET_AVATAR", response.avatar);
          // commit("SET_ROLES",roles)
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 推出登录，让他不需要调用接口
      // logout(state.token)
        // .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        // })
        // .catch((error) => {
        //   reject(error);
        // });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
