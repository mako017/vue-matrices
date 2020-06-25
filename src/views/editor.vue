<template>
	<div class="container">
		<h1>Editor</h1>
		<p>
			With the controls below, you can freely build your own instructions and test design. Of course, if you have no need for changing any of our standardized instructions, you can always use our
			instructions
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
				<button
					:class="{ 'is-active': isActive.heading({ level: 1 }) }"
					@click="commands.heading({ level: 1 })"
				>
					<span>H1</span>
				</button>

				<button
					:class="{ 'is-active': isActive.heading({ level: 2 }) }"
					@click="commands.heading({ level: 2 })"
				>
					<span>H2</span>
				</button>

				<button
					:class="{ 'is-active': isActive.heading({ level: 3 }) }"
					@click="commands.heading({ level: 3 })"
				>
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
			</div>
		</editor-menu-bar>
		<editor-content class="editor-content" :editor="editor" />
		<button @click="savePage" type="button">Save page</button>
		<hr />
		<p>In the red box below you'll see a miniature preview of the instruction page you're working on. On a standard 16/9 fullHD monitor it should resemble the layout of the real instructions rather closely.</p>
		<!-- <textarea v-model="html"></textarea> -->
		<fullPagePreview class="currenPreview" :html="html" />
		<hr />
		<h1>Test Design</h1>
		<p>In the section below you will see all instructions in the order you wrote them. If you feel that a different order might be better, you can use the arrow buttons besides the preview to rearrange the instructions.</p>
		<p>
			With the
			<b>Insert Test</b> button you can decide at which point you want to display the test.
		</p>
		<testLayout />
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Heading, HorizontalRule, Bold, Italic, Link, Strike, Underline, History, Image } from "tiptap-extensions";
import fullPagePreview from "@/components/editor/fullPagePreview.vue";
import testLayout from "@/components/editor/testLayout.vue";
export default {
	name: "editor",
	components: {
		EditorContent,
		EditorMenuBar,
		fullPagePreview,
		testLayout,
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
				content: `<h1>Hello World</h1>`,
				onUpdate: ({ getHTML }) => {
					this.html = getHTML();
				},
			}),
			html: "<h1>Hello World</h1>",
		};
	},
	methods: {
		...mapActions(["addPage"]),
		savePage() {
			this.addPage(this.html);
		},
		showImagePrompt(command) {
			const src = prompt("Enter the url of your image here");
			if (src !== null) {
				command({ src });
			}
		},
	},
	beforeDestroy() {
		this.editor.destroy();
	},
};
</script>

<style scoped>
h1 {
	display: inline-block;
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 2rem 0;
}
hr {
	width: 100%;
	margin: 1rem 0;
	display: inline-block;
}
.currenPreview {
	margin-top: 1rem;
	align-self: center;
}

.container {
	min-height: 100vh;
	width: 50vw;
	margin: auto;
	text-align: left;
	display: flex;
	flex-direction: column;
}
.menubar {
	margin: 2rem 0 0 0;
	font-size: 1.3rem;
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

.editor-content >>> strong {
	font-weight: bold;
}
.editor-content >>> em {
	font-style: italic;
}
.editor-content >>> h1 {
	font-size: 1.5rem;
	font-weight: bold;
}
.editor-content >>> h2 {
	font-size: 1.2rem;
	font-weight: bold;
}
.editor-content >>> h3 {
	font-weight: bold;
}
</style>
