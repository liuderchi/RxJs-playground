// Introduction to Reactive Programming - Lec 4

// https://egghead.io/lessons/rxjs-use-rxjs-async-requests-and-responses

const { Observable } = require('rxjs/Rx')
const axios = require('axios')

const request$ = Observable.of('https://api.github.com/users')
// NOTE simple stream with one event of string value

// OPT 1. use map()
const response$ = request$
  // .map(reqUrl => Observable.fromPromise(axios.get(reqUrl))) // NOTE just returns a promise as event value
  // .flatMap(reqUrl => Observable.fromPromise(axios.get(reqUrl)))  // NOTE works but deprecate
  .concatMap(reqUrl => Observable.fromPromise(axios.get(reqUrl)))  // NOTE Rx5 api, flatten a stream
// NOTE concatMap is like .then of promise

response$.subscribe(resp => console.log(resp.data.map(usr => usr.login)))

// OPT 2. BAD: create a new stream in sub Cb (create meta stream (forked))
// NOTE with concatMap(0) you don't have to subscribe inside a subscribe Cb (nested subscribe)
// request$.subscribe(reqUrl => {
//   response$ = Observable.fromPromise(axios.get(reqUrl))
//   response$.subscribe(resp => console.log(resp.data.map(usr => usr.login)))
// })
