//This file was adapted from CS340's nodejs starter app repo.


// Get the objects we need to modify
let updateUserForm = document.getElementById('edit-user-form-ajax');

// Modify the objects we need
document.addEventListener('DOMContentLoaded', function(){
    updateUserForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();
    
        // Get form fields we need to get data from
        let userName = document.getElementById("name");
        let userEmail = document.getElementById("email");
        let userPassword = document.getElementById("password");
        let userUsername = document.getElementById("username");
        let userAbout = document.getElementById("about");
        let userInterests = document.getElementById("interests");
        let userLocation = document.getElementById("location");
    
    
        // Get the values from the form fields
        let userNameValue = userName.value;
        let userEmailValue = userEmail.value;
        let userPasswordValue = userPassword.value;
        let userUsernameValue = userUsername.value;
        let userAboutValue = userAbout.value;
        let userInterestsValue = userInterests.value;
        let userLocationValue = userLocation.value;
    
        // Get user ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const userID = urlParams.get('id');
    
        // Check if userID is valid
        if (!userID) {
            console.log("userID is missing or invalid.");
            return;
        }
    
        // Create the data object
        let data = {
            name: userNameValue,
            email: userEmailValue,
            password: userPasswordValue,
            username: userUsernameValue,
            about: userAboutValue,
            interests: userInterestsValue,
            location: userLocationValue
        };
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/put-user-ajax?id=" + userID, true);
        xhttp.setRequestHeader("Content-type", "application/json");
    
        // Tell our AJAX request how to resolve
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                console.log("Update successful");
                updateRow(xhttp.responseText, userID);
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


function updateRow(data, userID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("user-table");

    for (let i = 0; i < parsedData.length; i++) {
        let user = parsedData[i];

        if (user.user_id == userID) {
            let row = table.rows[i+1]  //skip table header
            let cells = row.cells;

            cells[1].textContent = user.name;
            cells[2].textContent = user.email;
            cells[4].textContent = user.username;
            cells[5].textContent = user.about;
            cells[6].textContent = user.interests;
            cells[7].textContent = user.location;

            console.log('Updated row successfully!');
            return;
        }
    }
}

