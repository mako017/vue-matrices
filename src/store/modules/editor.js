import COMM from "@/assets/js/communication.js";
const state = {
	pages: [
		{
			id: 0,
			isTest: false,
			html:
				"<h1>Instruction Page 1</h1><h2>How to use our instructions</h2><h3>Another even smaller header</h3><p>While we want you, to be able to customize all instructions, to your own needs, we can also understand that you might just want to use our pre made instructions. This is totally fine and <strong>you don't need to explicitly ask for our consent</strong>. <em>These instructions have been tested on several samples</em> in the past and have proven to be long enough so an <u>average</u> adult will understand the task at hand.</p><hr><h3>Custom instructions</h3><p>Of course, if you choose to use your own instructions, we want you to have access to the same tools we used. Thus you can freely write your own instructions with HTML and inline CSS. However, please understand that we can't guarantee that your handmade instructions will be displayed properly on all devices. Thus before sending the test link to your sample, make sure to test it on several devices, including smartphones, tablets and notebooks. Also different browsers may display your instructions differently and operating systems such as Android and iOS have differences, too.</p>",
		},
		{
			id: 1,
			isTest: false,
			html:
				"<h1>Instruction Page 2</h1><p>Explaining a figural matrices task without the use of images can be quite challenging. Thus you can obviously use images for your instructions, too. The way this works is that you provide the software with a link to an image that can be accessed from anywhere on the internet. This link will be entered below the text and displayed centered on the page.</p><img src='https://lets-test.it/matls/1.png'><p>Sometimes being unable to put the image above the text might feel very limiting, thus we also provide the option to add text belows the image. If you continue to the next page, you will be presented with our standard instructions. Once you've finished them, an example test with 5 easy items will follow. As this is just a demonstration of what can be done with our software <strong>no data will be save</strong>d.</p>",
		},
	],
	selectedItems: [],
	settings: {},
};

const getters = {
	pages: state => state.pages,
	selectedItems: state => state.selectedItems,
};

const actions = {
	addPage: ({ commit }, newPage) => {
		let newPages = [...state.pages];
		newPages.push({
			id: state.pages.length,
			isTest: false,
			html: newPage,
		});
		commit("setPages", newPages);
	},
	addTest: ({ commit }, page) => {
		let newPages = [...state.pages];
		newPages.splice(page + 1, 0, {
			id: state.pages.length,
			isTest: true,
		});
		commit("setPages", newPages);
	},
	deletePage: ({ commit }, page) => {
		let newPages = [...state.pages];
		newPages.splice(page, 1);
		commit("setPages", newPages);
	},
	movePage: ({ commit }, { page, direction }) => {
		let newPages = [...state.pages];
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
	},
	selectItem: ({ commit }, id) => {
		let newSelection = [...state.selectedItems];

		if (!newSelection.includes(id)) newSelection.push(id);
		else newSelection = newSelection.filter(el => el !== id);

		commit("setSelectedItems", newSelection);
		console.log(state.selectedItems);
	},
	setPages: ({ commit }, newPages) => {
		commit("setPages", newPages);
	},
	uploadTest: ({ commit }, user) => {
		let testContent = {
			creator: user,
			pages: JSON.stringify(state.pages),
			items: JSON.stringify(state.selectedItems),
			settings: JSON.stringify(state.settings),
		};
		COMM.sendData(testContent, "newTest");
		commit("bla", 0);
	},
};

const mutations = {
	setPages: (state, newPages) => (state.pages = newPages),
	setSelectedItems: (state, newSelection) => (state.selectedItems = newSelection),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
