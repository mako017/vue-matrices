<template>
	<div class="root">
		<div class="html-container" v-html="html"></div>
		<button>Continue</button>
	</div>
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
	width: 40vw;
	height: 40vh;
	padding: 0 20%;
	box-shadow: 1px 1px red inset, -1px -1px red inset;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: justify;
	overflow-y: auto;
}

.root > button {
	font-size: 0.4rem;
	height: 0.6rem;
	padding: 0;
	margin: auto 0 0.2rem 0;
}

.html-container >>> img {
	max-height: calc(60vh * 0.4);
	max-width: calc(80% * 0.4);
}

.html-container >>> p {
	line-height: calc(1.1rem * 0.4);

	font-size: calc(1rem * 0.4);
	text-align: justify;
}

.html-container >>> h1 {
	height: calc(2rem * 0.4);
	font-size: calc(2rem * 0.4);
	font-weight: 600;
	margin: calc(2rem * 0.4) 0;
	text-align: center;
}
.html-container >>> h2 {
	height: calc(1.5rem * 0.4);
	font-size: calc(1.5rem * 0.4);
	font-weight: 600;
	margin: calc(1rem * 0.4) 0;
	text-align: center;
}
.html-container >>> h3 {
	height: calc(1.2rem * 0.4);
	font-size: calc(1.2rem * 0.4);
	font-weight: 600;
	margin: calc(1rem * 0.4) 0;
	text-align: center;
}
.html-container >>> hr {
	width: 100%;
}

.html-container >>> strong {
	font-weight: bold;
}
.html-container >>> em {
	font-style: italic;
}
</style>
