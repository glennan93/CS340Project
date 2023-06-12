// This file was adapted from CS340's node starter app repo

// Get the objects we need to modify
let addHashtagForm = document.getElementById('add-hashtag-form');

// Modify the objects we need
addHashtagForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let name = document.getElementById("hashtagName");

    // Get the values from the form fields
    let nameValue = name.value

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue
    }
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-hashtag-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // refresh page
            window.location.reload();
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});
