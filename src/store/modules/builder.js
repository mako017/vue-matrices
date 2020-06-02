const state = {
  item: {
    id: 0,
    code: "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
    svg: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    rules: {
      add: [],
      sub: [],
      eka: [],
      sm: [],
      rot: [],
      voll: [],
    },
  },
  items: [],
  onlineCodes: Array,
  settings: {
    svg: true,
    pdf: false,
    activeView: "construct",
  },

  help: [
    {
      title: "Addition",
      content: "Elements of the first and second cell sum up in the third cell.",
    },
    {
      title: "Subtraction",
      content: "Elements in the second cell are removed from the elements in the first cell. The non-overlapping elements remain in the third cell.",
    },
    {
      title: "Disjunctive Union",
      content: "Only elements that exist either in the first cell OR in the second cell are displayed in the third cell. Identical elements that are in the same position in the first AND second cell are not displayed in the third cell.",
    },
    {
      title: "Intersection",
      content: "In the third cell of a row, only elements overlapping from the first and second cell are displayed.",
    },
    {
      title: "Rotation",
      content: "The element rotates across the cells. The rotation is either clockwise or counterclockwise at an angle of either 90° or 180°.",
    },
    {
      title: "Completeness",
      content: "Each row/column must contain a specific set of elements.",
    },
  ],
};

const getters = {
  allHelp: state => state.help,
  currentItem: state => state.item,
  itemCodeArr: state => state.item.code.split(","),
};

const actions = {
  //Manipulate Item Code
  resetCellCode({ commit }, cell) {
    let codeArray = state.item.code.split(",");
    codeArray[cell] = "00000000000000000000";
    commit("updateItemCode", codeArray.join(","));
  },
  resetItemCode({ commit }) {
    commit("updateItemCode", "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000");
  },
  updateItemCode({ commit }, { cell, el }) {
    let codeArray = state.item.code.split(","); //split item code into array of nine strings
    let cellCode = codeArray[cell].split(""); //split code of active cell into 20 characters
    cellCode[el] = +!parseInt(cellCode[el]); //toggle selected element
    codeArray[cell] = cellCode.join(""); //join the 20 characters
    commit("updateItemCode", codeArray.join(",")); //join all 9 cells and commit the change
  },
  //Manipulate Rules
  setItemRules({ commit }, newRules) {
    commit("updateItemRules", newRules);
  },
  //Manipulate SVG
  setOneSvg({ commit }, { sel, svg }) {
    let newSvg = state.item.svg;
    newSvg[sel] = svg;
    commit("updateItemSvg", newSvg);
  },
};

const mutations = {
  updateItemCode: (state, code) => (state.item.code = code),
  updateItemRules: (state, rules) => (state.item.rules = rules),
  updateItemSvg: (state, svg) => (state.item.svg = svg),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
