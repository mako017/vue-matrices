import COMM from "@/assets/js/communication.js";
const state = {
	Items: [],
	FilteredItems: [],
	Filter: {
		id: 0,
		rules: 1,
	},
};

const getters = {
	getFilter: state => state.Filter,
	allDbItems: state => state.Items,
	allFilteredItems: state => state.FilteredItems,
};

const actions = {
	applyFilter({ commit }) {
		let Items = [...state.Items];
		const sumRules = item => item.rules.add + item.rules.sub + item.rules.eka + item.rules.sm + item.rules.rot + item.rules.voll;

		if (state.Filter.id !== 0) {
			Items = Items.filter(item => item.id === state.Filter.id);
			commit("mutateFilteredItems", Items);
			return 1;
		}
		if (state.Filter.rules !== 0) {
			Items = Items.filter(item => sumRules(item) === state.Filter.rules);
		}
		console.log(Items);
		commit("mutateFilteredItems", Items);
	},
	async downloadItems({ commit }) {
		let response = await COMM.requestData("readAll");
		commit("mutateItems", response);
		// console.log(state.Items);

		// actions.applyFilter();
	},
	setFilter({ commit }, filter) {
		commit("mutateFilter", filter);
		// actions.applyFilter();
	},
};

const mutations = {
	mutateFilter: (state, filter) => (state.Filter = { ...filter }),
	mutateFilteredItems: (state, Items) => (state.FilteredItems = [...Items]),
	mutateItems: (state, Items) => (state.Items = [...Items]),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
