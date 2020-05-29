<template>
  <div class="root">
    <div class="item-container">
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 1 }"
        id="mat1"
        ref="mat1"
        val="1"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 2 }"
        id="mat2"
        ref="mat2"
        val="2"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 3 }"
        id="mat3"
        ref="mat3"
        val="3"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 4 }"
        id="mat4"
        ref="mat4"
        val="4"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 5 }"
        id="mat5"
        ref="mat5"
        val="5"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 6 }"
        id="mat6"
        ref="mat6"
        val="6"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 7 }"
        id="mat7"
        ref="mat7"
        val="7"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 8 }"
        id="mat8"
        ref="mat8"
        val="8"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-item"
        :class="{ selection: selection == 9 }"
        id="mat9"
        ref="mat9"
        val="9"
        @click="setSelection"
        @dblclick="clear"
      ></svg>
    </div>
    <div class="opt-container">
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el0"
        @click="draw(0)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el1"
        @click="draw(1)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el2"
        @click="draw(2)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el3"
        @click="draw(3)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el4"
        @click="draw(4)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el5"
        @click="draw(5)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el6"
        @click="draw(6)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el7"
        @click="draw(7)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el8"
        @click="draw(8)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el9"
        @click="draw(9)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el10"
        @click="draw(10)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el11"
        @click="draw(11)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el12"
        @click="draw(12)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el13"
        @click="draw(13)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el14"
        @click="draw(14)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el15"
        @click="draw(15)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el16"
        @click="draw(16)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el17"
        @click="draw(17)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el18"
        @click="draw(18)"
      ></svg>
      <svg
        viewBox="0 0 100 100"
        class="element e-opt"
        id="el19"
        @click="getSvg"
      ></svg>
    </div>
  </div>
</template>

<script>
import drawSVG from "@/assets/js/drawing.js";
import rCon from "@/assets/js/id-rule.js";
export default {
  props: {
    item: Object,
  },
  data: function() {
    return {
      selection: 1,
      code: this.item.code.split(","),
    };
  },
  methods: {
    clear() {
      console.log(this.$refs.mat1.innerHTML);
      // this.$set(this.code, this.selection-1, "00000000000000000000");
    },
    draw(el) {
      let helpArr = this.code[this.selection - 1].split("");
      helpArr[el] = +!parseInt(helpArr[el]);
      this.$set(this.code, this.selection - 1, helpArr.join(""));
    },
    setSelection(e) {
      this.selection = e.target.id[3];
    },
    getSvg() {
      drawSVG.getSvg("mat1");
    },
  },
  mounted() {
    for (let i = 0; i < 20; i++) {
      drawSVG.select("el" + i, i);
    }
  },
  watch: {
    code: function() {
      drawSVG.clear("mat" + this.selection);
      for (let i = 0; i < this.code[this.selection - 1].split("").length; i++) {
        if (+this.code[this.selection - 1].split("")[i] === 1)
          drawSVG.select("mat" + this.selection, i);
      }
      this.$set(this.item, "code", this.code.join(","));
      this.$set(this.item, "rules", rCon.fullTest(this.item.code));
      let help = [...this.item.svg];
      help[this.selection - 1] = drawSVG.getSvg("mat" + this.selection);
      this.$set(this.item, "svg", [...help]);
    },
    item: function() {
      this.code = this.item.code.split(",");
      for (let i = 0; i < 9; i++) {
        drawSVG.clear("mat" + (i + 1));
        for (let j = 0; j < this.code[i].split("").length; j++) {
          if (+this.code[i].split("")[j] === 1)
            drawSVG.select("mat" + (i + 1), j);
        }
      }
    },
  },
};
</script>

<style scoped>
.root {
  width: 100%;
}

.item-container {
  width: 27vh;
  height: 27vh;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.opt-container {
  width: 36vh;
  height: 45vh;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
}

.element {
  background-color: white;
  margin: 5px;
  border: 1px solid black;
}
.selection {
  border-color: chartreuse;
}
</style>
