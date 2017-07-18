let Page1 = new ComponentInstance ({
  element: document.getElementById("page-1"), // Should find an HTMLElement on the DOM
  onCreate () {
    console.log("This is the page 1")
  },
  onMount(){
    console.log("Page 1 mounted");
  },
  onUnmount(){
    console.log("Page 1 unmounted");
  },
  onUpdate(){
    console.log("Page 1 updated");
  }
})