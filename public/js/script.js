function filterTasks() {
  const filter = document.getElementById("priorityFilter").value;
  const items = document.querySelectorAll("#todoList li");

  items.forEach(item => {
    const priority = item.getAttribute("data-priority");
    if (filter === "All" || priority === filter) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
