const refreshButton = document.querySelector('.refresh')
const refreshClickStream$ = Rx.Observable.fromEvent(refreshButton, 'click')
const requestOnRefreshStream$ = refreshClickStream$
  .map(ev => {
    const randomOffset = Math.floor(Math.random()*500)
    return 'https://api.github.com/users?since=' + randomOffset
    // random param of request users
  })

const startupRequestStream$ = Rx.Observable.of('https://api.github.com/users')

// NOTE Merge two url-observable stream of different situation
const responseStream$ = startupRequestStream$.merge(requestOnRefreshStream$)
  // .do(requestUrl => console.info('requestUrl', requestUrl))
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  )

createSuggestionStream = resp$ => (
  resp$.map(listUser => listUser[Math.floor(Math.random()*listUser.length)])
  .startWith(null)
  // NOTE init value of stream; let user DOM hide on init
  // NOTE can we call startWith then call map?
  .merge(refreshClickStream$.map(ev => null))
  // NOTE merge refreshClickStream with mapping to null
  //   - we can immediately hide the DOM on refreshClick, waiting ajax resolved
)

const suggestion1Stream$ = createSuggestionStream(responseStream$)
const suggestion2Stream$ = createSuggestionStream(responseStream$)
const suggestion3Stream$ = createSuggestionStream(responseStream$)

// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
  console.info('suggestedUser', suggestedUser)
  const suggestionEl = document.querySelector(selector)
  if (suggestedUser === null) {
    suggestionEl.style.visibility = 'hidden'
  } else {
    suggestionEl.style.visibility = 'visible'
    const usernameEl = suggestionEl.querySelector('.username')
    usernameEl.href = suggestedUser.html_url
    usernameEl.textContent = suggestedUser.login
    const imgEl = suggestionEl.querySelector('img')
    imgEl.src = ""
    imgEl.src = suggestedUser.avatar_url
  }
}

suggestion1Stream$.subscribe(user => { renderSuggestion(user, '.suggestion1') })
suggestion2Stream$.subscribe(user => { renderSuggestion(user, '.suggestion2') })
suggestion3Stream$.subscribe(user => { renderSuggestion(user, '.suggestion3') })
