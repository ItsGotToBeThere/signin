const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#loginBtn"); 


function handleLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/signin/${username}/${password}`;

    var newTab = window.open(url, '_blank');

    let validity;
    let placesVisited;
    var interval = setInterval(function () {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = xhr.responseText
                    validity = response[0]
                    if (response.length>1){
                    placesVisited = response.slice(1);
                    }

                    if (validity === 'true') {
                        localStorage.setItem('placesVisited', JSON.stringify(placesVisited));
                        localStorage.setItem('isLoggedIn', JSON.stringify(true));
                        localStorage.setItem('username',username)
                        window.location.href = 'https://wahoowanderings.co';
                    }
                    
                    setTimeout(function() {
                        newTab.close();
                    }, 3000);
                }
            }
        };
        xhr.send();
    }, 200);
}

// Event listener for enter key 
document.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        handleLogin();
    }
});

// Event listener for login button 
loginButton.addEventListener('click', handleLogin)
