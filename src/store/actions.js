import { API_SERVICE, TOURNAMENT_SERVICE, PLAYER_SERVICE } from '../common/api'
import { addToken, deleteToken } from '../common/jwt.storage'
import WEBSOCKET_SERVICE from '../common/websocketApi'

export default {
  /*
    Add a player to the players list
   */
  addPlayer: ({ commit }, payload) => {
    commit('addPlayer', payload)
  },
  /*
    Remove player from tournament
    Payload has to contain the id and the list index of the player to be removed
   */
  removePlayer: ({ commit }, payload) => {
    if (payload.started === true) {
      commit('removePlayer', payload.player)
      return TOURNAMENT_SERVICE.patch(`set-player-inactive/${payload.id}`, payload.msg)
    } else {
      TOURNAMENT_SERVICE.delete(`delete-player/${payload.id}?msg=${payload.msg}`)
      commit('removePlayer', payload.player)
    }
  },
  /*
    Send a tournament to the server.
   */
  sendTournament: ({ commit }, tournament) => {
    return API_SERVICE.post('new-tournament', tournament).then(res => {
      // Adds the tournament ID received from the server to the payload.
      tournament['user_id'] = res.data.tournament_id
      addToken(res.data.jwt)
      // Adds the payload (tournament) to the state in store.
      commit('addTournament', tournament)
    }).then(res => {
      API_SERVICE.setHeader()
    })
  },
  /*
    Send a player to the server
   */
  sendPlayer: ({ commit }, player) => {
    return API_SERVICE.post('new-player', player).then(res => {
      addToken(res.data.jwt)
      commit('createPlayer', player)
    }).then(res => {
      API_SERVICE.setHeader()
    })
  },
  /*
    Fetch a tournament from the server. Use uuid if token linked to a tournament user is absent
   */
  fetchTournament: ({ commit }) => {
    return TOURNAMENT_SERVICE.get('information').then(res => {
      commit('addTournament', res.data)
    })
  },
  signInUUID: ({ NULL }, uuid) => {
    return API_SERVICE.get(`sign-in/${uuid}`).then(res => {
      addToken(res.data.jwt)
    }).then(res => {
      API_SERVICE.setHeader()
    })
  },
  /*
    Fetch the tournament a player is enrolled in
   */
  fetchPlayersTournament: ({ commit }) => {
    return PLAYER_SERVICE.get('tournament').then(res => {
      commit('addTournament', res.data)
    })
  },

  /*
    Fetch the player using the application.
   */
  fetchPlayer: ({ commit }) => {
    return PLAYER_SERVICE.get('information').then(res => {
      commit('createPlayer', res.data)
    })
  },
  hostFetchPlayer: ({ NULL }, payload) => {
    API_SERVICE.setHeader()
    return TOURNAMENT_SERVICE.get(`player/${payload.id}`)
  },
  /*
    Sends a request to leave to the server
   */
  sendLeaveRequest: ({ commit }, started) => {
    let slug
    started ? slug = 'set-inactive' : slug = 'delete-player'
    return PLAYER_SERVICE.patch(slug).then(res => {
      deleteToken()
    })
  },
  fetchResults: () => {
    return PLAYER_SERVICE.get('games').catch(err => {
      throw err
    })
  },
  /*
    Send a game result to the server.
   */
  sendGameResult: ({ commit }, payload) => {
    return PLAYER_SERVICE.put(`add-result?result=${payload.result}&opponent=${payload.opponent}`)
  },
  /*
    Send pause request
   */
  sendPauseRequest: () => {
    return PLAYER_SERVICE.patch('pause').catch(err => {
      throw err
    })
  },
  /*
    Send unpause request
   */
  sendUnpauseRequest: () => {
    return PLAYER_SERVICE.patch('unpause').catch(err => {
      throw err
    })
  },
  sendStartRequest: () => {
    return TOURNAMENT_SERVICE.patch('start').catch(err => {
      throw err
    })
  },
  /*
  Unsubscribe from the enpoint
  @Param subscription. Subscription object that contains id and unsubscribe function.
   */
  unsubscribe: ({ NULL }, subscription) => {
    WEBSOCKET_SERVICE.unsubscribe(subscription)
  },
  /*
  Unsubscribe all STOMP subscriptions
   */
  unsubscribeAll: ({ NULL }) => {
    WEBSOCKET_SERVICE.unsubscribeAll()
  },
  /*
  Close the websocket.
   */
  close: () => {
    WEBSOCKET_SERVICE.close()
  },
  subscribeToLobbySubscriptions: ({ commit, dispatch }, payload) => {
    let activeSubscription
    let playerSubscription
    dispatch('getActiveSubscription', ['tournament']).then(res => {
      activeSubscription = res
    }).then(res =>
      dispatch('getPlayerSubscription', [payload.started]).then(res => {
        playerSubscription = res
      })
    ).then(res => WEBSOCKET_SERVICE.connect([activeSubscription, playerSubscription]))
  },
  subscribeToTournamentSubscriptions: ({ commit, dispatch }, payload) => {
    let playerSubscription
    dispatch('getPlayerSubscription', [payload.started]).then(res => {
      playerSubscription = res
    }).then(res =>
      WEBSOCKET_SERVICE.connect([playerSubscription]
      ))
  },
  getActiveSubscription: ({ commit }, userRole) => {
    let activeCallback = function (res) {
      let active = JSON.parse(res.body).active
      commit('setTournamentActive', active)
    }
    let path = userRole[0] === 'player' ? 'player/tournament-active' : 'tournament/active'
    return { path: path, callback: activeCallback }
  },
  getPlayerSubscription: ({ commit }, started) => {
    let playerCallback = function (res) {
      let players = JSON.parse(res.body)
      if (players.length >= 0) {
        commit('addPlayers', players)
      }
    }
    let slug
    started[0] ? slug = 'leaderboard' : slug = 'players'
    return { path: 'tournament/' + slug, callback: playerCallback }
  },
  getActiveGameSubscription: ({ commit }) => {
    let newGameCallback = function (res) {
      let newGame = JSON.parse(res.body)
      commit('setActiveGame', newGame)
      commit('setPaired', true)
    }
    return { path: 'player/active-game', callback: newGameCallback }
  },
  getPointsSubscription: ({ commit }) => {
    let pointCallback = function (res) {
      let points = JSON.parse(res.body).points
      commit('setPoints', points)
    }
    return { path: 'player/points', callback: pointCallback }
  },
  subscribeToPlayerLobbySubscriptions: ({ commit, dispatch }, playerKickedCallback) => {
    let playerKickedSubscription = {
      path: 'player/removed',
      callback: playerKickedCallback
    }
    let tournamentActiveSubscription
    let activeGameSubscription
    let pointsSubscription
    dispatch('getActiveSubscription', ['player'])
      .then(res => { tournamentActiveSubscription = res })
      .then(dispatch('getActiveGameSubscription').then(res => { activeGameSubscription = res }))
      .then(dispatch('getPointsSubscription').then(res => { pointsSubscription = res }))
      .then(res => WEBSOCKET_SERVICE.connect([playerKickedSubscription, tournamentActiveSubscription,
        activeGameSubscription, pointsSubscription]))
  }
}
