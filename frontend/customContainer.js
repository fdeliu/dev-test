var template = document.createElement("template");

template.innerHTML = `
   
    <style>
       .container{
         width: 100%;
         max-width: 800px;
         margin: 30px auto;
         padding: 30px 60px;
         border-radius: 26px;
         background: #c7c7c7;
         color: #003595;
       }
        
    </style>

    <div class="container">
      <h2 class="title"></h2>
      <p class="description"></p>
    </div>

`;

class CustomContainer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".title").innerText = this.getAttribute(
      "title"
    );

    this.shadowRoot.querySelector(".description").innerText = this.getAttribute(
      "description"
    );

    this.shadowRoot.querySelector(
      ".container"
    ).style.background = this.getAttribute("backgroundColor");

    this.shadowRoot.querySelector(".container").style.color = this.getAttribute(
      "color"
    );
  }
}

window.customElements.define("custom-container", CustomContainer);
