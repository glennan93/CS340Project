//This file was adapted from CS340's nodejs starter app repo.


// Get the objects we need to modify
let updatePostForm = document.getElementById('update-post-form-ajax');

// Modify the objects we need
updatePostForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let postAuthor = document.getElementById("mySelect");
    let postContent = document.getElementById("postContent");

    // Get the values from the form fields
    let postAuthorValue = postAuthor.value;
    let postContentValue = postContent.value;

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');

    // Check if postID is valid
    if (!postID) {
        console.log("postID is missing or invalid.");
        return;
    }

    // Create the data object
    let data = {
        postAuthor: postAuthorValue,
        postContent: postContentValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-post-ajax?id=" + postID, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            console.log("Update successful");
            updateRow(xhttp.responseText, postID);
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

function updateRow(data, postID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("post-table");

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowDataValue = row.getAttribute("data-value");

        if (rowDataValue == postID) {
            let td = row.querySelector("td[data-field='name']");
            if (td) {
                td.textContent = parsedData[0].name;
                console.log("Row updated successfully");
                location.reload(); //reload
                return;
            }
        }
    }
    console.log("Row not found");
}

