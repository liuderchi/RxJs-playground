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

const randomChoose = array => array[Math.floor(Math.random() * array.length)]

const createSuggestionStream = (resp$) => (resp$.map(  // map a stream
  // ({ data }) => data.map(({ login }) => login)  // map data array
  ({ data }) => randomChoose(data)
))

// response$.subscribe(resp => console.log(resp.data.map(usr => usr.login)))
const userSuggestion1$ = createSuggestionStream(response$)
const userSuggestion2$ = createSuggestionStream(response$)
const userSuggestion3$ = createSuggestionStream(response$)


userSuggestion1$.subscribe(user => {
  const { login: userId, html_url, avatar_url } = user
  console.log(`${userId}: ${html_url}, ${avatar_url}`)
})
