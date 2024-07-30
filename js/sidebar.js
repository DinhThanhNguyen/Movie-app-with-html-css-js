'use strict';

import { baseURL, api_key, fetchDataFromServer, imageBaseURL } from "./api/apiConfig.js";

export function sidebar() {
    const genreList = {}

    fetchDataFromServer(`${baseURL}/genre/movie/list?api_key=${api_key}`, function({genres}) {
        for(const {id, name} of genres) {
            genreList[id] = name
        }

        genreLink()
    });

    const sidebarInner = document.createElement("div")
    sidebarInner.classList.add("sidebar-inner");

    sidebarInner.innerHTML = `
        <div class="sidebar-list">
            <h4 class="title">Genre</h4>
        </div>
        <div class="sidebar-footer">
            <img src="./img/tmdb-logo.svg" width="130" height="17" alt="">
        </div>
    `;

    const genreLink = function() {
        for(const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a")
            link.setAttribute("href", "./movie-list.html")
            link.setAttribute("menu-close", "")
            link.className = "sidebar-link"
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`)
            link.textContent = genreName

            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }
        
        const sidebar = document.querySelector(".sidebar")
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar)
    }

    const toggleSidebar = function(sidebar) {
        const sidebarBtn = document.querySelector("[menu-btn]")
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]")
        const sidebarClose = document.querySelectorAll("[menu-close]")
        const overlay = document.querySelector("[overlay]")

        addEventOnElements(sidebarTogglers, "click", function() {
            sidebar.classList.toggle("active")
            sidebarBtn.classList.toggle("active")
            overlay.classList.toggle("active")
        })

        addEventOnElements(sidebarClose, "click", function() {
            sidebar.classList.remove("active")
            sidebarBtn.classList.remove("active")
            overlay.classList.remove("active")
        })
    }
}