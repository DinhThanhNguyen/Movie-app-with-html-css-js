'use strict';

import { baseURL, api_key, fetchDataFromServer } from './api/apiConfig.js';
import { createMovieCard } from './movie-card.js';

export function search() {
    const searchWrapper = document.querySelector('[search-wrapper]');
    const searchField = document.querySelector('[search-field]');

    const searchResultModal = document.createElement('div');
    searchResultModal.classList.add('search-modal');

    document.querySelector("main").appendChild(searchResultModal);

    let searchTimeOut;
    searchField.addEventListener('input', function () {
        if (!searchField.value.trim()) {
            searchResultModal.classList.remove('active');
            searchWrapper.classList.remove('searching');
            clearTimeout(searchTimeOut);
            return;
        }

        searchWrapper.classList.add('searching');
        clearTimeout(searchTimeOut);

        searchTimeOut = setTimeout(function () {
            fetchDataFromServer(
                `${baseURL}/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false`,
                function ({ results: movieList }) {
                    searchWrapper.classList.remove('searching');
                    searchResultModal.classList.add('active');
                    searchResultModal.innerHTML = ''; //Remove old result

                    searchResultModal.innerHTML = `
                        <p class="label">Results for</p>
                        <h1 class="heading">${searchField.value}</h1>
                        <div class="movie-list">
                            <div class="grid-list"></div>
                        </div>
                    `;

                    for (const movie of movieList) {
                        const movieCard = createMovieCard(movie);

                        searchResultModal.querySelector('.grid-list').appendChild(movieCard);
                    }

                    if(document.querySelector(".search-modal.active")) {
                        document.body.style.overflow = "hidden"
                    }
                },
            );
        }, 500);
    });
}
