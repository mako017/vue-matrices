<template>
	<div class="builder">
		<div class="help-menu" v-bind:class="{ active: settings.activeView == 'help' }">
			<h2 class="side-title">Hilfe</h2>
			<collapse v-for="item in allHelp" :key="item.title" :item="item" />
			<button id="reset" class="final-button" @click="resetItem">Reset item</button>
		</div>
		<div class="main" v-bind:class="{ active: settings.activeView == 'construct' }">
			<div class="main-title">
				<svg @click="switchItem(-1)" viewBox="0 0 50 80" xml:space="preserve">
					<polyline stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 " />
				</svg>
				<h2>{{ itemCounter }}</h2>
				<svg @click="switchItem(1)" viewBox="0 0 50 80" xml:space="preserve">
					<polyline stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 " />
				</svg>
			</div>
			<con :item="item" />
			<drawer :items="items" />
		</div>
		<div class="control-menu" v-bind:class="{ active: settings.activeView == 'settings' }">
			<h2 class="side-title">Control Panel</h2>
			<div class="side-container">
				<h3>Used Rules</h3>
				<table class="rules-table" style="width:80%;">
					<thead>
						<th>Rule</th>
						<th>Item</th>
						<th>Test</th>
					</thead>
					<tbody>
						<tr>
							<td>ADD</td>
							<td>{{ item.rules.add.length }}</td>
							<td>{{ testRules.add }}</td>
						</tr>
						<tr>
							<td>SUB</td>
							<td>{{ item.rules.sub.length }}</td>
							<td>{{ testRules.sub }}</td>
						</tr>
						<tr>
							<td>DU</td>
							<td>{{ item.rules.eka.length }}</td>
							<td>{{ testRules.eka }}</td>
						</tr>
						<tr>
							<td>INT</td>
							<td>{{ item.rules.sm.length }}</td>
							<td>{{ testRules.sm }}</td>
						</tr>
						<tr>
							<td>ROT</td>
							<td>{{ item.rules.rot.length }}</td>
							<td>{{ testRules.rot }}</td>
						</tr>
						<tr>
							<td>COM</td>
							<td>{{ item.rules.voll.length }}</td>
							<td>{{ testRules.voll }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="side-container">
				<h3>Estimated difficulty</h3>
				<div class="diff-grid">
					<span>Item</span>
					<span>Test</span>
					<md-progress-bar class="md-accent" :md-value="itemDiff"></md-progress-bar>
					<md-progress-bar class="md-accent" :md-value="testRules.est"></md-progress-bar>
				</div>
			</div>
			<div class="side-container">
				<h3>Settings</h3>
				<div class="export-settings">
					<md-switch v-model="settings.svg" class="md-primary">SVG</md-switch>
					<md-switch v-model="settings.pdf" class="md-primary">PDF</md-switch>
				</div>
				<div class="side-buttons">
					<md-button class="md-raised" @click="exportAllSVG">Export Set</md-button>
					<md-button class="md-raised" @click="uploadItems">Upload Set</md-button>
					<md-button class="md-raised" @click="console.log(0)">Print Test</md-button>
					<md-button class="md-raised" @click="exportCodes()">Export Itemcodes</md-button>
				</div>
			</div>
			<div class="side-container">
				<h3>Itemcode</h3>
				<textarea v-model="item.code" readonly></textarea>
			</div>
			<!-- <div class="side-container">
				<p>{{ currentItem }}</p>
			</div>-->
			<button id="save-item" class="final-button" @click="saveItem">Save item</button>
		</div>
		<div class="navbar">
			<span v-bind:class="{ active: settings.activeView == 'help' }" @click="settings.activeView = 'help'">Help</span>
			<span v-bind:class="{ active: settings.activeView == 'construct' }" @click="settings.activeView = 'construct'">Construct</span>
			<span v-bind:class="{ active: settings.activeView == 'settings' }" @click="settings.activeView = 'settings'">Settings</span>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import COMM from "@/assets/js/communication.js";
import collapse from "@/components/builder/collapsible.vue";
import con from "@/components/builder/construction.vue";
import drawer from "@/components/builder/item-drawer.vue";
import { MdButton, MdProgress, MdSwitch } from "vue-material/dist/components";
import rCon from "@/assets/js/rCon.js";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(MdButton);
Vue.use(MdProgress);
Vue.use(MdSwitch);
export default {
	name: "builder",
	components: {
		collapse,
		con,
		drawer,
	},
	data: function() {
		return {
			onlineCodes: Array,
			items: [],
			item: {
				id: 0,
				code:
					"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
				svg: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
				rules: {
					add: [],
					sub: [],
					eka: [],
					sm: [],
					rot: [],
					voll: [],
				},
			},
			settings: {
				svg: true,
				pdf: false,
				activeView: "construct",
			},
		};
	},
	methods: {
		// ...mapActions(["resetItemCode", "pushItem", "downloadOnlinceCodes"]),
		resetItem() {
			this.$set(
				this.item,
				"code",
				"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
			);
			this.item = Object.assign({}, this.item);
			// this.resetItemCode();
		}, //erledigt
		saveItem() {
			if (rCon.testDuplicate(this.item.code, this.onlineCodes)) {
				alert("Dieses Item existiert schon");
				return 1;
			}
			if (
				rCon.testDuplicate(
					this.item.code,
					this.items.map(item => item.code),
				)
			) {
				alert("Dieses Item existiert schon");
				return 1;
			}
			const rcon = new rCon(this.item.code);
			rcon.testAllRules();
			if (rcon.isSolvable) {
				if (!this.items[this.item.id]) {
					this.items.push({ ...this.item });
					this.$set(this.item, "id", this.item.id + 1);
					this.$set(
						this.item,
						"code",
						"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
					);
					this.$set(this.item, "svg", ["0", "0", "0", "0", "0", "0", "0", "0", "0"]);
					this.$set(this.item, "rules", {
						add: [],
						sub: [],
						eka: [],
						sm: [],
						rot: [],
						voll: [],
					});
					this.item = Object.assign({}, this.item);
				} else {
					this.$set(this.items, this.item.id, { ...this.item });
				}
			}
			// this.pushItem();
		}, //erledigt
		switchItem(val) {
			if (+val === 1 && this.item.id === this.items.length - 1) {
				this.$set(this.item, "id", this.item.id + 1);
				this.$set(
					this.item,
					"code",
					"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
				);
				this.item = Object.assign({}, this.item);
			}
			if ((+val === -1 && this.item.id > 0) | (+val === 1 && this.item.id < this.items.length - 1)) {
				this.item = Object.assign({}, this.items[this.item.id + +val]);
			}
		},
		async uploadItems() {
			let upItems = [];
			this.items.map(item => {
				if (!rCon.testDuplicate(item.code, this.onlineCodes)) {
					upItems.push({ ...item });
				}
			});
			await COMM.sendData(upItems, "insertAll");
			alert(`Uploaded ${upItems.length} Item(s)`);
			this.onlineCodes = await COMM.readCodes();
		},
		exportAllSVG() {
			if (!this.settings.svg) return 0;
			function saveSvg(id) {
				var svg = document.getElementById(id);
				var serializer = new XMLSerializer();
				var source = serializer.serializeToString(svg);
				if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
					source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
				}
				if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
					source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
				}
				source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
				var url = window.btoa(source);
				return url;
			}
			let JSZip = require("jszip");
			let FS = require("file-saver");
			let $ = require("jquery");

			let z = new JSZip();
			$("svg[id^='mini']").each(function() {
				z.file(this.id.replace("mini", "") + ".svg", saveSvg(this.id), {
					base64: true,
				});
			});

			z.generateAsync({ type: "blob" }).then(function(blob) {
				FS.saveAs(blob, "matrices.zip");
			});
		},
		exportCodes() {
			let FS = require("file-saver");
			const array = [Object.keys(this.items[0])].concat(this.items);

			let result = array
				.map(it => {
					return Object.values(it).join(";");
				})
				.join("\n");
			result = result.match(/^.*?;.*?;/gm).join("\n");
			let blob = new Blob([result], { type: "text/plain;charset=utf-8" });
			FS.saveAs(blob, "itemcodes.csv");
			console.log(result);
		},
	},
	computed: {
		...mapGetters(["allHelp"]),
		// ...mapGetters(["allHelp", "allItems", "currentItem", "allOnlineCodes"]),
		itemCounter: function() {
			return "Item " + (this.item.id + 1) + " von " + (this.items.length + 1);
		},
		itemDiff: function() {
			let rules = this.item.rules.add.length + this.item.rules.sub.length + this.item.rules.eka.length + this.item.rules.sm.length + this.item.rules.rot.length;
			if (this.item.rules.voll.length > 0) rules += 1;
			// console.log(rules/6);

			return (rules / 6) * 100;
		},
		testRules: function() {
			let rules = {
				add: 0,
				sub: 0,
				eka: 0,
				sm: 0,
				rot: 0,
				voll: 0,
				est: 0,
			};
			this.items.forEach(element => {
				rules.add += element.rules.add.length;
				rules.sub += element.rules.sub.length;
				rules.eka += element.rules.eka.length;
				rules.sm += element.rules.sm.length;
				rules.rot += element.rules.rot.length;
				if (element.rules.voll.length > 0) rules.voll += 1;
			});
			rules.est = ((rules.add + rules.sub + rules.eka + rules.sm + rules.rot + rules.voll) / (6 * this.items.length)) * 100;
			return rules;
		},
	},
	async beforeCreate() {
		this.onlineCodes = await COMM.readCodes();
		// this.downloadOnlinceCodes();
	},
};
</script>

