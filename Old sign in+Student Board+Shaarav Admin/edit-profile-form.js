function getEditProfileForm() {
    fetch("edit-profile.html")
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById("edit-profile-container");
            const overlay = document.getElementById("edit-profile-overlay");

            container.innerHTML = html;
            container.style.display = "block";
            overlay.style.display = "block"

            overlay.onclick =  () => {
                container.style.display = "none";
                overlay.style.display = "none";
            }
        })
        .catch(error => console.error("Cannot load the form", error));
}

function closeProfileForm() {
    const container = document.getElementById("edit-profile-container");
    const overlay = document.getElementById("edit-profile-overlay");

    container.style.display = "none";
    container.innerHTML = "";
    overlay.style.display = "none";
}

function changesSaved(event){
    event.preventDefault();
    const message = document.getElementById("savedmessage");
    message.classList.add("show");
}