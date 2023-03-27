import { Component } from "../component";


export class Span extends Component {
    readonly text: string

    constructor(text: string) {
        super()
        this.text = text
    }

    build(): Component {
        throw this;
    }

    buildHtmlElement(): HTMLElement {
        const elem = document.createElement("span")
        elem.innerText = this.text
        return elem
    }

}