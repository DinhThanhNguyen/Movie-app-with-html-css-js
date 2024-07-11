'use strict';

const addEventOnElements = function(elements, eventType, callback) {
    for(const element of elements) {
        element.addEventListener(eventType, callback);
    }
}

const searchBox = document.querySelector('.search-box');
const searchTogglers = document.querySelectorAll('[search-toggler]');

addEventOnElements(searchTogglers, "click", function() {
    searchBox.classList.toggle('active')
})

