const state = {
	pages: [],
};

const getters = {
	pages: state => state.pages,
};

const actions = {
	addPage: ({ commit }, newPage) => {
		let newPages = state.pages;
		state.pages.push(newPage);
		commit("setPages", newPages);
	},
	setPages: ({ commit }, newPages) => {
		commit("setPages", newPages);
	},
};

const mutations = {
	setPage: (state, newPages) => (state.pages = [...newPages]),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
