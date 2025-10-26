function loginRedirect(){
    const role = document.getElementById('admin-login').value;

    if(role === "admin"){
        window.location.href = "../admin.html"
    } else if(role === "student"){
        window.location.href = "../SOEN 287 Project/StudyRoomBooking.html"
    }
}