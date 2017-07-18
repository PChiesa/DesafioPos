let routes = [
  {
    name: 'my-page',
    path: '/',
    component: Page1
  },
  {
    name: 'my-other-page',
    path: '/other/?property1/page/?property2', // example: /other/123/page/456 should get the 123 and 456 as property1 and property2 respectively
    component: Page2
  },
  {
    name: 'my-page-3',
    path: '/page3',
    component: Page3
  },
]