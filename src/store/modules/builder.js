const state = {
  instructions: [
    {
      type: "fullText",
      title: "Instruction Page 1",
      mainContent:
        "<p>This is a fullText page. No images can displayed here, but you can format your text freely.</p> <p><b>You</b> <i>can</i> <u>highlight</u> text</p>",
    },
    {
      type: "centerImage",
      title: "Instruction Page 2",
      mainContent:
        "<p>This is a centerImage page. Here you can display some explanations on top and then display an image</p>",
      img: "https://lets-test.it/matls/1.png",
      subContent:
        "<p>You can also add some text underneath the image if needed.</p> <p>However, keep in mind that your participants might have to scroll a lot if the image is too big</p>",
    },
  ],
};

const getters = {
  allInstructions: state => state.instructions,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
