export abstract class Component {

  internalState?: HTMLElement = undefined
  
  abstract build(): Component;
  
  buildHtmlElement(): HTMLElement {
    const newState = this.build().buildHtmlElement()
    if (this.internalState) {
      if (this.internalState == newState) {
        return newState
      }
      this.internalState.replaceWith(newState)
    }
    this.internalState = newState
    return newState
  }

  rebuild() {
    this.buildHtmlElement()
  }

  compile() { }
}

