document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  function toggleSidebar() {
    sidebar.classList.toggle("active");
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
  }

  // Only attach event listeners if the elements exist on the page
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", toggleSidebar);

    // Add event listener to close sidebar when clicking on a category link
    const categoryLinks = document.querySelectorAll("#sidebar a");
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closeSidebar();
      });
    });

    // Export the function to close the sidebar
    window.closeSidebar = closeSidebar;
  }
});
