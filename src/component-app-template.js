class AppTemplate { // eslint-disable-line no-unused-vars
  constructor (title = 'Default App Template') {
    this.reset()
    this.title = title
    this.slots = []
    this.inputs = []
    this.buttons = []
    this._init()
  }
  _init () {
    this.newSlot('user-input', 'parrot')
    this.newSlot('app-response', 'appResponse')
  }
  appResponse () {
    if (this.currentGuess === null) return 'It\'s between 0 and 99'
    if (this.currentGuess === this.randomNumber) {
      return 'You got it in ' + this.nTries + (this.nTries > 1 ? ' tries!' : ' try!')
    }
  }
  reset () {
    this.gameOver = false
    this.currentGuess = null
    this.nTries = 0
  }
  generateRandomNumber (min = 0, max = 99) {
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
      for (let {
        label,
        options: { model, disabled, submit }
      } of inputs) {
        childNodes.push(
          createElement(
            'app-input',
            {
              props: {
                value: this[model],
                disabled: this[disabled]
              },
              on: {
                submit: () => this[submit](),
                input: (newVal) => { this[model] = newVal }
              }
            },
            label
          )
        )
      }
      // card-button nodes
      for (let {
        labels,
        options: { newClass, disabled, submit }
      } of buttons) {
        labels = labels instanceof Array ? labels : [labels]
        childNodes.push(
          createElement(
            'app-button',
            {
              props: {
                customClass: newClass,
                disabled: this[disabled],
                labels: labels
              },
              on: {
                submit: (btn) => this[submit](btn)
              }
            }
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
    data.nTries = this.nTries
    return function () {
      return data
    }
  }
  get methods () {
    var methods = Object.create(null)
    methods.reset = this.reset
    methods.generateRandomNumber = this.generateRandomNumber
    methods.endGame = this.endGame
    return methods
  }
  get computed () {
    return {
      appResponse: this.appResponse
    }
  }
  newSlot (slot, key) {
    this.slots.push({ slot, key })
  }
  newInputField (label, model, submit, disabled = false) {
    var options = { model, disabled, submit }
    this.inputs.push({ label, options })
  }
  newButton (labels, newClass, submit, disabled = false) {
    var options = { newClass, submit, disabled }
    this.buttons.push({ labels, options })
  }
}
