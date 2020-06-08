<template>
	<div class="root">
		<itemFilter />
		<div class="container">
			<div class="responsive" v-for="(Item, index) in allFilteredItems" :key="index">
				<ItemCard :Item="Item" />
			</div>
		</div>
	</div>
</template>

<script>
import ItemCard from "@/components/database/mat-card.vue";
// import COMM from "@/assets/js/communication.js";
import itemFilter from "@/components/database/filter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "database",
	data() {
		return {
			Items: [],
		};
	},
	components: {
		ItemCard,
		itemFilter,
	},
	methods: {
		...mapActions(["downloadItems", "applyFilter", "setFilter"]),
	},
	computed: mapGetters(["allDbItems", "allFilteredItems"]),
	async beforeMount() {
		await this.downloadItems();
		this.applyFilter();
	},
};
</script>

<style scoped>
.root {
	/* min-height: 100vh; */
}

.container {
	display: grid;
	align-items: center;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, 230px);
}
</style>
