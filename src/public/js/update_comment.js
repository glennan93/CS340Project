//This file was adapted from CS340's nodejs starter app repo.


// Get the objects we need to modify
let updateCommentForm = document.getElementById('edit-comment-form-ajax');

// Modify the objects we need
document.addEventListener('DOMContentLoaded', function(){
    updateCommentForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();
    
        // Get form fields we need to get data from
        let contents = document.getElementById("commentContent");
    
    
        // Get the values from the form fields
        let contentsValue = contents.value;
    
        // Get comment ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const commentID = urlParams.get('id');
    
        // Check if commentID is valid
        if (!commentID) {
            console.log("commentID is missing or invalid.");
            return;
        }
    
        // Create the data object
        let data = {
            contents: contentsValue
        };
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/put-comment-ajax?id=" + commentID, true);
        xhttp.setRequestHeader("Content-type", "application/json");
    
        // Tell our AJAX request how to resolve
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                console.log("Update successful");
                updateRow(xhttp.responseText, commentID);
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


function updateRow(data, commentID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("comment-table");

    for (let i = 0; i < parsedData.length; i++) {
        let comment = parsedData[i];

        if (comment.comment_id == commentID) {
            let row = table.rows[i+1]  //skip table header
            let cells = row.cells;

            cells[1].textContent = comment.contents

            console.log('Updated row successfully!');
            return;
        }
    }
}

