// Base URL used to connect with the API.
const BASE_URL = "https://dog.ceo/api/breeds/image/random/";

// Target the submit button in the form that will be used to trigger the event.
let $submitButton = $('.fetch-dogs-jquery');

// Add the 'click' event listener to the button. Note: Use 'submit' if you target the form.
$submitButton.on('click', (event) => {
    // By default all forms refresh the page, we want to prevent this from happening
    // as we are loading information dynamically in the page.
    event.preventDefault();
    // Target the input to retrieve a value needed in the URL endpoint.
    const numberOfDogs = $("#number-of-dogs-jquery").val();
    // Updating the URL endpoint needed for the request.
    const URL = BASE_URL + numberOfDogs;
    console.log("JQUERY AJAX");
    // Method used to do an asynchronous request with jQuery method .ajax().
    // Requires an object with all the setup for the request.
    // Look at the docs to find more about the full list of key/value pairs.
    $.ajax({
        url : URL, // URL of endpoint to use.
        method : "GET", // Method of endpoint to use.
        success : (responseJSON) => { // Happy path, successful callback.
            // Response JSON object/array sent back by the API/server.
            // Target our container to load the results.
            let $resultsContainer = $('.results');
            // Clear any previous search from our results.
            $resultsContainer.empty();
            // Loop through the array of results and load them in the page (DOM manipulation).
            responseJSON.message.forEach(imageString => {
                $resultsContainer.append(`
                    <div class="imageCard">
                        <img class="dogImage" src="${imageString}" alt="Image of a dog" >
                    </div>
                `);
            });
        },
        error : (error) => { // Unhappy path, error callback.
            console.log("Something went wrong", error);
        }
    });
    
    /*
    // Alternative way, only works with GET method.
    $.get(URL)
        .done((responseJSON) => {
            let $resultsContainer = $('.results');
            $resultsContainer.empty();
            responseJSON.message.forEach(imageString => {
                $resultsContainer.append(`
                    <div class="imageCard">
                        <img class="dogImage" src="${imageString}" alt="Image of a dog" >
                    </div>
                `);
            });
        })
        .fail((error) => {
            console.log("Something went wrong", error);
        });
    */
});

// Target the submit button in the form that will be used to trigger the event.
let submitButton = document.querySelector(".fetch-dogs"); 

// Add the 'click' event listener to the button. Note: Use 'submit' if you target the form.
submitButton.addEventListener('click', (event) => {
    // By default all forms refresh the page, we want to prevent this from happening
    // as we are loading information dynamically in the page.
    event.preventDefault();
    // Target the input to retrieve a value needed in the URL endpoint.
    const numberOfDogs = document.querySelector("#number-of-dogs").value
    // Updating the URL endpoint needed for the request.
    const URL = BASE_URL + numberOfDogs;
    // Settings needed for the native fetch, see full documentation to discover
    // all keys that we can send.
    const config = {
        method : "GET"
    }
    console.log("NATIVE JS AJAX");
    // Method used to do an asynchronous request with native JavaScript.
    // Requires URL of the endpoint and the settings object.
    fetch(URL, config)
        .then(response => { // Initial response from server/API.
            if (response.ok){
                // If the response is successful we parse the information into a JSON object.
                return response.json();
            }
            // If the response is unsuccessful we trigger an error and is handled in the .catch().
            throw Error(response.statusText);
        })
        .then(data => { // Happy path, successful callback.
            // Response JSON object/array sent back by the API/server.
            // Target our container to load the results.
            let resultsContainer = document.querySelector('.results');
            // Clear any previous search from our results.
            resultsContainer.innerHTML = "";
            // Loop through the array of results and load them in the page (DOM manipulation).
            data.message.forEach(imageString => {
                resultsContainer.innerHTML += `
                <div class="imageCard">
                    <img class="dogImage" src="${imageString}" alt="Image of a dog" >
                </div>
                `;
            });
        })
        .catch(error => { // Unhappy path, error callback.
            console.log("Something went wrong", error);
        });
});