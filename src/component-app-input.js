/* global Vue */
var appInput = {
  render: function (createElement) {
    var self = this
    var label = self.$slots.default
    return createElement(
      'div',
      {
        class: 'input-group btn-block',
        on: {
          wheel: function (event) {
            if (self.type === 'number' && !self.disabled) {
              event.preventDefault()
              if (event.isTrusted) {
                var newValue = self.value
                newValue = event.deltaY < 0 ? newValue + 1 : newValue - 1
                newValue = newValue >= 0 ? newValue : 0
                newValue = newValue <= 99 ? newValue : 99
                self.$emit('input', newValue)
              }
            }
          }
        }
      },
      [
        createElement( // <input type="number" class="form-control"/>
          'input',
          {
            class: 'form-control',
            attrs: {
              type: self.type,
              min: 0,
              max: 99
            },
            domProps: {
              value: self.value,
              disabled: self.disabled
            },
            on: {
              input: function (event) {
                self.$emit('input', //  forward input event upstream
                  (parseInt(event.target.value) || 0) // fixes NaN issues
                )
              },
              keyup: function (event) {
                if (event.key === 'Enter') self.$emit('submit')
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

class ComponentInput {
  constructor (createElement, newInput) {
    return createElement('app-input', newInput.options, 
      label
    )
  }
}
