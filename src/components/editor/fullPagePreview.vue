<template>
	<div class="root" v-html="html"></div>
</template>

<script>
export default {
	name: "fullPagePreview",
	props: {
		html: String,
	},
};
</script>

<style scoped>
.root {
	width: 30vw;
	height: 30vh;
	padding: 0 20%;
	box-shadow: 1px 1px red inset, -1px -1px red inset;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.root >>> p {
	display: flex;
	justify-content: center;
	line-height: calc(1.1rem * 0.3);
}

.root >>> img {
	align-self: center;
	justify-self: center;
	max-height: calc(60vh * 0.3);
	max-width: calc(80% * 0.3);
}

.root >>> p {
	margin: calc(0.5rem * 0.3) 0;
	font-size: calc(1rem * 0.3);
}

.root >>> h1 {
	height: calc(2rem * 0.3);
	font-size: calc(2rem * 0.3);
	font-weight: 600;
	margin: calc(2rem * 0.3) 0;
}
.root >>> h2 {
	height: calc(1.5rem * 0.3);
	font-size: calc(1.5rem * 0.3);
	font-weight: 600;
	margin: calc(1rem * 0.3) 0;
}
.root >>> h3 {
	height: calc(1.2rem * 0.3);
	font-size: calc(1.2rem * 0.3);
	font-weight: 600;
	margin: calc(1rem * 0.3) 0;
}
.root >>> hr {
	width: 100%;
}
</style>