<template>
	<div class="home">
		<div class="description">
			<h1>Open Matrices Item Bank</h1>
			<p class="importantText">
				Please be aware that this software is still under development. At the moment it is
				<b>not</b> possible to generate a complete test. You can only build items.
			</p>
			<p>
				The Open Matrices Item Bank (OMIB) aims to fill yet a gap in open science and is inspired by projects like the
				<a
					href="https://ipip.ori.org/"
				>International Personality Item Pool</a>. To our knowledge, while open access test databases like the
				<a
					href="https://zis.gesis.org/en"
				>Open Access Repository for Measurement Instruments</a> exist, there is no way to flexibly build a construction based figural matrices test with free items. The OMIB provides a solution for this problem. With easy to understand tools everybody is able to build a matrices test without the need to worry about making mistakes during the test construction.
			</p>
			<p>For scientific use this software is completely free. However, we have two requests. First, in order to make the item database even more versatile and to steadily increase the number of items we offer, we would like to use the data from your study to estimate item parameters. Second, if you plan to publish data gathered with the OMIB please include the following reference.</p>
			<h2>Citation</h2>
			<p>
				<i>in preparation</i>
			</p>
			<p>For non-scientific use please contact us.</p>
		</div>
		<div class="featureList">
			<div class="existingFeatures">
				<h2>Existing Features</h2>
				<dl>
					<dt>Matrices Builder</dt>
					<dd>Building matrices tasks with a simple user interface</dd>
					<dd>Explanation and examples of all construction rules</dd>
					<dd>Testing items for solvability and monitoring which rules are used</dd>
					<dd>Exporting items as vector graphics (.svg)</dd>
					<dd>Exporting item codes with solutions</dd>
					<dd>Uploading generated items into the database</dd>

					<dt>Matrices Database</dt>
					<dd>Visual overview of all existing and solvable items</dd>
					<dd>Information concerning which rules are used in each item</dd>
					<dd>Filtering for number of rules and each rule type</dd>
					<dd>Selecting any number of items for use in test sets</dd>

					<dt>Test Editor</dt>
					<dd>Writing custom instructions with a rich text editor</dd>
					<dd>Rearranging instructions</dd>
					<dd>Inserting of test environment at any position</dd>

					<dt>Test Environment</dt>
					<dd>Save raw responses as well as coded responses</dd>
					<dd>Setting participant code with URL parameter</dd>
					<dd>Logging of solution building process</dd>
					<dd>Timelimit for items and/or total test time</dd>
				</dl>
			</div>
			<div class="plannedFeatures">
				<h2>Planned Features</h2>
				<dl>
					<dt>Matrices Builder</dt>
					<dd>Printing constructed test as PDF document</dd>
					<dd>Exporting item as .png</dd>
					<dd>Algorithm to estimate item difficulties</dd>
					<dd>More settings</dd>

					<dt>Matrices Database</dt>
					<dd>Overview of selected items</dd>
					<dd>More Filter options</dd>
					<dd>Random selection with average difficulty</dd>

					<dt>Test Editor</dt>
					<dd>Generating Test Link</dd>
					<dd>GDPR formular</dd>
					<dd>Setting Timelimit</dd>
					<dd>Setting working memory condition</dd>
				</dl>
			</div>
		</div>
		<hr />
		<div v-if="!isAuthenticated" class="login">
			<label class="login-user">
				User
				<input type="text" v-model="user" />
			</label>
			<label class="login-pass">
				Password
				<input type="password" v-model="pw" />
			</label>
			<button @click="userLogin({ user, pw })" class="login-btn" type="button">Login</button>
		</div>
		<div v-if="isAuthenticated" class="logout">
			<button @click="userLogout" type="button">Log Out</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name: "home",
	data() {
		return {
			user: "",
			pw: "",
		};
	},
	methods: {
		...mapActions(["userLogin", "userLogout"]),
	},
	computed: mapGetters(["isAuthenticated"]),
};
</script>

<style scoped>
h1 {
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 2rem 0;
}
h2 {
	font-size: 1.2rem;
	font-weight: bold;
	margin: 1rem 0;
}
.home {
	min-height: 100vh;
	width: 50vw;
	margin: auto;
}
.home p {
	text-align: justify;
	margin: 0.4rem 0;
}

.featureList {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0 1rem;
}

.featureList dl {
	text-align: left;
}

dt::before {
	content: "○";
	margin-right: 5px;
}
dt {
	font-weight: bold;
}
dd::before {
	content: "-";
	margin-left: -5px;
	margin-right: 5px;
}
dd {
	margin-left: 20px;
}
.login {
	display: grid;
	margin: 1rem 0;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		"user pw"
		"btn btn";
	gap: 0.7rem;
}
.logout {
	margin: 1rem 0;
}
.login-user {
	grid-area: user;
	justify-self: end;
}
.login-pass {
	grid-area: pw;
	justify-self: start;
}
.login-btn {
	grid-area: btn;
	justify-self: center;
}
.importantText {
	color: red;
}
</style>
