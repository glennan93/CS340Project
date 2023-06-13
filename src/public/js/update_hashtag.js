//This file was adapted from CS340's nodejs starter app repo.


// Get the objects we need to modify
let updateHashtagForm = document.getElementById('editHashtag');

// Modify the objects we need
document.addEventListener('DOMContentLoaded', function(){
    updateHashtagForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();
    
        // Get form fields we need to get data from
        let hashtagName = document.getElementById("hashtagContents");    
    
        // Get the values from the form fields
        let hashtagNameValue = hashtagName.value;
    
        // Get user ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const hashtagID = urlParams.get('id');
    
        // Check if userID is valid
        if (!hashtagID) {
            console.log("hashtagID is missing or invalid.");
            return;
        }
    
        // Create the data object
        let data = {
            name: hashtagNameValue,
        };
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/put-hashtag-ajax?id=" + hashtagID, true);
        xhttp.setRequestHeader("Content-type", "application/json");
    
        // Tell our AJAX request how to resolve
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                console.log("Update successful");
                updateRow(xhttp.responseText, hashtagID);
            } else {
                console.log("Error: " + xhttp.status);
            }
        };
    
        xhttp.onerror = function() {
            console.log("Request failed");
        };
    
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
})


function updateRow(data, hashtagID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("hashtag-table");

    for (let i = 0; i < parsedData.length; i++) {
        let hashtag = parsedData[i];

        if (hashtag.hashtag_id == hashtagID) {
            let row = table.rows[i+1]  //skip table header
            let cells = row.cells;

            cells[1].textContent = hashtag.description;

            console.log('Updated row successfully!');

            return;
        }
    }
}

