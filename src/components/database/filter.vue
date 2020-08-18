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
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.add" class="md-primary">Addition</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.sub" class="md-primary">Subtraction</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.eka" class="md-primary">Disjunctive Union</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.sm" class="md-primary">Intersection</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.rot" class="md-primary">Rotation</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.singleRule.voll" class="md-primary">Completeness</md-switch>
		<md-switch @change="updateFilter" v-model="getFilter.selected" class="md-primary">Show selected</md-switch>
	</div>
</template>

<script>
import Vue from "vue";
import { MdSwitch } from "vue-material/dist/components";
Vue.use(MdSwitch);
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

<style scoped lang="scss">
.root {
	display: flex;
	flex-direction: row;
	align-items: center;
	.root > * {
		margin: 0.5% 1%;
	}
}
@media (max-width: 850px) {
	.root {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
