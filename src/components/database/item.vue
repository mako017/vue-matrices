<template>
	<div class="container">
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat1'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat2'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat3'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat4'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat5'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat6'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat7'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat8'" />
		<svg viewBox="0 0 100 100" class="element" v-bind:id="'i_' + id + '_mat9'" />
	</div>
</template>

<script>
import drawSVG from "@/assets/js/drawing.js";
export default {
	props: {
		code: Array,
		id: Number,
	},
	methods: {
		fillItem() {
			for (let i = 0; i < 9; i++) {
				drawSVG.clear("i_" + this.id + "_mat" + (i + 1));
				for (let j = 0; j < this.code[i].split("").length; j++) {
					if (+this.code[i].split("")[j] === 1) drawSVG.select("i_" + this.id + "_mat" + (i + 1), j);
				}
			}
		},
	},
	mounted() {
		this.fillItem();
	},
	updated() {
		this.fillItem();
	},
};
</script>

<style scoped>
.container {
	width: 100%;
	height: auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	justify-items: center;
}
.element {
	width: 90%;
	margin: 5% 0;
	background-color: white;
	border: 1px solid black;
}
</style>