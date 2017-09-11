// Introduction to Reactive Programming - Lec 3

// https://egghead.io/lessons/rxjs-reactive-programming-why-choose-rxjs

// It enforce you to specify the dynamic behavior of a value
// completely at the time of declaration


const Rx = require('rxjs/Rx')

var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);
// declare streamB behavior once, B would always reflects A

streamB.subscribe(b => console.log(b));
