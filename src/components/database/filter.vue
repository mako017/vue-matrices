<template>
	<div class="root">
		<label>
			Item ID
			<input @change="updateFilter" type="text" v-model.number="getFilter.id" />
		</label>
		<label>
			# of Rules
			<select @change="updateFilter" v-model.number="getFilter.rules">
				<option value="0">All</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</label>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "filter",
	methods: {
		...mapActions(["setFilter", "applyFilter"]),
		updateFilter() {
			this.setFilter(this.getFilter);
			this.applyFilter();
		},
	},
	computed: mapGetters(["getFilter"]),
};
</script>

<style scoped>
.root {
	display: flex;
	flex-direction: row;
}
</style>