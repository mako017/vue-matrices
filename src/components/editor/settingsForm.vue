<template>
	<form>
		<div class="pair">
			<md-switch class="md-primary">Enable item timelimit</md-switch>
			<label>
				Time limit for single items:
				<input type="number" min="5" max="300" value="60" />
			</label>
		</div>
		<div class="pair">
			<md-switch class="md-primary">Enable test timelimit</md-switch>
			<label>
				Time limit for complete test:
				<input type="number" min="300" max="7200" value="900" />
			</label>
		</div>
	</form>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { MdSwitch } from "vue-material/dist/components";
Vue.use(MdSwitch);
export default {
	name: "settingsForm",
	computed: mapGetters(["settings"]),
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