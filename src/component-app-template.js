/* global Vue */
class AppTemplate {
  constructor (title = 'Default App Template') {
    this.gameOver = false
    this.currentGuess = null
    this.randomNumber = this.generateRandomNumber()
    this.nTries = 0
    this.title = title
    this.slots = []
    this.inputs = []
    this.buttons = []
    this._init()
  }
  _init () {
    this.newSlot('user-input', 'parrot' )
    this.newSlot('app-response', 'appResponse')
  }
  parrot () { // compute function for repeating user input
    if (this.currentGuess === null) return 'I\'m thinking of a number...'
    return 'Your guess: ' + this.currentGuess
  }
  appResponse () {
    if (this.currentGuess === null) return 'It\'s between 1 and 99'
    if (this.currentGuess === this.randomNumber)
      return 'You got it in ' + this.nTries + (this.nTries > 1 ? ' tries!' : 'try!')
  }
  reset () {
    this.gameOver = false
    this.currentGuess = null
    this.randomNumber = this.generateRandomNumber()
    this.nTries = 0
  }
  generateRandomNumber (min = 1, max = 99) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  endGame () {
    this.gameOver = true
  }
  get component () {
    return {
      render: this.render,
      data: this.data,
      methods: this.methods,
      computed: this.computed
    }
  }
  get render () {
    var { title, slots, inputs, buttons } = this
    return function (createElement) {
      var childNodes = [] // Children to attach to app-card element
      // card-text slot nodes
      for (let { slot, key } of slots) {
        childNodes.push(
          createElement('template', { slot: slot }, this[key])
        )
      }
      // card-input nodes
      for (let { label,
                  options: { model, disabled, submit }
                } of inputs) {
        childNodes.push(
          createElement(
            'app-input',
            {
              props: {
                'value': this[model],
                'disabled': this[disabled]
              },
              on: {
                submit: () => this[submit](),
                input: (newVal) => this[model] = newVal
              }
            },
            label 
          )
        )
      }
      // card-button nodes
      for (let { label, options: {
        newClass, disabled, submit
      } } of buttons) {
        childNodes.push(
          createElement(
            'app-button',
            {
              class: newClass,
              props: {
                disabled: this[disabled]
              },
              on: {
                submit: () => this[submit]()
              }
            },
            label
          )
        )
      }
      return createElement('app-card',
        { attrs: { title: title } },
        [ createElement('app-text', childNodes) ]
      )
    }
  }
  get data () {
    var data = Object.create(null)
    data.gameOver = this.gameOver
    data.currentGuess = this.currentGuess
    data.randomNumber = this.randomNumber
    data.nTries = this.nTries
    return function () {
      return data
    }
  }
  get methods () {
    return {
      reset: this.reset,
      generateRandomNumber: this.generateRandomNumber,
      endGame: this.endGame
    }
  }
  get computed () {
    return {
      appResponse: this.appResponse,
      parrot: this.parrot
    }
  }
  newSlot (slot, key) {
    this.slots.push({ slot, key })
  }
  newInputField (label, model, submit, disabled = false) {
    var options = { model, disabled, submit }
    this.inputs.push({ label, options })
  }
  newButton (label, newClass, submit, disabled = false) {
    var options = { newClass, submit, disabled }
    this.buttons.push({ label, options })
  }
}
