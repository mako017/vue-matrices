<template>
	<div class="home">
		<div class="login">
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
		<div>
			<p>A description of the project will follow soon</p>
			<p>
				To construct matrices tasks, click on
				<b>Builder</b> above the logo
			</p>
			<h1>work in progress</h1>
			<h2>Planned features</h2>
			<dl>
				<dt>GDPR assistant</dt>
				<dd>Use built-in formular or link from other site</dd>

				<dt>Set Timelimit</dt>
				<dd>Per item or</dd>
				<dd>for the whole test</dd>

				<dt>Change instruction</dt>
				<dd>Use premade instructions or write them individually</dd>

				<dt>Change WM load</dt>
				<dd>Show the clicked symbols in the response field or not</dd>

				<dt>Use URL parameters</dt>
				<dd>
					Match participants by using custom URL parameters (e.g. ?p= for the participant code)
				</dd>

				<dt>Flexible data export</dt>
				<dd>Export raw data or request 1/0 coded response data</dd>
			</dl>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "home",
	data() {
		return {
			user: "",
			pw: "",
		};
	},
	methods: {
		...mapActions(["userLogin"]),
	},
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
	margin: 1rem 0;
}
.container {
	min-height: 100vh;
	width: 50vw;
	margin: auto;
	text-align: left;
}
dt::before {
	content: "○";
}
dd::before {
	content: "-";
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
</style>
