/* global AppOne Vue */
class AppTwo extends AppOne {
  constructor (title = 'App 2') {
    super(title)
  }
  appResponse () { // compute function for creating the app response
    if (this.currentGuess === null) return 'It\'s between 0 and 99'
    if (this.currentGuess === this.randomNumber) {
      return 'You got it in ' + this.nTries + (this.nTries > 1 ? ' tries!' : 'try!')
    } else if (this.proximity(40)) return 'COLD'
    else if (this.proximity(20)) return 'COOL'
    else if (this.proximity(10)) return 'WARM'
    else if (this.proximity(1)) return 'HOT'
  }
  proximity (range) {
    if (Math.sqrt((this.currentGuess - this.randomNumber) ** 2) >= range) return true
    return false
  }
  get methods () {
    var methods = super.methods
    methods.proximity = this.proximity
    return methods
  }
}

Vue.component('app-2', new AppTwo().component)
