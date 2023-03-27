import { Component } from "../component";

export class Div extends Component {

    private _children: Component[]

    constructor(children: Component[]) {
        super()
        this._children = children
    }

    build(): Component {
        return this
    }

    buildHtmlElement(): HTMLElement {
        if (this.internalState) { return this.internalState }
        const div = document.createElement("div")
        div.append(...this._children.map(e => e.buildHtmlElement()))
        this.internalState = div
        return div
    }

    appendChild(component: Component) {
        this._children.push(component)
        this.internalState?.appendChild(component.buildHtmlElement())
    }

    removeChild(component: Component) {
        const index = this._children.indexOf(component)
        if (index == -1) { return }
        this.removeAt(index)
    }

    removeAt(index: number) {
        this._children = this._children.splice(index, 1)
        const elem = this.internalState
        if (elem != null) {
            elem.removeChild(elem.childNodes[index])
        }
    }

    get children() {
        return this._children
    }
}