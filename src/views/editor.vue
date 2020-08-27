<template>
	<div class="container">
		<div class="editor-nav">
			<span>
				<u>Editor Navigation</u>
			</span>
			<span>
				<a href="#testEditor">Editor</a>
			</span>
			<span>
				<a href="#testPreview">Current Page</a>
			</span>
			<span>
				<a href="#testDesign">Test Design</a>
			</span>
			<span>
				<a href="#testSettings">Settings</a>
			</span>
			<span>
				<a href="#testFinalize">Finalizing</a>
			</span>
		</div>
		<h1 id="testEditor">Editor</h1>
		<p>
			With the controls below, you can freely build your own instructions and test design. Of course, if you have no need for changing any of our standardized instructions, you can always use our
			instructions. We recommend that when you write your own instructions, you should try to avoid making the user scroll. The best user experience results from the user being able to read all
			information on a page without scrolling.
		</p>
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<div class="menubar">
				<button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
					<span>
						<b>B</b>
					</span>
				</button>
				<button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
					<span>
						<i>I</i>
					</span>
				</button>
				<button :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
					<span>
						<s>S</s>
					</span>
				</button>
				<button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
					<span>
						<u>U</u>
					</span>
				</button>
				<button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
					<span>H1</span>
				</button>

				<button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
					<span>H2</span>
				</button>

				<button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
					<span>H3</span>
				</button>

				<button class="menubar__button" @click="commands.horizontal_rule">
					<span>-</span>
				</button>

				<button class="menubar__button" @click="commands.undo">
					<span>←</span>
				</button>

				<button class="menubar__button" @click="commands.redo">
					<span>→</span>
				</button>

				<button class="menubar__button" @click="showImagePrompt(commands.image)">
					<span>IMG</span>
				</button>
				<span class="pageOf">Page {{ currentPage + 1 }} of {{ pages.length }}</span>
			</div>
		</editor-menu-bar>
		<editor-content class="editor-content" :editor="editor" />
		<button @click="savePage" type="button">{{ saveInstText }}</button>
		<button v-if="currentPage < pages.length" @click="newPage" type="button">New page</button>
		<hr />
		<h1 id="testPreview">Current Page Preview</h1>
		<p>
			In the red box below you'll see a miniature preview of the instruction page you're working on. On a standard 16/9 fullHD monitor it should resemble the layout of the real instructions rather
			closely.
		</p>
		<!-- <textarea v-model="html"></textarea> -->
		<div class="pageContainer">
			<fullPagePreview :html="html" />
		</div>
		<hr />
		<h1 id="testDesign">Test Design</h1>
		<p>
			In the section below you will see all instructions in the order you wrote them. If you feel that a different order might be better, you can use the arrow buttons besides the preview to rearrange
			the instructions.
		</p>
		<p>
			With the
			<b>Insert Test</b> button you can decide at which point you want to display the test.
		</p>
		<testLayout />
		<hr />
		<h1 id="testSettings">Test Settings</h1>
		<p>
			In this section you can adjust settings that change the behavior of the test environment. As with the instructions, the prefilled values have been tested before and haven proven to allow for
			reliable testing.
		</p>
		<settingsForm />
		<hr />
		<h1 id="testFinalize">Finalizing your test</h1>
		<p v-html="testStatus"></p>
		<p v-if="!isOnline">
			When you are satisfied with the test layout, clicking on
			<b>Deploy test</b> will make the test available online. You will receive an URL that can be shared with participants. The first URL is completely anonymized. If you use this URL, each
			participant will receive a random participant code and you <b>cannot</b> examine any relation of the matrices test result with other variables. If you wish to examine associations between
			intelligence and other variables, you should use the second link. In this case, you must send each participant a personalized link (i.e. replace %participantID% with an ID that you generate for
			each participant).
		</p>
		<p v-else>
			Anonymous URL:
			<br />Personalized URL:
		</p>
		<button type="button" @click="finalizeTest">Deploy test</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Heading, HorizontalRule, Bold, Italic, Link, Strike, Underline, History, Image } from "tiptap-extensions";
