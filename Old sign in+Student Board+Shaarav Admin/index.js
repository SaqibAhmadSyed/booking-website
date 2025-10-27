// Select all relevant elements
const statusElements = document.querySelectorAll(".blocked, .unavailable, .pending");

for (let elements of statusElements) {
    elements.addEventListener("click", Buttonhandler);
}

function Buttonhandler(event) {
    const el = event.currentTarget;
    let message;

    // Check which class the clicked element has
    switch (true) {
        case el.classList.contains("blocked"):
            message = "Space is blocked by an administrator!";
            break;
        case el.classList.contains("unavailable"):
            message = "This space is currently unavailable.";
            break;
        case el.classList.contains("pending"):
            message = "This space is pending approval.";
            break;
        default:
            message = "Unknown status.";
    }

    window.alert(message);
}