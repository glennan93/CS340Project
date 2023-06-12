// This file was adapted from CS340's node starter app repo

// Get the objects we need to modify
let addCommentForm = document.getElementById('add-comment-form-ajax');

// Modify the objects we need
addCommentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let commenter = document.getElementById("commentAuthorSelect");
    let parent_post = document.getElementById("parentPostIDSelect");
    let contents = document.getElementById("commentContent");

    // Get the values from the form fields
    let commenterValue = commenter.value
    let parent_postValue = parent_post.value
    let contentsValue = contents.value

    // Put our data we want to send in a javascript object
    let data = {
        commenter: commenterValue,
        parent_post: parent_postValue,
        contents: contentsValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-comment-ajax", true);
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
