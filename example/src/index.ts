import { Component } from "../../src/components/component";
import { Div, Para, Span } from "../../src/components/html_components";
import { runApp } from "../../src/runApp";
import { randomString } from "./utils";


class MyComponent extends Component {
    private child?: Div = undefined

    constructor() {
        super()
        setInterval(() => { this.rebuild() }, 500)
    }

    build(): Component {
        const children: Component[] = []
        const len = Math.random() * 20 + 2;
        for (var i = 0; i < len; i++) {
            children.push(new Para(randomString(16)));
        }
        const div = new Div(children)
        this.child = div
        return div
    }

    rebuild(): void {
        if (Math.random() > 0.5) {
            this.child!.appendChild(new Para(randomString(16)))
        } else {
            this.child!.removeAt(Math.floor(Math.random() * this.child!.children.length))
        }
    }
}

const homePage = new Div([
    new MyComponent(),
])

runApp(homePage)