<style scoped>
th {
	font-weight: bold;
}
h2 {
	font-weight: 800;
	text-align: center;
}
h3 {
	font-weight: 600;
}
textarea {
	resize: none;
	height: 4.2rem;
}
.builder {
	width: 100%;
	height: 100vh;
	background-color: hsl(0, 0%, 92%);
	display: grid;
	grid-template-columns: 25% 50% 25%;
}

.help-menu {
	border-right: 1px solid black;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
}
.main {
	display: flex;
	flex-direction: column;
	padding: 1rem 0 0 0;
	overflow: hidden;
}
.main-title {
	align-self: center;
	display: flex;
	flex-direction: row;
	font-size: 1.3rem;
}
.main-title svg {
	height: 1.3rem;
	stroke-width: 5px;
	stroke: #000;
	fill: none;
	margin: 0 1.5rem;
}
.control-menu {
	border-left: 1px solid black;
	display: flex;
	flex-direction: column;
}

.side-title {
	font-size: 2rem;
	text-align: center;
	padding: 0.2rem;
	border-bottom: 1px solid black;
}
.side-container {
	padding: 0.5rem 0;
	margin: 0 1rem;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid black;
}
.export-settings {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	width: 30%;
	margin: 0 10%;
}
.side-buttons {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.side-buttons > * {
	width: 40%;
	margin: 0.5rem auto;
}

.side-container:last-of-type {
	border: none;
}

.diff-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
}

.diff-grid > * {
	width: 80%;
	text-align: center;
	margin: 0.3rem 1rem;
}

.final-button {
	margin: auto 0 0 0;
	height: 3rem;
	font-size: 2rem;
}

.rules-table {
	width: 80%;
	align-self: center;
}

.navbar {
	display: none;
}

@media (max-width: 850px) {
	.control-menu,
	.help-menu,
	.main {
		display: none;
	}
	.control-menu.active,
	.help-menu.active,
	.main.active {
		display: flex;
	}
	.builder {
		grid-template-columns: 1fr;
	}
	.navbar {
		height: 2rem;
		width: 100%;
		background-color: #212121;
		position: fixed;
		bottom: 0;
		color: #fff;
		font-size: 1.5rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
	}
	.navbar:hover {
		cursor: pointer;
	}
	.navbar span.active {
		color: #42b983;
	}
	.final-button {
		margin-bottom: 2rem;
	}
}
</style>
