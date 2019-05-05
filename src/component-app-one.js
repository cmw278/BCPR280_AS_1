class AppOne extends AppTemplate {
  constructor (title = 'App 1') {
    super(title)
    this.currentInputValue = 0
  }
  _init () {
    super._init()
    this.newInputField('Guess', 'currentInputValue', 'checkGuess', 'gameOver')
    this.newButton('Reset', 'btn-danger', 'reset')
  }
  appResponse () { // compute function for creating the app response
    var superResponse = super.appResponse()
    if (superResponse) return superResponse
    else if (this.currentGuess < this.randomNumber) return 'Try Higher'
    else if (this.currentGuess > this.randomNumber) return 'Try Lower'
  }
  checkGuess () {
    if (!!this.gameOver) return // Fail-safe end-game
    this.nTries++
    this.currentGuess = this.currentInputValue
    if (this.currentGuess === this.randomNumber) return this.endGame()
  }
  reset () {
    super.reset()
    this.currentInputValue = 0
  }
  get data () {
    var data = super.data()
    data.currentInputValue = this.currentInputValue
    return function () {
      return data
    }
  }
  get methods () {
    return {
      reset: this.reset,
      checkGuess: this.checkGuess,
      generateRandomNumber: this.generateRandomNumber,
      endGame: this.endGame
    }
  }
}

Vue.component('app-1', new AppOne().component)
