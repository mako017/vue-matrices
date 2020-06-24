const state = {
	pages: [],
};

const getters = {
	pages: state => state.pages,
};

const actions = {
	addPage: ({ commit }, newPage) => {
		let newPages = state.pages;
		newPages.push(newPage);
		commit("setPages", newPages);
	},
	movePage: ({ commit }, { page, direction }) => {
		let newPages = state.pages;
		switch (direction) {
			case "up":
				newPages[page - 1] = state.pages[page];
				newPages[page] = state.pages[page - 1];
				break;
			case "down":
				newPages[page + 1] = state.pages[page];
				newPages[page] = state.pages[page + 1];
				break;
		}
		commit("setPages", newPages);
		console.log(state.pages);
	},
	setPages: ({ commit }, newPages) => {
		commit("setPages", newPages);
	},
};

const mutations = {
	setPages: (state, newPages) => (state.pages = [...newPages]),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
