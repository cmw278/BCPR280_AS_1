/* global Vue */
var appText = {
  render: function (createElement) {
    var self = this
    var userInput = self.$slots['user-input']
    var appResponse = self.$slots['app-response']
    var children = [ createElement( // <h5 class="card-title">
      'h5',
      { class: 'card-title' },
      appResponse
    )]
    if (userInput) {
      children.unshift(createElement( // <p class="card-text">
        'p',
        { class: 'card-text' },
        userInput
      ))
    }
    return createElement( // <div class="card-body">
      'div',
      { class: 'card-body d-flex flex-column justify-content-around' },
      [ children, self.$slots.default ] // insert children
    )
  }
}

Vue.component('app-text', appText)
