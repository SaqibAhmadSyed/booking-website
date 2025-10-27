function loginRedirect(){
    const role = document.getElementById('admin-login').value;

    if(role === "admin"){
        window.location.href = "AdminPage.html"
    } else if(role === "student"){
        window.location.href = "StudyRoomBooking.html"
    }
}