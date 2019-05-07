/* global Vue AppTemplate */
class AppThree extends AppTemplate {
  constructor (title = 'App 3') {
    super(title)
  }
  _init () {
    this.newSlot('app-response', 'appResponse')
    this.newButton(['Try Higher', 'Try Lower'], 'btn-info', 'guessAgain', 'gameOver')
    this.newButton('Correct', 'btn-success', 'guessAgain', 'gameOver')
    this.newButton('Reset', 'btn-danger', 'reset')
  }
  reset () {
    super.reset()
    this.limitLow = 0
    this.limitHigh = 99
    this.currentGuess = this.generateRandomNumber()
  }
  appResponse () { // compute function for creating the app response
    if (this.gameOver && this.limitHigh !== this.limitLow) {
      return 'I got it in ' + this.nTries + (this.nTries > 1 ? ' tries!' : ' try!')
    } else if (this.gameOver) {
      return 'Hey! You cheated!'
    }
    return 'Is your number ' + this.currentGuess + '?'
  }
  guessAgain (response) {
    var sterilisedResponse = response.toLowerCase() // convert to camelCase to call function
      .trim()
      .split(/\s/g)
      .map((word, index) => {
        if (index !== 0) { // don't change the first word
          word = word[0].toUpperCase() + word.slice(1) // make the first letter uppercase
        }
        return word // return the ammended word
      }).join('') // end of camelCase conversion
    if (typeof this[sterilisedResponse] === 'function') { // Only try calling if it is a valid function
      if (this.limitHigh !== this.limitLow && this.limitHigh > this.limitLow) {
        this[sterilisedResponse]()
      } else {
        this.gameOver = true
      }
    }
  }
  tryHigher () {
    this.limitLow = this.currentGuess + 1
    this.currentGuess = this.generateRandomNumber(this.limitLow, this.limitHigh)
    this.nTries++
  }
  tryLower () {
    this.limitHigh = this.currentGuess - 1
    this.currentGuess = this.generateRandomNumber(this.limitLow, this.limitHigh)
    this.nTries++
  }
  correct () {
    this.gameOver = true
  }
  get data () {
    var data = super.data()
    data.limitHigh = this.limitHigh
    data.limitLow = this.limitLow
    return function () {
      return data
    }
  }
  get methods () {
    var methods = super.methods
    methods.guessAgain = this.guessAgain
    methods.tryHigher = this.tryHigher
    methods.tryLower = this.tryLower
    methods.correct = this.correct
    return methods
  }
}

Vue.component('app-3', new AppThree().component)
