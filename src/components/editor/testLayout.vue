<template>
	<div class="root">
		<div v-for="(page, index) in pages" :key="index" class="pageContainer">
			<span @click="movePage({ page: index, direction: 'up' })" class="up">↑</span>
			<span @click="deletePage(index)" class="del">X</span>
			<span @click="activatePage(index)" class="edit">E</span>
			<span @click="movePage({ page: index, direction: 'down' })" class="down">↓</span>
			<fullPagePreview v-if="!page.isTest" :html="page.html" class="preview" />
			<testPreview class="preview" v-else />
			<button @click="addTest(index)" type="button">Insert Test</button>
		</div>
	</div>
</template>

<script>
import fullPagePreview from "@/components/editor/fullPagePreview.vue";
import testPreview from "@/components/editor/testPreview.vue";
import { mapGetters, mapActions } from "vuex";
export default {
	components: {
		fullPagePreview,
		testPreview,
	},
	methods: mapActions(["movePage", "deletePage", "addTest", "activatePage"]),
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
	grid-template-columns: 2% 40vw;
	grid-template-rows: 4fr 4fr 4fr 4fr 1.5fr;
	grid-template-areas:
		"up preview"
		"del preview"
		"edit preview"
		"down preview"
		"button button";
	align-items: center;
	justify-items: center;
}

.pageContainer span:hover {
	cursor: pointer;
	background-color: #d9d9d9;
}

.pageContainer .up,
.down,
.del,
.edit {
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
	grid-area: down;
}
.pageContainer .del {
	grid-area: del;
	align-self: end;
}
.pageContainer .edit {
	grid-area: edit;
	align-self: start;
}
.pageContainer .preview {
	grid-area: preview;
}
.pageContainer button {
	grid-area: button;
	justify-self: center;
}
</style>