import fullPagePreview from "@/components/editor/fullPagePreview.vue";
import testLayout from "@/components/editor/testLayout.vue";
import settingsForm from "@/components/editor/settingsForm.vue";
export default {
	name: "editor",
	components: {
		EditorContent,
		EditorMenuBar,
		fullPagePreview,
		testLayout,
		settingsForm,
	},
	data() {
		return {
			editor: new Editor({
				extensions: [new Heading({ levels: [1, 2, 3] }), new HorizontalRule(), new Link(), new Bold(), new Italic(), new Strike(), new Underline(), new History(), new Image()],
				onUpdate: ({ getHTML }) => {
					this.html = getHTML();
				},
			}),
			html: "",
		};
	},
	methods: {
		...mapActions(["addPage", "editPage", "uploadTest", "activatePage"]),
		finalizeTest() {
			if (!this.isAuthenticated) {
				alert("This function is only available for registered users.");
				return 0;
			}
			this.uploadTest(this.userName);
		},
		newPage() {
			this.activatePage(this.pages.length);
			this.html = this.currentHTML;
			this.editor.setContent(this.html);
		},
		savePage() {
			if (this.currentPage >= this.pages.length) {
				this.addPage(this.html);
				this.newPage();
			}
			this.editPage({ pos: this.currentPage, newPage: this.html });
		},
		showImagePrompt(command) {
			const src = prompt("Enter the url of your image here");
			if (src !== null) {
				command({ src });
			}
		},
	},
	computed: {
		...mapGetters(["isAuthenticated", "isOnline", "userName", "pages", "currentPage", "currentHTML"]),
		saveInstText: function() {
			if (this.currentPage >= this.pages.length) {
				return "Add new Page";
			}
			return "Save Changes";
		},
		testStatus: function() {
			if (this.isOnline) return 'Status: <span style="color:green;">online</span>';
			return 'Status: <span style="color:red;">offline</span>';
		},
	},
	watch: {
		currentPage() {
			if (this.currentPage < this.pages.length) {
				this.activatePage(this.currentPage);
				this.html = this.pages[this.currentPage].html;
				this.editor.setContent(this.html);
			}
		},
	},
	mounted() {
		this.newPage();
	},
	beforeDestroy() {
		this.editor.destroy();
	},
};
</script>

<style scoped lang="scss">
h1 {
	display: inline-block;
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 1rem 0;
}
hr {
	width: 100%;
	margin: 1rem 0;
	display: inline-block;
}

.editor-nav {
	background-color: #212121;
	position: fixed;
	top: 25vh;
	right: 0;
	display: flex;
	flex-direction: column;
	padding: 0.2rem 0.5rem;
	span,
	a {
		font-size: 1.2rem;
		color: #fff;
		margin: 0.3rem 0;
	}
}

.pageContainer {
	width: 40vw;
	margin-top: 1rem;
	align-self: center;
}

.container {
	min-height: 100vh;
	width: 50vw;
	margin: auto;
	padding-bottom: 2rem;
	text-align: left;
	display: flex;
	flex-direction: column;
	button {
		align-self: center;
		margin: 0.5rem 0;
	}
}
.menubar {
	margin: 1rem 0 0 0;
	display: flex;
	span {
		font-size: 1.2rem;
	}
	span.pageOf {
		margin-left: auto;
	}
	button {
		margin: 0 0.1rem 0.3rem 0.1rem;
	}
}
.editor-content {
	border: 1px solid black;
	margin-bottom: 2rem;
	padding: 0.5rem;
	box-shadow: 0 0 2px black inset;
	::v-deep img {
		display: block;
		margin: 0 auto;
	}
	::v-deep strong {
		font-weight: bold;
	}
	::v-deep em {
		font-style: italic;
	}
	::v-deep h1 {
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
	}
	::v-deep h2 {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
	}
	::v-deep h3 {
		font-weight: bold;
		text-align: center;
	}
}
</style>
