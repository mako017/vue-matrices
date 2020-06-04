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
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 2 }"
				id="mat2"
				ref="mat2"
				val="2"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 3 }"
				id="mat3"
				ref="mat3"
				val="3"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 4 }"
				id="mat4"
				ref="mat4"
				val="4"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 5 }"
				id="mat5"
				ref="mat5"
				val="5"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 6 }"
				id="mat6"
				ref="mat6"
				val="6"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 7 }"
				id="mat7"
				ref="mat7"
				val="7"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 8 }"
				id="mat8"
				ref="mat8"
				val="8"
				@click="setSelection"
				@dblclick="clear"
			/>
			<svg
				viewBox="0 0 100 100"
				class="element e-item"
				:class="{ selection: selection == 9 }"
				id="mat9"
				ref="mat9"
				val="9"
				@click="setSelection"
				@dblclick="clear"
			/>
		</div>
		<div class="opt-container">
			<svg viewBox="0 0 100 100" class="element e-opt" id="el0" @click="draw(0)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el1" @click="draw(1)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el2" @click="draw(2)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el3" @click="draw(3)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el4" @click="draw(4)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el5" @click="draw(5)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el6" @click="draw(6)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el7" @click="draw(7)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el8" @click="draw(8)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el9" @click="draw(9)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el10" @click="draw(10)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el11" @click="draw(11)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el12" @click="draw(12)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el13" @click="draw(13)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el14" @click="draw(14)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el15" @click="draw(15)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el16" @click="draw(16)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el17" @click="draw(17)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el18" @click="draw(18)" />
			<svg viewBox="0 0 100 100" class="element e-opt" id="el19" @click="draw(19)" />
		</div>
	</div>
</template>

<script>
import drawSVG from "@/assets/js/drawing.js";
import rCon from "@/assets/js/id-rule.js";
import { mapActions, mapGetters } from "vuex";
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
		...mapActions(["updateItemCode", "resetItemCode", "setItemRules", "setOneSvg"]),
		clear() {
			//erledigt
			const cell = this.selection - 1;
			this.$set(this.code, cell, "00000000000000000000");

			this.resetCellCode(cell);
		},
		draw(el) {
			//erledigt
			const cell = this.selection - 1;
			let helpArr = this.code[cell].split("");
			helpArr[el] = +!parseInt(helpArr[el]);
			this.$set(this.code, cell, helpArr.join(""));

			this.updateItemCode({ cell, el });
		},
		setSelection(e) {
			this.selection = e.target.id[3];
		},
	},
	computed: mapGetters(["currentItem", "itemCodeArr"]),
	mounted() {
		for (let i = 0; i < 20; i++) {
			drawSVG.select("el" + i, i);
		}
	},
	watch: {
		// itemCodeArr: function() {
		// 	drawSVG.clear("mat" + this.selection);
		// 	for (let i = 0; i < this.itemCodeArr[this.selection - 1].split("").length; i++) {
		// 		if (+this.itemCodeArr[this.selection - 1].split("")[i] === 1) drawSVG.select("mat" + this.selection, i);
		// 	}
		// 	const sel = this.selection - 1;
		// 	const svg = drawSVG.getSvg("mat" + this.selection);
		// 	this.setOneSvg({ sel, svg });
		// 	this.setItemRules(rCon.fullTest(this.currentItem.code));
		// },
		// currentItem: function() {
		// 	for (let i = 0; i < 9; i++) {
		// 		drawSVG.clear("mat" + (i + 1));
		// 		for (let j = 0; j < this.itemCodeArr.length; j++) {
		// 			if (+this.itemCodeArr[j] === 1) drawSVG.select("mat" + (i + 1), j);
		// 		}
		// 	}
		// },
		code: function() {
			// erledigt, s.o.
			drawSVG.clear("mat" + this.selection);
			for (let i = 0; i < this.code[this.selection - 1].split("").length; i++) {
				if (+this.code[this.selection - 1].split("")[i] === 1) drawSVG.select("mat" + this.selection, i);
			}
			this.$set(this.item, "code", this.code.join(","));
			this.$set(this.item, "rules", rCon.fullTest(this.item.code));
			let help = [...this.item.svg];
			help[this.selection - 1] = drawSVG.getSvg("mat" + this.selection);
			this.$set(this.item, "svg", [...help]);
		},
		item: function() {
			// erledigt, s.o.
			this.code = this.item.code.split(",");
			for (let i = 0; i < 9; i++) {
				drawSVG.clear("mat" + (i + 1));
				for (let j = 0; j < this.code[i].split("").length; j++) {
					if (+this.code[i].split("")[j] === 1) drawSVG.select("mat" + (i + 1), j);
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
