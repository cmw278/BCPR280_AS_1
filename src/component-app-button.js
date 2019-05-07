/* global Vue */
var appButton = {
  render: function (createElement) {
    var self = this
    // Button nodes
    var buttons = []
    for (let aButton of self.labels) {
      buttons.push(
        createElement(
          'button',
          {
            class: ['btn', self.customClass],
            domProps: {
              disabled: self.disabled
            },
            on: {
              click: () => {
                self.$emit('submit', aButton)
              }
            }
          },
          aButton
        )
      )
    }
    return createElement( // <button class="btn btn-{{ theme }} btn-block">
      'div',
      {
        class: ['btn-group', 'btn-block']
      },
      buttons
    )
  },
  props: {
    labels: {
      type: Array,
      required: true,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: 'btn-info'
    }
  }
}

Vue.component('app-button', appButton)
