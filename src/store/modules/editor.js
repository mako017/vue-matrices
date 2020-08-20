import COMM from "@/assets/js/communication.js";
const state = {
	pages: [
		{
			id: 0,
			isTest: false,
			html:
				"<h1>Instructions</h1><h2></h2><p>In the following you will work on a test of logical reasoning. In your own interest, please carefully read the instructions for completing the tasks. </p><p>For test fairness and standardization reasons it is not possible to answer any questions regarding the instructions or the test. </p><hr><p>Figure 1 shows an example task. You can see nine cells filled with different figures. Across the <strong><u>cells</u></strong> of a row, the figures follow certain rules. In figure 1, the triangle is rotated by 90° to the right from cell to cell. The last cell is left empty. Your task is to find out which figure has to be placed in this cell. Here, a triangle pointing upwards should be placed in the empty cell. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_001.png'></p>",
		},
		{
			id: 1,
			isTest: false,
			html:
				"<h1>Instructions</h1><h2></h2><p>Figure 2 shows how the solution of the task should be given. You see 20 cells with elements. Your task is to select the elements that constitute the solution of the task. For the upward pointing triangle from the example task, you would have to select this element by mouse click. </p><p> If you want to remove the icon, click again on the selected element. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_002.png'></p>",
		},
		{
			id: 2,
			isTest: false,
			html:
				"<h1>Instructions</h1><h2></h2><p>The construction rules apply <strong>line by line</strong> (left to right) in the matrix. The change of the elements across the <strong>columns</strong> (from top to bottom) <strong>does not</strong> follow any rule. </p><p> In the following, another example from the later test is presented. This illustrates that <em>several rules can occur simultaneously</em>. Due to the rotation of 90° to the right, the triangle pointing to the right should be selected. The corners are added across the line, so the corners at the top right and top left must be selected. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_003.png'></p>",
		},
		{
			id: 3,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Rotation</h2><h3></h3><p> The elements are rotated clockwise or counterclockwise . The rotation is either by 90° or 180°. </p><p></p><p> In the first cell the triangle points upwards. In the second cell, it is rotated by 90° clockwise and points to the right. In the third cell, it has been rotated counter clockwise by another 90° and therefore points downwards. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_004.png'></p>",
		},
		{
			id: 4,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Addition</h2><h3></h3><p> The elements of the first and second cell are combined. The third cell therefore contains both elements. </p><p></p><p> In the first cell the two lower corners are shown, in the second cell the two upper ones. The third cell thus contains all four corners. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_005.png'></p>",
		},
		{
			id: 5,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Subtraction</h2><h3></h3><p> The elements of the second cell are removed from the elements of the first cell, so that only the remaining elements are displayed in the third cell.</p><p></p><p>In the first cell, the boxes on the left, top and right are shown. In the second cell, the box is shown at the top. If the contents of the second cell (upper box) are now removed from the elements of the first cell, the third cell is obtained. The third cell contains two boxes: left and right. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_006.png'></p>",
		},
		{
			id: 6,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Disjunctive Union</h2><h3></h3><p> Elements that are presented in both the first and second cell cancel each other out. The third cell thus contains elements that are either only shown in the first or only in the second cell. .</p><p></p><p> The triangle at the top edge is only shown in the first cell, the triangle at the bottom edge only in the second. These triangles are therefore displayed in the third cell. The triangle at the right margin appears in both the first and second cell and is therefore no longer displayed in the third cell. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_007.png'></p>",
		},
		{
			id: 7,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Intersection</h2><h3></h3><p> In the third cell, the elements that are presented in both the first and second cell appear. </p><p></p><p>The top right and top left corners appear in both the first and second cells and are therefore displayed in the third cell. The other two corners from the first cell are only displayed in this cell and are therefore not displayed in the third cell. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_008.png'></p>",
		},
		{
			id: 8,
			isTest: false,
			html:
				"<h1>Rules</h1><h2>Completeness</h2><h3></h3><p> To solve the task with the help of this rule, the entire matrix and not a single row must be considered. The elements contained in the first and second row must also be shown in the third row. </p><p></p><p>Here the set consists of the elements: empty circle, filled circle and filled rectangle. Each of the rows of the matrix contains all elements of the set. The third cell in the bottom row therefore contains the empty circle. </p><p></p><p><img src='http://lets-test.it/matrices/assets/img/editor/instrcution_graphics_009.png'></p>",
		},
	],
	currentPage: 0,
	currentHTML:
		"<h1>Instruction Page 1</h1><h2>How to use our instructions</h2><h3>Another even smaller header</h3><p>While we want you, to be able to customize all instructions, to your own needs, we can also understand that you might just want to use our pre made instructions. This is totally fine and <strong>you don't need to explicitly ask for our consent</strong>. <em>These instructions have been tested on several samples</em> in the past and have proven to be long enough so an <u>average</u> adult will understand the task at hand.</p><hr><h3>Custom instructions</h3><p>Of course, if you choose to use your own instructions, we want you to have access to the same tools we used. Thus you can freely write your own instructions with HTML and inline CSS. However, please understand that we can't guarantee that your handmade instructions will be displayed properly on all devices. Thus before sending the test link to your sample, make sure to test it on several devices, including smartphones, tablets and notebooks. Also different browsers may display your instructions differently and operating systems such as Android and iOS have differences, too.</p>",
	onlie: false,
	selectedItems: [],
	settings: {
		testID: "defaultTest",
		testTime: 600,
		useTestTime: true,
		displaytestTime: false,
		itemTime: 60,
		useItemTime: false,
		displayItemtime: false,
		displaySolution: true,
	},
};

const getters = {
	currentHTML: state => state.currentHTML,
	currentPage: state => state.currentPage,
	isOnline: state => state.onlie,
	pages: state => state.pages,
	selectedItems: state => state.selectedItems,
	settings: state => state.settings,
};

const actions = {
	activatePage: ({ commit }, page) => {
		commit("setCurrentPage", page);
	},
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
	editPage: ({ commit }, { pos, newPage }) => {
		let newPages = [...state.pages];
		newPages[pos].html = newPage;
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
	selectItem: ({ commit }, item) => {
		let newSelection = [...state.selectedItems];

		if (!newSelection.includes(item)) newSelection.push(item);
		else newSelection = newSelection.filter(el => el !== item);

		commit("setSelectedItems", newSelection);
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
	setCurrentPage: (state, page) => (state.currentPage = page),
	setPages: (state, newPages) => (state.pages = newPages),
	setSelectedItems: (state, newSelection) => (state.selectedItems = newSelection),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
