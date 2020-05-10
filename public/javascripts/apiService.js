export default class ApiService {
    static BASE_URL = "http://192.168.1.123:8000/game";

    static URLS = {
        hostGame: ApiService.BASE_URL + "/host",
        joinGame: ApiService.BASE_URL + "/join",
        gameState: (gameCode) => ApiService.BASE_URL + `/${gameCode}/state`,
    };

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
