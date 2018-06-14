# Winstio

Pictionary-like game especially design to kill time :)


## Socket commands

From client: ->
From server: <-

Basic events:
-> `connect`:

-> `joinRoom`: `{ username }`
<- `roomJoined`: `{ roomId }`
<- `joinRoomFailed`: `{ error }`
-> `leaveRoom`: `{ username, roomId }`
<- `roomLeft`: `{ username }`

<- `beginTurn`: `{ username }`
<- `presentWords`: `{ words }`
-> `pickWord`: `{ word }`
<- `timerBegin`: `{ words }`

-> `sendDraw`:  `{ data }`
<- `updateDraw`:  `{ data }`
-> `sendChat`:  `{ text }`

<- `endTurn`:  `{ indexUser }`

