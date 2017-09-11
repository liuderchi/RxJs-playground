// const Rx = require('rxjs/Rx')

const Observable = Rx.Observable
const button = document.querySelector('#start')
const label = document.querySelector('h4')

const click$ = Observable.fromEvent(button, 'click')

const doubleClick$ = click$
  // .buffer(() => click$.throttle(1000))
  .bufferTime(1000)
  // .bufferWhen(() => click$.debounceTime(250))
  .map(events => events.length)
  .filter(clickCount => clickCount === 2)

doubleClick$.subscribe(event => {
  label.textContent = 'DoubleClick'
})

doubleClick$.delay(1000).subscribe(() => {
  label.textContent = '-'
})

// doubleClick$.throttle(1000).subscribe(event => {
//   label.textContent = '-'
// })
