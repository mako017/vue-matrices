<template>
	<div class="root">
		<div v-for="(page, index) in pages" :key="index" class="pageContainer">
			<span class="up">↑</span>
			<span class="down">↓</span>
			<fullPagePreview :html="page" class="preview" />
			<button type="button">Insert Test</button>
		</div>
	</div>
</template>

<script>
import fullPagePreview from "@/components/editor/fullPagePreview.vue";
import { mapGetters } from "vuex";
export default {
	components: {
		fullPagePreview,
	},
	computed: mapGetters(["pages"]),
};
</script>

<style scoped>
.root {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
.pageContainer {
	display: grid;
	grid-template-columns: 2% 30vw;
	grid-template-rows: 4fr 4fr 1fr;
	grid-template-areas:
		"up preview"
		"do preview"
		"button button";
	align-items: center;
	justify-items: center;
}

.pageContainer span:hover {
	cursor: pointer;
	background-color: #d9d9d9;
}

.pageContainer .up,
.down {
	justify-self: end;
	font-size: 2rem;
	border: 1px solid #acacac;
	background-color: #ddd;
	padding: 4px;
	margin-right: 3px;
}

.pageContainer .up {
	grid-area: up;
}
.pageContainer .down {
	grid-area: do;
}
.pageContainer .preview {
	grid-area: preview;
}
.pageContainer button {
	grid-area: button;
	justify-self: center;
}
</style>