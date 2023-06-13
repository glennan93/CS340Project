//This file was adapted from CS340's nodejs starter app repo.


// Get the objects we need to modify
let updatePostHashtagForm = document.getElementById('editPostHashtag');

// Modify the objects we need
document.addEventListener('DOMContentLoaded', function(){
    updatePostHashtagForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();
    
        // Get form fields we need to get data from
        let hashtagID = document.getElementById("hashtag");    
    
        // Get the values from the form fields
        let hashtagValue = hashtag.value;
    
        // Get user ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const postHashtagID = urlParams.get('id');
    
        // Check if userID is valid
        if (!hashtagID) {
            console.log("hashtagID is missing or invalid.");
            return;
        }
    
        // Create the data object
        let data = {
            hashtag: hashtagValue,
        };
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/put-postHashtag-ajax?id=" + postHashtagID, true);
        xhttp.setRequestHeader("Content-type", "application/json");
    
        // Tell our AJAX request how to resolve
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                console.log("Update successful");
                updateRow(xhttp.responseText, postHashtagID);
                location.reload();
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


function updateRow(data, postHashtagID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("posts_hashtags-table");

    for (let i = 0; i < parsedData.length; i++) {
        let postHashtag = parsedData[i];

        if (postHashtag.post_hash_id == postHashtagID) {
            let row = table.rows[i+1]  //skip table header
            let cells = row.cells;

            cells[1].textContent = postHashtag.hashtagID;

            console.log('Updated row successfully!');

            return;
        }
    }
}

