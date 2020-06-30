import MD5 from "crypto-js/md5";
import COMM from "@/assets/js/communication.js";
const guestUser = {
	id: null,
	name: "guest",
	authenticated: false,
	status: "guest",
};

const state = {
	user: JSON.parse(localStorage.getItem("userCredentials")) || guestUser,
};

const getters = {
	isAuthenticated: state => state.user.authenticated,
	userName: state => state.user.name,
	userStatus: state => state.user.status,
};

const actions = {
	userLogin: async ({ commit }, { user, pw }) => {
		const hashUser = {
			user,
			password: MD5(pw).toString(),
		};
		console.log(hashUser);
		let response = await COMM.auth(hashUser, "login");
		commit("setUser", response);
		localStorage.setItem("userCredentials", JSON.stringify(state.user));
		console.log(state.user);
	},
	userLogout: ({ commit }) => {
		commit("setUser", guestUser);
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
