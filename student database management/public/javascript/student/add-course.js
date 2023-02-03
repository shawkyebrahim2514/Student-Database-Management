function searchOptions() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let courseSelect = document.getElementById("courseSelect");
  let options = courseSelect.options;

  for (let i = 0; i < options.length; i++) {
    if (options[i].text.toLowerCase().indexOf(searchInput) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
}