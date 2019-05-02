/* global Vue */
var appInput = {
  render: function (createElement) {
    var self = this
    var label = self.$slots.default
    return createElement(
      'div',
      { class: 'input-group btn-block' },
      [
        createElement( // <input type="number" class="form-control"/>
          'input',
          {
            class: 'form-control',
            attrs: {
              type: self.type,
              id: 'fetch',
              min: 0,
              max: 99
            },
            domProps: {
              value: self.value,
              disabled: self.disabled
            },
            on: {
              input: function (event) { //  forward input event upstream
                self.$emit('input', parseInt(event.target.value))
              }
            }
          }
        ),
        createElement( // <div class="input-group-append">
          'div',
          { class: 'input-group-append' },
          [ createElement( // <button class="btn btn-info">
            'button',
            {
              class: 'btn btn-info',
              domProps: { disabled: self.disabled },
              on: {
                click: function (e) {
                  self.$emit('submit')
                }
              }
            },
            label
          )]
        )
      ]
    )
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      default: 'number'
    }
  }
}

Vue.component('app-input', appInput)
