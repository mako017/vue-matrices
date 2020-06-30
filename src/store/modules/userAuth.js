import MD5 from "crypto-js/md5";
import COMM from "@/assets/js/communication.js";
const state = {
	user: localStorage.getItem("userCredentials") || {
		name: "guest",
		authenticated: false,
		status: "guest",
	},
};

const getters = {};

const actions = {
	userLogin: async ({ commit }, { user, pw }) => {
		const hashUser = {
			user,
			password: MD5(pw).toString(),
		};
		console.log(hashUser);
		let response = await COMM.auth(hashUser, "login");
		commit("setUser", response);
		localStorage.setItem("userCredentials", state.user);
		console.log(state.user);
	},
	userLogout: ({ commit }) => {
		const guest = {
			name: "guest",
			authenticated: false,
			status: "guest",
		};
		commit("setUser", guest);
		localStorage.removeItem("userCredentials");
	},
};

const mutations = {
	setUser: (state, info) => (state.user = info),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
