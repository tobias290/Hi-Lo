(this.webpackJsonpskyjo=this.webpackJsonpskyjo||[]).push([[0],{11:function(e,t,a){e.exports=a(17)},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(8),i=a.n(s),o=a(2),l=a(3),c=a(1),u=a(5),m=a(4),p=a(10),d=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,null,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e+="?";for(var a=0,r=Object.entries(t);a<r.length;a++){var n=Object(p.a)(r[a],2),s=n[0],i=n[1];e+="".concat(s,"=").concat(i,"&")}return e=e.substring(0,e.length-1),new Promise((function(t,a){fetch(e).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){console.error(e),a(e)}))}))}}]),e}();d.BASE_URL="".concat(window.location.origin,"/game"),d.WS_BASE_URL="wss://".concat(window.location.hostname,"/ws"),d.URLS={hostGame:d.BASE_URL+"/host",joinGame:d.BASE_URL+"/join",gameState:function(e){return d.BASE_URL+"/".concat(e,"/state")},startGame:function(e){return d.BASE_URL+"/".concat(e,"/start")},pickStartingCard:function(e){return d.BASE_URL+"/".concat(e,"/pick-starting-card")},takeCardIntoHand:function(e){return d.BASE_URL+"/".concat(e,"/turn-pick-card")},placeCardOnBoard:function(e){return d.BASE_URL+"/".concat(e,"/turn-place-card")},revealCardOnBoard:function(e){return d.BASE_URL+"/".concat(e,"/turn-reveal-card")},startNextRound:function(e){return d.BASE_URL+"/".concat(e,"/start-next-round")},endGame:function(e){return d.BASE_URL+"/".concat(e,"/end-game")}},d.WS_URLS={game:function(e){return"".concat(d.WS_BASE_URL,"/").concat(e)}};var h=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={showHostGameForm:!1,showJoinGameForm:!1,failedToJoinGame:!1,errorMessage:""},r.hostPlayerNameInput=n.a.createRef(),r.joinPlayerNameInput=n.a.createRef(),r.joinGameCode=n.a.createRef(),r.hostGame=r.hostGame.bind(Object(c.a)(r)),r.joinGame=r.joinGame.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"hostGame",value:function(e){var t=this;e.preventDefault(),d.get(d.URLS.hostGame,{player:this.hostPlayerNameInput.current.value}).then((function(e){return t.props.joinGame(e.player_name,e.game_code)}))}},{key:"joinGame",value:function(e){var t=this;e.preventDefault(),this.setState({failedToJoinGame:!1}),d.get(d.URLS.joinGame,{player:this.joinPlayerNameInput.current.value,gameCode:this.joinGameCode.current.value.toUpperCase()}).then((function(e){e.success?t.props.joinGame(e.player_name,e.game_code):t.setState({failedToJoinGame:!0,errorMessage:e.error})}))}},{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"title"},"Hi-LO"),!this.state.showHostGameForm&&!this.state.showJoinGameForm&&n.a.createElement("div",{className:"options"},n.a.createElement("button",{className:"button button--x-large",onClick:function(){return e.setState({showHostGameForm:!0})}},"Host Game"),n.a.createElement("button",{className:"button button--x-large",onClick:function(){return e.setState({showJoinGameForm:!0})}},"Join Game")),this.state.showHostGameForm&&n.a.createElement("form",{className:"options form",onSubmit:this.hostGame},n.a.createElement("input",{className:"form__input form__input--x-large",name:"player",type:"text",placeholder:"Player Name",required:!0,minLength:"3",ref:this.hostPlayerNameInput}),n.a.createElement("div",null,n.a.createElement("input",{className:"button button--x-large",type:"button",value:"Back",onClick:function(){return e.setState({showHostGameForm:!1,showJoinGameForm:!1})}}),"\xa0\xa0",n.a.createElement("input",{className:"button button--x-large",type:"submit",value:"Host"}))),this.state.showJoinGameForm&&n.a.createElement("form",{className:"options form",onSubmit:this.joinGame},this.state.failedToJoinGame&&n.a.createElement("h2",{className:"error",style:{margin:0}},this.state.errorMessage),n.a.createElement("input",{className:"form__input form__input--x-large",name:"player",type:"text",placeholder:"Player Name",required:!0,minLength:"3",ref:this.joinPlayerNameInput}),n.a.createElement("input",{className:"form__input form__input--x-large form__input--text-center",name:"code",type:"text",placeholder:"Game Code",pattern:"[A-Za-z][A-ZA-Za-z][A-ZA-Za-z][A-ZA-Za-z]",required:!0,minLength:"4",maxLength:"4",style:{textTransform:"uppercase"},ref:this.joinGameCode}),n.a.createElement("div",null,n.a.createElement("input",{className:"button button--x-large",type:"button",value:"Back",onClick:function(){return e.setState({showHostGameForm:!1,showJoinGameForm:!1})}}),"\xa0\xa0",n.a.createElement("input",{className:"button button--x-large",type:"submit",value:"Join"}))))}}]),a}(n.a.Component),g=(a(16),a(9)),y=function e(){Object(o.a)(this,e)};y.PLAYERS_JOINING=0,y.PLAYERS_PICKING_STARTING_CARDS=1,y.PLAYER_TURN=2,y.FINAL_ROUND=3,y.ROUND_END=4,y.GAME_END=5;var C=function e(){Object(o.a)(this,e)};C.PICKING_CARD=0,C.PLACING_CARD=1,C.REVEAL_CARD=2;var f=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={errorMessage:""},r.players=r.players.bind(Object(c.a)(r)),r.playersTop=r.playersTop.bind(Object(c.a)(r)),r.playersBottom=r.playersBottom.bind(Object(c.a)(r)),r.startGame=r.startGame.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"startGame",value:function(){var e=this;d.get(d.URLS.startGame(this.props.gameCode)).then((function(t){t.success||e.setState({errorMessage:t.error})}))}},{key:"players",value:function(){var e=this;return this.props.players.filter((function(t){return t.name!==e.props.playerName}))}},{key:"playersTop",value:function(){var e=this.players();return e.length>4?e.slice(0,4):e}},{key:"playersBottom",value:function(){var e=this.players();return e.length>4?e.slice(4,e.length):[]}},{key:"render",value:function(){return n.a.createElement("div",{className:"players-joining"},n.a.createElement("div",{className:"players"},this.playersTop().map((function(e){return n.a.createElement("span",{key:e.name},e.name)})),0===this.playersTop().length?n.a.createElement("h2",null,"No other players"):null),this.props.playerIsHost?n.a.createElement("button",{className:"button button--x-large",onClick:this.startGame},"Start Game"):n.a.createElement("h1",null,"Waiting for host to start the game..."),n.a.createElement("div",{className:"players"},this.playersBottom().map((function(e){return n.a.createElement("span",{key:e.name},e.name)}))),""!==this.state.errorMessage&&n.a.createElement("h1",{className:"error"},this.state.errorMessage))}}]),a}(n.a.Component),v=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).card=n.a.createRef(),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=function(){var t=window.innerHeight,a=window.innerWidth,r=t<a?t:a;e.card.current.style.height="".concat(.175*r,"px"),e.card.current.style.width="".concat(.1*r,"px"),e.card.current.style.fontSize="".concat(.001*r,"rem")};window.addEventListener("resize",t),t()}},{key:"getCardColor",value:function(e){return e<0?"#00008b":0===e?"#00e5e5":e>=0&&e<5?"#00FF00":e>=5&&e<9?"#E5E500":e>=9?"#FF0000":void 0}},{key:"underlineCard",value:function(){return 6===this.props.value||9===this.props.value}},{key:"render",value:function(){return this.props.isPlaceholder?this.renderPlaceholder():null===this.props.value?this.renderBackSide():this.renderFaceSide()}},{key:"renderPlaceholder",value:function(){return n.a.createElement("div",{ref:this.card,className:"card card--placeholder ".concat(this.props.isInteractable?"card--hover-effect":""),onClick:this.props.isInteractable?this.props.onClick:function(){}},this.props.value)}},{key:"renderBackSide",value:function(){return n.a.createElement("div",{ref:this.card,className:"card card--back ".concat(this.props.isInteractable?"card--hover-effect":""),onClick:this.props.isInteractable?this.props.onClick:function(){}},n.a.createElement("span",null,"Hi-Lo"),n.a.createElement("span",null,"Hi-Lo"))}},{key:"renderFaceSide",value:function(){return n.a.createElement("div",{ref:this.card,className:"card card--face ".concat(this.props.isInteractable?"card--hover-effect":""),onClick:this.props.isInteractable?this.props.onClick:function(){},style:{background:this.getCardColor(this.props.value)}},n.a.createElement("span",{className:this.underlineCard()?"card--underline-value":""},this.props.value),n.a.createElement("h1",{className:this.underlineCard()?"card--underline-value":""},this.props.value),n.a.createElement("span",{className:this.underlineCard()?"card--underline-value":""},this.props.value))}}]),a}(n.a.Component);v.defaultProps={isPlaceholder:!1,isInteractable:!1,onClick:function(){}};var E=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).renderCards=r.renderCards.bind(Object(c.a)(r)),r.cardsInteractable=r.cardsInteractable.bind(Object(c.a)(r)),r.getCardAction=r.getCardAction.bind(Object(c.a)(r)),r.pickStartingCard=r.pickStartingCard.bind(Object(c.a)(r)),r.placeCard=r.placeCard.bind(Object(c.a)(r)),r.flipCard=r.flipCard.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"renderCards",value:function(e){for(var t=[],a=0;a<3;a++)for(var r in this.props.board.cards)t.push(e(this.props.board.cards[r][a],r,a));return t}},{key:"cardsInteractable",value:function(e,t){return this.props.isClientsPlayersTurn&&this.props.game.currentPhase===y.PLAYERS_PICKING_STARTING_CARDS||this.props.isClientsPlayersTurn&&this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase===C.PLACING_CARD||this.props.isClientsPlayersTurn&&this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase===C.REVEAL_CARD&&!this.props.board.cards[e][t].faceUp}},{key:"getCardAction",value:function(e,t){this.props.isClientsPlayersTurn&&this.props.game.currentPhase===y.PLAYERS_PICKING_STARTING_CARDS?this.pickStartingCard(e,t):this.props.isClientsPlayersTurn&&this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase===C.PLACING_CARD?this.placeCard(e,t):this.props.isClientsPlayersTurn&&this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase===C.REVEAL_CARD&&!this.props.board.cards[e][t].faceUp&&this.flipCard(e,t)}},{key:"pickStartingCard",value:function(e,t){d.get(d.URLS.pickStartingCard(this.props.game.gameCode),{column:e,row:t})}},{key:"placeCard",value:function(e,t){d.get(d.URLS.placeCardOnBoard(this.props.game.gameCode),{location:"board",column:e,row:t})}},{key:"flipCard",value:function(e,t){d.get(d.URLS.revealCardOnBoard(this.props.game.gameCode),{column:e,row:t})}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:this.props.small?"small":""},this.props.displayMessage&&""===this.props.customDisplayMessage&&n.a.createElement("div",{className:"player-board-info ".concat(this.props.centerMessage?"player-board-info__center":"")},n.a.createElement("div",null,n.a.createElement("span",null,n.a.createElement("strong",null,"Overall Score:")," ",this.props.overallScore),n.a.createElement("br",null),n.a.createElement("span",null,n.a.createElement("strong",null,"Visible Score:")," ",this.props.board.visibleScore)),n.a.createElement("span",null,n.a.createElement("strong",null,"Number of Face Up Cards:")," ",this.props.board.noOfFaceUpCards)),this.props.displayMessage&&""!==this.props.customDisplayMessage&&n.a.createElement("div",{className:"player-board-info ".concat(this.props.centerMessage?"player-board-info__center":"")},this.props.customDisplayMessage),n.a.createElement("div",{className:"player-board"},this.renderCards((function(t,a,r){return n.a.createElement(v,{isPlaceholder:"empty"===t.value,key:"".concat(a,"-").concat(r),value:t.value,isInteractable:e.cardsInteractable(a,r)&&"empty"!==t.value,onClick:function(){return e.getCardAction(a,r)}})}))))}}]),a}(n.a.Component);E.defaultProps={isClientsPlayersTurn:!1,overallScore:null,displayMessage:!1,customDisplayMessage:"",centerMessage:!1,small:!1};var b=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){return Object(o.a)(this,a),t.call(this,e)}return Object(l.a)(a,[{key:"getCardAction",value:function(e){this.props.clientPlayerPickCard?this.takeCardIntoHand(e):this.props.clientPlayerDiscardCard&&"discard"===e&&this.discardCardFromHand()}},{key:"takeCardIntoHand",value:function(e){d.get(d.URLS.takeCardIntoHand(this.props.gameCode),{deck:e})}},{key:"discardCardFromHand",value:function(){d.get(d.URLS.placeCardOnBoard(this.props.gameCode),{deck:"discard"})}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"card-stacks"},void 0!==this.props.cardInHand&&null!==this.props.cardInHand&&n.a.createElement("span",{title:"Draw Deck"},n.a.createElement("span",null,"Card in Hand"),n.a.createElement(v,{value:this.props.cardInHand.value})),n.a.createElement("span",{title:"Draw Deck"},n.a.createElement("span",null,"Draw Deck"),n.a.createElement(v,{isPlaceholder:0===this.props.stack.length,value:0===this.props.stack.length?"Stack":this.props.stack[0].value,isInteractable:this.props.clientPlayerPickCard,onClick:function(){return e.getCardAction("draw")}})),n.a.createElement("span",{title:"Discard Deck"},n.a.createElement("span",null,"Discard Deck"),n.a.createElement(v,{isPlaceholder:0===this.props.discard.length,value:0===this.props.discard.length?"Discard":this.props.discard[0].value,isInteractable:this.props.clientPlayerPickCard||this.props.clientPlayerDiscardCard,onClick:function(){return e.getCardAction("discard")}})))}}]),a}(n.a.Component),P=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={game:null,checkedForPlayerHost:!1,playerIsHost:!1},r.updateGameState=r.updateGameState.bind(Object(c.a)(r)),r.getClientPlayer=r.getClientPlayer.bind(Object(c.a)(r)),r.isClientPlayersTurn=r.isClientPlayersTurn.bind(Object(c.a)(r)),r.startNextRound=r.startNextRound.bind(Object(c.a)(r)),r.endGame=r.endGame.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.updateGameState(),this.ws=new WebSocket(d.WS_URLS.game(this.props.gameCode)),this.ws.addEventListener("message",(function(t){var a=JSON.parse(t.data);a.event==="update:game:".concat(e.props.gameCode)&&void 0!==a.game?e.setState({game:a.game}):a.event==="update:game:".concat(e.props.gameCode)&&void 0===a.game&&window.location.reload(!0)}))}},{key:"componentWillUnmount",value:function(){void 0!==this.ws&&this.ws.close()}},{key:"componentDidUpdate",value:function(e,t,a){if(null!==this.state.game&&!this.state.checkedForPlayerHost){var r,n=Object(g.a)(this.state.game.players);try{for(n.s();!(r=n.n()).done;){var s=r.value;s.name===this.props.playerName&&s.isHost&&this.setState({playerIsHost:!0,checkedForPlayerHost:!0})}}catch(i){n.e(i)}finally{n.f()}}}},{key:"updateGameState",value:function(){var e=this;d.get(d.URLS.gameState(this.props.gameCode)).then((function(t){t.hasOwnProperty("error")?e.props.noGameExists():e.setState({game:t})}))}},{key:"startNextRound",value:function(){d.get(d.URLS.startNextRound(this.props.gameCode))}},{key:"endGame",value:function(){d.get(d.URLS.endGame(this.props.gameCode))}},{key:"getGameMessage",value:function(){var e="";return this.state.game.currentPhase===y.PLAYERS_PICKING_STARTING_CARDS&&this.isClientPlayersTurn()?e="Pick two starting cards":this.state.game.currentPhase!==y.PLAYERS_PICKING_STARTING_CARDS||this.isClientPlayersTurn()?this.state.game.currentPhase===y.PLAYERS_JOINING?e=n.a.createElement("span",null,"GAME CODE: ",n.a.createElement("strong",null,this.props.gameCode)):this.state.game.currentPhase!==y.PLAYER_TURN&&this.state.game.currentPhase!==y.FINAL_ROUND||!this.isClientPlayersTurn()?this.state.game.currentPhase!==y.PLAYER_TURN&&this.state.game.currentPhase!==y.FINAL_ROUND||this.isClientPlayersTurn()?this.state.game.currentPhase===y.ROUND_END&&(e="Round is over"):e="It is ".concat(this.state.game.players[this.state.game.currentPlayerTurnIndex].name,"'s turn"):e=this.getClientPlayer().turnPhase===C.PICKING_CARD?"Pick a card from either the deck or discard":this.getClientPlayer().turnPhase===C.PLACING_CARD?"Place the card on your board or on the discard":this.getClientPlayer().turnPhase===C.REVEAL_CARD?"Flip a card face up":"It is your turn":e="Other players are picking their two starting cards",this.state.game.currentPhase===y.FINAL_ROUND?"Final Round, ".concat(e):e}},{key:"getClientPlayer",value:function(){var e=this;return this.state.game.players.find((function(t){return t.name===e.props.playerName}))}},{key:"isClientPlayersTurn",value:function(){return this.state.game.players.indexOf(this.getClientPlayer())===this.state.game.currentPlayerTurnIndex}},{key:"render",value:function(){var e=this;return null===this.state.game?n.a.createElement("h1",null,"Loading..."):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"game-top-bar"},n.a.createElement("h1",{className:"game-top-bar__title"},"Hi-Lo"),n.a.createElement("div",{className:"game-top-bar__message"},this.getGameMessage()),n.a.createElement("div",{className:"game-top-bar__details"},n.a.createElement("span",{className:"game-top-bar__detail"},n.a.createElement("strong",null,"Player Name:")," ",n.a.createElement("span",null,this.props.playerName)),n.a.createElement("span",{className:"game-top-bar__detail"},n.a.createElement("strong",null,"Game Code:")," ",this.props.gameCode),n.a.createElement("span",{className:"game-top-bar__detail"},n.a.createElement("strong",null,"No. of Players:")," ",this.state.game.players.length,"/8"))),this.state.game.currentPhase===y.PLAYERS_JOINING&&n.a.createElement(f,{gameCode:this.props.gameCode,playerName:this.props.playerName,playerIsHost:this.state.playerIsHost,players:this.state.game.players}),(this.state.game.currentPhase===y.PLAYERS_PICKING_STARTING_CARDS||this.state.game.currentPhase===y.PLAYER_TURN||this.state.game.currentPhase===y.FINAL_ROUND)&&n.a.createElement("div",{className:"play-area"},n.a.createElement("div",{className:"play-area__right"},n.a.createElement(b,{gameCode:this.props.gameCode,clientPlayerPickCard:(this.state.game.currentPhase===y.PLAYER_TURN||this.state.game.currentPhase===y.FINAL_ROUND)&&this.getClientPlayer().turnPhase===C.PICKING_CARD&&this.isClientPlayersTurn(),clientPlayerDiscardCard:(this.state.game.currentPhase===y.PLAYER_TURN||this.state.game.currentPhase===y.FINAL_ROUND)&&this.getClientPlayer().turnPhase===C.PLACING_CARD&&this.isClientPlayersTurn(),cardInHand:this.getClientPlayer().cardInHand,stack:this.state.game.stack.stack,discard:this.state.game.discard.stack}),n.a.createElement(E,{game:this.state.game,isClientsPlayersTurn:this.isClientPlayersTurn(),board:this.getClientPlayer().board,overallScore:this.getClientPlayer().overallScore,displayMessage:!0})),n.a.createElement("div",{className:"play-area__other-players-board"},this.state.game.players.filter((function(t){return t.name!==e.getClientPlayer().name})).map((function(t,a){return n.a.createElement(E,{key:a,game:e.state.game,board:t.board,displayMessage:!0,customDisplayMessage:n.a.createElement("h3",null,t.name," ",e.state.game.players[e.state.game.currentPlayerTurnIndex].name===t.name?"(Their Turn)":""),centerMessage:!0,small:!0})})))),(this.state.game.currentPhase===y.ROUND_END||this.state.game.currentPhase===y.GAME_END)&&n.a.createElement("div",{className:"round-end-area"},n.a.createElement("h1",{className:"round-end__message"},this.state.game.currentPhase===y.ROUND_END&&"Round End",this.state.game.currentPhase===y.GAME_END&&n.a.createElement(n.a.Fragment,null,"Game End,\xa0",this.state.game.players.sort((function(e,t){return e.overallScore-t.overallScore}))[0].name," wins!")),n.a.createElement("table",{className:"scores-table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Score this round"),n.a.createElement("th",null,"Overall Score"))),n.a.createElement("tbody",null,this.state.game.players.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.board.visibleScore),n.a.createElement("td",null,e.overallScore))})))),this.state.game.currentPhase===y.ROUND_END&&n.a.createElement(n.a.Fragment,null,this.state.playerIsHost&&n.a.createElement("button",{className:"button button--x-large",onClick:this.startNextRound},"Start Next Round"),!this.state.playerIsHost&&n.a.createElement("h1",null,"Waiting for host to start next round...")),this.state.game.currentPhase===y.GAME_END&&n.a.createElement(n.a.Fragment,null,this.state.playerIsHost&&n.a.createElement("button",{className:"button button--x-large",onClick:this.endGame},"End Game"),!this.state.playerIsHost&&n.a.createElement("h1",null,"Waiting for host to end game..."))))}}]),a}(n.a.Component),N=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={showHostJoinPage:!0,playerName:"",gameCode:""},r.joinGame=r.joinGame.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){if(sessionStorage.hasOwnProperty("gameDetails")){var e=JSON.parse(sessionStorage.getItem("gameDetails"));this.setState({showHostJoinPage:!1,playerName:e.playerName,gameCode:e.gameCode})}}},{key:"joinGame",value:function(e,t){sessionStorage.setItem("gameDetails",JSON.stringify({playerName:e,gameCode:t})),this.setState({showHostJoinPage:!1,playerName:e,gameCode:t})}},{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,this.state.showHostJoinPage&&n.a.createElement(h,{joinGame:this.joinGame}),!this.state.showHostJoinPage&&n.a.createElement(P,{playerName:this.state.playerName,gameCode:this.state.gameCode,noGameExists:function(){return e.setState({showHostJoinPage:!0})}}))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.1064b4ec.chunk.js.map