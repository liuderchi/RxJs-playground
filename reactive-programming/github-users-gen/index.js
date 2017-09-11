const refreshButton = document.querySelector('.refresh')

const requestStream$ = Rx.Observable.of('https://api.github.com/users')

const responseStream$ = requestStream$
  // .flatMap(requestUrl =>  // NOTE flatMap is now an alias for mergeMap
  // but will work just the same.
  .mergeMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  )
// NOTE for the only reqUrl in requestStream, generate corresponding
// meta stream Observable then use flatMap to flatten it
//   - we must generate another stream since we need do async request

const createSuggestionStream = resp$ => (
  resp$.map(listUser =>
    listUser[Math.floor(Math.random()*listUser.length)]
))
// map the resolved/rejected value of promise observable
// into another value: random chosen user object, as a 'suggestion' stream


const suggestion1Stream$ = createSuggestionStream(responseStream$)
const suggestion2Stream$ = createSuggestionStream(responseStream$)
const suggestion3Stream$ = createSuggestionStream(responseStream$)

function renderSuggestion(userData, selector) {
  const element = document.querySelector(selector)
  const usernameEl = element.querySelector('.username')
  usernameEl.href = userData.html_url
  usernameEl.textContent = userData.login
  const imgEl = element.querySelector('img')
  imgEl.src = userData.avatar_url
}

// subscribe each suggestion stream with Cb to manipulate DOM
suggestion1Stream$.subscribe(user => {
  renderSuggestion(user, '.suggestion1')
})
suggestion2Stream$.subscribe(user => {
  renderSuggestion(user, '.suggestion2')
})
suggestion3Stream$.subscribe(user => {
  renderSuggestion(user, '.suggestion3')
})


// NOTE raw flow of Observable api
// url ---of()--> observable-of-string
// ---mergeMap(()=>Observable.fromPromise())--> observable-of-promise
// ---map()--> observable-of-userData
// ---subscribe(domOp)--> subscription stream starts
