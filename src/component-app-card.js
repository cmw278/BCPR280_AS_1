/* global Vue */
var appCard = {
  render: function (createElement) {
    var self = this
    return createElement( // <div class="card">
      'div',
      { class: 'card text-center' },
      [ createElement( // <div class="card-header">
        'div',
        { class: 'card-header' },
        self.title
      ), self.$slots.default ]
    )
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}

Vue.component('app-card', appCard)
