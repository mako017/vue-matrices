<template>
	<form>
		<div class="pair">
			<md-switch v-model="settings.useTestTime" class="md-primary">Enable test timelimit</md-switch>
			<label>
				Time limit for complete test:
				<input
					v-model="settings.testTime"
					type="number"
					min="300"
					max="7200"
					value="900"
				/> seconds
			</label>
		</div>
		<div class="pair">
			<md-switch v-model="settings.useItemTime" class="md-primary">Enable item timelimit</md-switch>
			<label>
				Time limit for single items:
				<input
					v-model="settings.itemTime"
					type="number"
					min="5"
					max="300"
					value="60"
				/> seconds
			</label>
		</div>
	</form>
</template>

<script>
import Vue from "vue";
import { MdSwitch } from "vue-material/dist/components";
Vue.use(MdSwitch);
export default {
	name: "settingsForm",
	data() {
		return {
			settings: {
				testID: "defaultTest",
				testTime: 900,
				useTestTime: true,
				displaytestTime: false,
				itemTime: 60,
				useItemTime: false,
				displayItemtime: false,
				displaySolution: true,
			},
		};
	},
};
</script>

<style scoped>
form {
	display: grid;
	grid-template-areas: "itemTime testTime";
	grid-template-columns: 1fr 1fr;
}
.pair {
	display: flex;
	flex-direction: column;
}
</style>