import { EditorProps } from '@tiptap/pm/view';

export const defaultEditorProps: EditorProps = {
  attributes: {
    class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default max-w-full`,
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key) && !!document.querySelector('#slash-command')) {
        event.preventDefault();
        return true;
      }
    },
  },
};
