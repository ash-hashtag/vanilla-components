import { Component } from "./components/component";

export const runApp = (component: Component) => {
    document.body.appendChild(component.build().buildHtmlElement())
} 