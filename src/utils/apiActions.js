const API_URL = "http://localhost:8080";
export const get = (url) => {
    return fetch(`${API_URL}/${url}`, {credentials: "include"})
        .then((response) => response.json())
        .catch((err) => console.log(err));
}

export const patch = (url, data) => {
    return fetch(`${API_URL}/${url}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
}