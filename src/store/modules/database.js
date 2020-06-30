import COMM from "@/assets/js/communication.js";
const state = {
	Items: [],
	FilteredItems: [],
	Filter: {
		id: 0,
		rules: 0,
		singleRule: {
			add: false,
			sub: false,
			eka: false,
			sm: false,
			rot: false,
			voll: false,
		},
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
		if (state.Filter.singleRule.add) Items = Items.filter(item => item.rules.add === 1);
		if (state.Filter.singleRule.sub) Items = Items.filter(item => item.rules.sub === 1);
		if (state.Filter.singleRule.eka) Items = Items.filter(item => item.rules.eka === 1);
		if (state.Filter.singleRule.sm) Items = Items.filter(item => item.rules.sm === 1);
		if (state.Filter.singleRule.rot) Items = Items.filter(item => item.rules.rot === 1);
		if (state.Filter.singleRule.voll) Items = Items.filter(item => item.rules.voll === 1);

		console.log(Items);
		commit("mutateFilteredItems", Items);
	},
	async downloadItems({ commit }) {
		let response = await COMM.requestData("readAll");
		commit("mutateItems", response);
	},
	setFilter({ commit }, filter) {
		commit("mutateFilter", filter);
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
