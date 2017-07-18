let Page2 = new ComponentInstance ({
  element: document.getElementById("page-2"), // Should find an HTMLElement on the DOM
  props: {
    property1: '111',
    property2: '000'
  },
  onCreate () {
    console.log("This is the page 2")
  },
  onUpdate () {
    console.log(`property1 = ${this.property1}`)
    console.log(`property2 = ${this.property2}`)
  },
  onMount(){
    console.log("Page 2 mounted");
  },
  onUnmount(){
    console.log("Page 2 unmounted");
  }
})