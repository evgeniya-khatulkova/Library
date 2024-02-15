// id counter and cash array
class
Book{
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  add(){ // adds new book to cashing
    cashing.push(this);
    render();
  };

  template() { // creates a template for output
    const template = document.createElement('div');
    output_window.appendChild(template);
    template.classList.add('book');
    ['title','author','pages','read'].forEach(property => {
      this.info(template, property);
    })
    this.bindEvents(template);
  }

  info(template, property) { // populate template with the info from the object
    const div = document.createElement('div');
    template.appendChild(div);
    div.setAttribute('class',`${property}`);
    div.innerHTML = this[`${property}`];
    if(property === 'pages') {div.innerHTML += " pages."}
    if(property === "read") { !this.read
      ? div.innerHTML = '<span>Unread</span><label class="switch"> <input type="checkbox"><span class="slider"></span></label>'
      : div.innerHTML = '<label class="switch"> <input type="checkbox" checked><span class="slider"></span></label><span>Finished</span>'
    };
  }

  rmButton(template) { // creates a remove button
    const removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('class','removeBtn');
    template.appendChild(removeButton);
    return removeButton;
  }
  bindEvents(template) {// bind events remove button and checkbox(read/unread)
    const inputForTemplate = template.querySelector('input');
    inputForTemplate.addEventListener('change',() => {
      this.toread();
      render();
    })
    this.rmButton(template).addEventListener('click',() => {
      this.delete();
    })
  }

  delete(){ // remove instance from the cashing arr
    const index = cashing.indexOf(this);
    cashing.splice(index, 1);
    render();
  }

  toread() {// changes status read/unread
    this.read ? this.read = false : this.read = true;
  }
}

