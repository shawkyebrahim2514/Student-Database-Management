document.getElementById("searchOption").addEventListener("change", function () {
    document.getElementById("studentIDInputs").style.display = "none";
    document.getElementById("gpaInputs").style.display = "none";
    document.getElementById("levelInputs").style.display = "none";
    if (this.value === "studentID") {
        document.getElementById("studentIDInputs").style.display = "block";
    } else if (this.value === "gpa") {
        document.getElementById("gpaInputs").style.display = "block";
    } else if (this.value === "level") {
        document.getElementById("levelInputs").style.display = "block";
    }
});