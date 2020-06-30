<template>
	<div class="root">
		<itemFilter />
		<div class="container">
			<div class="responsive" v-for="(Item, index) in itemChunks[currentChunk]" :key="index">
				<ItemCard :Item="Item" />
			</div>
		</div>
		<div class="navigation">
			<span @click="switchChunk(-1)" class="previous">Previous</span>
			<span @click="switchChunk(1)" class="next">Next</span>
		</div>
	</div>
</template>

<script>
import ItemCard from "@/components/database/mat-card.vue";
import itemFilter from "@/components/database/filter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "database",
	data() {
		return {
			Items: [],
			currentChunk: 0,
		};
	},
	components: {
		ItemCard,
		itemFilter,
	},
	methods: {
		...mapActions(["downloadItems", "applyFilter", "setFilter"]),
		switchChunk(value) {
			if (this.itemChunks[this.currentChunk + value]) this.currentChunk += value;
		},
	},
	computed: {
		...mapGetters(["allDbItems", "itemChunks"]),
	},
	async beforeMount() {
		await this.downloadItems();
		this.applyFilter();
	},
};
</script>

<style scoped>
.container {
	display: grid;
	align-items: center;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, 230px);
}
.navigation {
	display: grid;
	gap: 1rem;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 1.5rem;
}
.navigation > span {
	font-size: 1.5rem;
	font-weight: 500;
	border: 1px solid #292929;
	padding: 0.2rem;
	background-color: #adadad;
	cursor: pointer;
}
.previous {
	justify-self: end;
}
.next {
	justify-self: start;
}
</style>
