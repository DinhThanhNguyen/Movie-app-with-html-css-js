'use strict';

import { sidebar } from './sidebar.js';
import { baseURL, api_key, fetchDataFromServer } from './api/apiConfig.js';
import { createMovieCard } from './movie-card.js';
import { search } from './search.js';

const genreName = window.localStorage.getItem('genreName');
const urlParam = window.localStorage.getItem('urlParam');
const pageContent = document.querySelector('[page-content]');
sidebar();

let currentPage = 1;
let totalPages = 0;
const fetchURL = `${baseURL}/discover/movie?api_key=${api_key}&sort_by=popular.desc&include_adult=false&page=${currentPage}&${urlParam}`;

fetchDataFromServer(
    `${fetchURL}`,
    function ({ results: movieList, total_pages }) {
        totalPages = total_pages;

        document.title = `${genreName} Movies`;

        const movieListElement = document.createElement('section');
        movieListElement.classList.add('movie-list', 'genre-list');
        movieListElement.ariaLabel = `${genreName} Movies`;

        movieListElement.innerHTML = `
            <div class="title-wrapper">
                <h1 class="title-large">${genreName} Movies</h1>
            </div>

            <div class="grid-list"></div>

            <div class="btn load-more" load-more>Load More</div>
        `;

        for (const movie of movieList) {
            const movieCard = createMovieCard(movie);

            movieListElement.querySelector('.grid-list').appendChild(movieCard);
        }

        /**
         * Load more button
         */

        let loadMoreBtn = movieListElement.querySelector('[load-more]');
        loadMoreBtn.addEventListener('click', function () {
            if (currentPage >= totalPages) {
                this.style.display = 'none';
                return;
            }

            currentPage++;
            this.classList.add('loading');

            fetchDataFromServer(fetchURL, function ({ results: movieList }) {
                loadMoreBtn.classList.remove('loading');

                for (const movie of movieList) {
                    const movieCard = createMovieCard(movie);

                    movieListElement.querySelector('.grid-list').appendChild(movieCard);
                }
            });
        }),
            pageContent.appendChild(movieListElement);
    },
);

search()
