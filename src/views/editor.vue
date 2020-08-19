<template>
	<div class="container">
		<div class="editor-nav">
			<span><u>Editor Navigation</u></span>
			<span><a href="#testEditor">Editor</a></span>
			<span><a href="#testPreview">Current Page</a></span>
			<span><a href="#testDesign">Test Design</a></span>
			<span><a href="#testSettings">Settings</a></span>
		</div>
		<h1 id="testEditor" @click="finalizeTest">Editor</h1>
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
				extensions: [
					new Heading({ levels: [1, 2, 3] }),
					new HorizontalRule(),
					new Link(), //
					new Bold(),
					new Italic(),
					new Strike(),
					new Underline(),
					new History(),
					new Image(),
				],
				content: `<h1>Instruction Page 1</h1><h2>How to use our instructions</h2><h3>Another even smaller header</h3><p>While we want you, to be able to customize all instructions, to your own needs, we can also understand that you might just want to use our pre made instructions. This is totally fine and <strong>you don't need to explicitly ask for our consent</strong>. <em>These instructions have been tested on several samples</em> in the past and have proven to be long enough so an <u>average</u> adult will understand the task at hand.</p><hr><h3>Custom instructions</h3><p>Of course, if you choose to use your own instructions, we want you to have access to the same tools we used. Thus you can freely write your own instructions with HTML and inline CSS. However, please understand that we can't guarantee that your handmade instructions will be displayed properly on all devices. Thus before sending the test link to your sample, make sure to test it on several devices, including smartphones, tablets and notebooks. Also different browsers may display your instructions differently and operating systems such as Android and iOS have differences, too.</p>`,
				onUpdate: ({ getHTML }) => {
					this.html = getHTML();
				},
			}),
			html:
				"<h1>Instruction Page 1</h1><h2>How to use our instructions</h2><h3>Another even smaller header</h3><p>While we want you, to be able to customize all instructions, to your own needs, we can also understand that you might just want to use our pre made instructions. This is totally fine and <strong>you don't need to explicitly ask for our consent</strong>. <em>These instructions have been tested on several samples</em> in the past and have proven to be long enough so an <u>average</u> adult will understand the task at hand.</p><hr><h3>Custom instructions</h3><p>Of course, if you choose to use your own instructions, we want you to have access to the same tools we used. Thus you can freely write your own instructions with HTML and inline CSS. However, please understand that we can't guarantee that your handmade instructions will be displayed properly on all devices. Thus before sending the test link to your sample, make sure to test it on several devices, including smartphones, tablets and notebooks. Also different browsers may display your instructions differently and operating systems such as Android and iOS have differences, too.</p>",
		};
	},
	methods: {
		...mapActions(["addPage", "uploadTest", "activatePage"]),
		savePage() {
			this.addPage(this.html);
		},
		finalizeTest() {
			if (!this.isAuthenticated) {
				alert("This function is only available for registered users.");
				return 0;
			}
			this.uploadTest(this.userName);
		},
		showImagePrompt(command) {
			const src = prompt("Enter the url of your image here");
			if (src !== null) {
				command({ src });
			}
		},
	},
	computed: {
		...mapGetters(["isAuthenticated", "userName", "pages", "currentPage"]),
		saveInstText: function() {
			if (this.currentPage >= this.pages.length) {
				return "Add new Page";
			}
			return "Save Changes";
		},
	},
	mounted() {
		this.activatePage(this.pages.length);
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
}

.container > button {
	align-self: center;
	margin: 0.5rem 0;
}

.editor-content::v-deep strong {
	font-weight: bold;
}
.editor-content::v-deep em {
	font-style: italic;
}
.editor-content::v-deep h1 {
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
}
.editor-content::v-deep h2 {
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
}
.editor-content::v-deep h3 {
	font-weight: bold;
	text-align: center;
}
</style>
