<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link>| <router-link to="/builder">Builder</router-link>| <router-link to="/database">Database</router-link>|
			<router-link to="/editor">Editor</router-link>
		</div>
		<router-view />
		<footer>
			<div class="footer-content">
				<img class="footer-logo" src="https://lets-test.it/assets/LTI_logo.svg" />
				<span class="footer-text"
					>The Open Matrices Item Bank and the matrices editor were developed as part of the Let's Test It project. This project aims to to make the advantages of computer based testing more
					accessible in psychology by providing tests that can be run on any device. All services can be used freely for non-commercial research.</span
				>
				<hr />
				<span><a href="https://lets-test.it">Let’s Test It</a></span>
				<span>Privacy Policy</span>
				<span>Contact</span>
			</div>
		</footer>
	</div>
</template>

<script>
require("@/assets/css/normal.css");
</script>

<style scoped lang="scss">
#app {
	font-family: Roboto, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	min-height: 100vh;
	background-color: hsl(0, 0%, 92%);
}

#nav {
	padding: 30px;
	font-size: 1.4rem;
	background-color: #212121;
}

#nav a {
	font-weight: bold;
	color: #fff;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

footer {
	background-color: #fafafa;
	widows: 100%;
	padding: 0 25%;
	.footer-content {
		grid-area: content;
		display: grid;
		grid-template-rows: repeat(3, auto);
		grid-template-columns: repeat(4, 1fr);
		grid-template-areas:
			"logo text text text"
			"line line line line"
			"name link1 link2 link3";
	}
	.footer-content .footer-logo {
		grid-area: logo;
		align-self: center;
	}
	.footer-content .footer-text {
		grid-area: text;
		margin-top: 0.4rem;
	}
	.footer-content hr {
		grid-area: line;
		width: 100%;
	}
}
</style>

<style lang="scss">
.tooltip {
	position: relative;
}
.tooltip .tooltiptext {
	visibility: hidden;
	width: max-content;
	text-align: center;
	font-size: 0.7rem;
	border-radius: 6px;
	padding: 5px 0;
	margin: auto 5px;

	/* Position the tooltip */
	position: absolute;
	z-index: 1;
	top: -5px;
	right: 105%;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
}
</style>
