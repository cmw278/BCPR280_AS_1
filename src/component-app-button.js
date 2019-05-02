/* global Vue */
var appButton = {
  render: function (createElement) {
    var self = this
    return createElement( // <button class="btn btn-{{ theme }} btn-block">
      'button',
      {
        class: [
          'btn btn-block'
        ],
        on: {
          click: function (e) { // forward click event upstream
            self.$emit('submit')
          }
        }
      },
      self.$slots.default
    )
  }
}

Vue.component('app-button', appButton)
