import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class TipBlueBlot extends Embed {
    static blotName = 'tipBlue';
    static tagName = 'div';

    static create(component) {
        const node = super.create();
        node.innerHTML = `<tipBlue name="${component.name}"></tipBlue>`;
        return node;
    }

    static value(node) {
        return {
            name: node.getAttribute('name')
        };
    }
}

Quill.register(TipBlueBlot);