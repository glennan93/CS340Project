// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form-ajax');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let username = document.getElementById("username");
    let about = document.getElementById("about");
    let interests = document.getElementById("interests");
    let location = document.getElementById("location");

    // Get the values from the form fields
    let nameValue = name.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let usernameValue = username.value;
    let aboutValue = about.value;
    let interestsValue = interests.value;
    let locationValue = location.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
        about: aboutValue,
        interests: interestsValue,
        location: locationValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
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
