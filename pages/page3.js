let Page3 = new ComponentInstance ({
  element: document.getElementById("page-3"), // Should find an HTMLElement on the DOM
  onCreate () {
    console.log("This is the page 3")
  },
  onMount(){
    console.log("Page 3 mounted");
  },
  onUnmount(){
    console.log("Page 3 unmounted");
  },
  onUpdate(){
    console.log("Page 3 updated");
  }
})