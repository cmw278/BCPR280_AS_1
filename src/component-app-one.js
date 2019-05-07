/* global AppTemplate Vue */
class AppOne extends AppTemplate {
  constructor (title = 'App 1') {
    super(title)
  }
  _init () {
    super._init()
    this.newInputField('Guess', 'currentInputValue', 'checkGuess', 'gameOver')
    this.newButton('Reset', 'btn-danger', 'reset')
  }
  parrot () { // compute function for repeating user input
    if (this.currentGuess === null) return 'I\'m thinking of a number...'
    return 'Your guess: ' + this.currentGuess
  }
  appResponse () { // compute function for creating the app response
    var superResponse = super.appResponse()
    if (superResponse) return superResponse
    else if (this.currentGuess < this.randomNumber) return 'Try Higher'
    else if (this.currentGuess > this.randomNumber) return 'Try Lower'
  }
  checkGuess () {
    if (this.gameOver === true) return // Fail-safe end-game
    this.nTries++
    this.currentGuess = this.currentInputValue
    if (this.currentGuess === this.randomNumber) return this.endGame()
  }
  reset () {
    super.reset()
    this.currentInputValue = 0
    this.randomNumber = this.generateRandomNumber()
  }
  get data () {
    var data = super.data()
    data.currentInputValue = this.currentInputValue
    data.randomNumber = this.randomNumber
    return function () {
      return data
    }
  }
  get methods () {
    var methods = super.methods
    methods.checkGuess = this.checkGuess
    return methods
  }
  get computed () {
    var computed = super.computed
    computed.parrot = this.parrot
    return computed
  }
}

Vue.component('app-1', new AppOne().component)
