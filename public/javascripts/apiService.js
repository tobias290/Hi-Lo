export default class ApiService {
    static BASE_URL = "http://localhost:8000/api";

    static URLS = {
        hostGame: ApiService.BASE_URL + "/host-game",
        joinGame: ApiService.BASE_URL + "/join-game",
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
