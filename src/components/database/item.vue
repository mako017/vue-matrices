<template>
	<div>
		<svg @click="saveSvg" viewBox="0 0 320 320" class="container" :id="'i_' + id">
			<rect width="100" height="100" x="000" y="000" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="110" y="000" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="220" y="000" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="000" y="110" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="110" y="110" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="220" y="110" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="000" y="220" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="110" y="220" fill="#ffffff" stroke="#000000" stroke-width="1" />
			<rect width="100" height="100" x="220" y="220" fill="#ffffff" stroke="#000000" stroke-width="1" />

			<svg width="100" height="100" x="000" y="000" :id="'i_' + id + '_mat1'" />
			<svg width="100" height="100" x="110" y="000" :id="'i_' + id + '_mat2'" />
			<svg width="100" height="100" x="220" y="000" :id="'i_' + id + '_mat3'" />
			<svg width="100" height="100" x="000" y="110" :id="'i_' + id + '_mat4'" />
			<svg width="100" height="100" x="110" y="110" :id="'i_' + id + '_mat5'" />
			<svg width="100" height="100" x="220" y="110" :id="'i_' + id + '_mat6'" />
			<svg width="100" height="100" x="000" y="220" :id="'i_' + id + '_mat7'" />
			<svg width="100" height="100" x="110" y="220" :id="'i_' + id + '_mat8'" />
			<svg width="100" height="100" x="220" y="220" :id="'i_' + id + '_mat9'" />
		</svg>
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
		saveSvg(event) {
			let id = event.target.parentNode.id;
			let name = "Item" + id.replace("mini", "") + ".svg";
			let svgEl = document.getElementById(id);
			svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			var svgData = svgEl.outerHTML;
			var preface = '<?xml version="1.0" standalone="no"?>\r\n';
			var svgBlob = new Blob([preface, svgData], {
				type: "image/svg+xml;charset=utf-8",
			});
			var svgUrl = URL.createObjectURL(svgBlob);
			var downloadLink = document.createElement("a");
			downloadLink.href = svgUrl;
			downloadLink.download = name;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
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
