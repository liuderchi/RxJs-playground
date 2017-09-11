// Introduction to Reactive Programming - Lec 1

// https://egghead.io/lessons/rxjs-understand-reactive-programming-using-rxjs


// NOTE vallina JS array

const array = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']

console.log('sum of array:\n',
  array
    .map(x => parseInt(x))
    .filter(x => ! isNaN(x))
    .reduce((acc, cur) => acc + cur),
  '\n'
)

// NOTE Rx array in action

const Rx = require('rxjs/Rx')

// source of event (string) stream
const source = Rx.Observable.interval(400).take(9)
  .map(i => array[i])
// what i feel about stream: sequential event pops up, so the handling Cb will be called in sequential

// create a stream that map with parseInt to source stream
const result = source
  .map(x => parseInt(x))
  .filter(x => ! isNaN(x))
  .do(x => console.log('here we got', x))  // NOTE it is a side effect, will NOT modify the stream
  .reduce((acc, cur) => acc + cur)

console.log(typeof result)


// add Cb to handle the event
const subscription = result.subscribe(x => console.log(x))
console.log(typeof subscription)

console.log('sum of the observable array as an event stream:')
