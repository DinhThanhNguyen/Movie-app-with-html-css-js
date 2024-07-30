'use strict';

const baseURL = 'https://api.themoviedb.org/3';
const api_key = '477b53a9912d17797eb7bad11416cb15';
const imageBaseURL = 'https://image.tmdb.org/t/p/'

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export {baseURL, api_key, imageBaseURL, fetchDataFromServer}
