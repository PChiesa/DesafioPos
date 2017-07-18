// // Usage: 

// let Component = {
//   element: document.getElementById('my-component-id'), // You should get the element from the DOM
//   state () {
//     return {
//       myState: 'abc'
//     }
//   },
//   props: {
//     myProp1: '123',
//     myProp2: '456'
//   },
//   onCreate: function () {
//     console.log('onCreate')
//   },
//   onMount: function () {
//     console.log('onMount')
//   },
//   onUnmount: function () {
//     console.log('onUnmount')
//   },
//   onUpdate: function () {
//     console.log('onUpdate')
//     console.log(this.myProp1) // Note that the props were injected on the component itself
//     console.log(this.myProp2) // Note that the props were injected on the component itself
//     console.log(this.myState) // Note that the state variables were injected on the component itself
//   }
// }

// let myComponentInstance = new ComponentInstance(Component)

// // Create the component
// myComponentInstance.create({
//   myProp1: 'aaa',
//   myProp2: 'bbb'
// })

// // Mount the component to the body
// myComponentInstance.mount(document.body)

// // Unmount the component
// myComponentInstance.unmount()

// // Update the component
// myComponentInstance.update({
//   myProp1: 'xyz',
//   myProp2: 'zzz'
// })

/**
 * Create an instance of a Component. It copies the Component structure to itself
 * @param {object} component The component to use to create the instance
 */
let ComponentInstance = function (component) {

}

/**
 * Associate an HTMLElement to the component instance 
 * @param {object} props The props to use on the component instance. Note that the props are already defined,
 *                       this function just updates the values
 */
ComponentInstance.prototype.create = function (props) {
  
}

/**
 * Insert the component instance's element on the DOM. The ComponentInstance.element will be a child of the specified element
 * @param {HTMLElement} element The element used parent
 */
ComponentInstance.prototype.mount = function (element) {
  
}

/**
 * Remove the ComponentInstance.element from the DOM
 */
ComponentInstance.prototype.unmount = function () {
  
}

/**
 * Update the props. Note that the props are already defined, just the values are updated
 * @param {object} props The props to be updated
 */
ComponentInstance.prototype.update = function (props) {

}