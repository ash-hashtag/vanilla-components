(() => {
  // ../src/components/component.ts
  var Component = class {
    constructor() {
      this.internalState = void 0;
    }
    buildHtmlElement() {
      const newState = this.build().buildHtmlElement();
      if (this.internalState) {
        if (this.internalState == newState) {
          return newState;
        }
        this.internalState.replaceWith(newState);
      }
      this.internalState = newState;
      return newState;
    }
    rebuild() {
      this.buildHtmlElement();
    }
    compile() {
    }
  };

  // ../src/components/html_components/div.ts
  var Div = class extends Component {
    constructor(children) {
      super();
      this._children = children;
    }
    build() {
      return this;
    }
    buildHtmlElement() {
      if (this.internalState) {
        return this.internalState;
      }
      const div = document.createElement("div");
      div.append(...this._children.map((e) => e.buildHtmlElement()));
      this.internalState = div;
      return div;
    }
    appendChild(component) {
      this._children.push(component);
      this.internalState?.appendChild(component.buildHtmlElement());
    }
    removeChild(component) {
      const index = this._children.indexOf(component);
      if (index == -1) {
        return;
      }
      this.removeAt(index);
    }
    removeAt(index) {
      this._children = this._children.splice(index, 1);
      const elem = this.internalState;
      if (elem != null) {
        elem.removeChild(elem.childNodes[index]);
      }
    }
    get children() {
      return this._children;
    }
  };

  // ../src/components/html_components/para.ts
  var Para = class extends Component {
    constructor(text) {
      super();
      this.innerText = text;
    }
    build() {
      return this;
    }
    buildHtmlElement() {
      if (this.internalState) {
        return this.internalState;
      }
      const elem = document.createElement("p");
      elem.innerText = this.innerText;
      this.internalState = elem;
      return elem;
    }
    set text(newText) {
      this.innerText = newText;
      if (this.internalState) {
        this.internalState.innerText = newText;
      }
    }
    get text() {
      return this.innerText;
    }
  };

  // ../src/runApp.ts
  var runApp = (component) => {
    document.body.appendChild(component.build().buildHtmlElement());
  };

  // src/utils.ts
  var randomString = (length) => {
    const buffer = window.crypto.getRandomValues(new Uint8Array(length));
    const charactes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const s = Array.from(buffer).map((e) => charactes[e % charactes.length]).join("");
    return s;
  };

  // src/index.ts
  var MyComponent = class extends Component {
    constructor() {
      super();
      this.child = void 0;
      setInterval(() => {
        this.rebuild();
      }, 500);
    }
    build() {
      const children = [];
      const len = Math.random() * 20 + 2;
      for (var i = 0; i < len; i++) {
        children.push(new Para(randomString(16)));
      }
      const div = new Div(children);
      this.child = div;
      return div;
    }
    rebuild() {
      if (Math.random() > 0.5) {
        this.child.appendChild(new Para(randomString(16)));
      } else {
        this.child.removeAt(Math.floor(Math.random() * this.child.children.length));
      }
    }
  };
  var homePage = new Div([
    new MyComponent()
  ]);
  runApp(homePage);
})();
