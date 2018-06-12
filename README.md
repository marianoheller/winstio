# Winstio

Pictionary-like game especially design to kill time :)


## Socket commands

From client: ->
From server: <-

Basic events:
-> `connect`:
-> `joinRoom`: `{ username }`

Room events:
-> `leaveRoom`: `{ username }`

<- `beginTurn`: `{ indexUser }`
<- `presentWords`: `{ words }`
-> `pickWord`: `{ word }`
<- `timerBegin`: `{ words }`

-> `sendDraw`:  `{ data }`
<- `updateDraw`:  `{ data }`
-> `sendChat`:  `{ text }`

<- `endTurn`:  `{ indexUser }`

