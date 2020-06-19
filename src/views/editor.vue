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
			</div>
		</editor-menu-bar>
		<editor-content class="editor-content" :editor="editor" />
		<p>{{ html }}</p>
	</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
	// Blockquote,
	// CodeBlock,
	// HardBreak,
	Heading,
	HorizontalRule,
	// OrderedList,
	// BulletList,
	// ListItem,
	// TodoItem,
	// TodoList,
	Bold,
	// Code,
	Italic,
	Link,
	Strike,
	Underline,
	History,
} from "tiptap-extensions";
export default {
	name: "editor",
	components: {
		EditorContent,
		EditorMenuBar,
	},
	data() {
		return {
			editor: new Editor({
				extensions: [
					// new Blockquote(),
					// new BulletList(),
					// new CodeBlock(),
					// new HardBreak(),
					new Heading({ levels: [1, 2, 3] }),
					new HorizontalRule(), //
					// new ListItem(),
					// new OrderedList(),
					// new TodoItem(),
					// new TodoList(),
					new Link(), //
					new Bold(),
					// new Code(),
					new Italic(),
					new Strike(),
					new Underline(),
					new History(), //
				],
				content: `<h1>Hello World</h1>`,
				onUpdate: ({ getHTML }) => {
					this.html = getHTML();
				},
			}),
			html: "",
		};
	},
	beforeDestroy() {
		this.editor.destroy();
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
