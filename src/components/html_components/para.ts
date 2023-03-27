import { Component } from "../component";

export class Para extends Component {
    private innerText: string

    constructor(text: string) {
        super()
        this.innerText = text
    }

    build(): Component {
        return this
    }

    buildHtmlElement(): HTMLElement {
        if (this.internalState) {
            return this.internalState
        }
        const elem = document.createElement("p")
        elem.innerText = this.innerText
        this.internalState = elem
        return elem
    }

    set text(newText: string) {
        this.innerText = newText
        if (this.internalState) { this.internalState!.innerText = newText }
    }

    get text() { return this.innerText }
}