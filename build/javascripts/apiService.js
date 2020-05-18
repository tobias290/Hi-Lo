export default class ApiService {
    //static BASE_URL = "http://192.168.1.123:8000/game"; // For Development
    // static WS_BASE_URL = "ws://192.168.1.123:8000/ws";

    static BASE_URL = `${window.location.origin}/game`; // For Building
    static WS_BASE_URL = `wss://${window.location.hostname}/ws`;

    static URLS = {
        hostGame: ApiService.BASE_URL + "/host",
        joinGame: ApiService.BASE_URL + "/join",
        gameState: (gameCode) => ApiService.BASE_URL + `/${gameCode}/state`,
        startGame: (gameCode) => ApiService.BASE_URL + `/${gameCode}/start`,
        pickStartingCard: (gameCode) => ApiService.BASE_URL + `/${gameCode}/pick-starting-card`,
        takeCardIntoHand: (gameCode) => ApiService.BASE_URL + `/${gameCode}/turn-pick-card`,
        placeCardOnBoard: (gameCode) => ApiService.BASE_URL + `/${gameCode}/turn-place-card`,
        revealCardOnBoard: (gameCode) => ApiService.BASE_URL + `/${gameCode}/turn-reveal-card`,
        startNextRound: (gameCode) => ApiService.BASE_URL + `/${gameCode}/start-next-round`,
        endGame: (gameCode) => ApiService.BASE_URL + `/${gameCode}/end-game`,
    };

    static WS_URLS = {
        game: (gameCode) => `${ApiService.WS_BASE_URL}/${gameCode}`,
    }

    static get(url, queryParams = {}) {
        url += "?";

        for (let [key, value] of Object.entries(queryParams))
            url += `${key}=${value}&`;

        url = url.substring(0, url.length - 1); // Remove last '&' character

        return new Promise((resolve, reject) =>  {
            fetch(url)
                .then(resp => resp.json())
                .then(resp => resolve(resp))
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }
}
