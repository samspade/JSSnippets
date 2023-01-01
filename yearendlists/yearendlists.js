localStorage.clear();

const bookTitleLinks = document.querySelectorAll(".book-title a");

bookTitleLinks.forEach((link) => {
  // Get the text content of the link
  const linkText = link.textContent.trim();

  // Check if the key (the link text) exists in local storage
  if (!localStorage.getItem(linkText)) {
    // If the key does not exist, fetch the page and count the number of lis
    const pageUrl = link.getAttribute("href");
    fetch(pageUrl)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const pageBodyLis = doc.querySelectorAll(".page-body li");
        const LisArray = Array.from(pageBodyLis);
        const date = new Date().getFullYear();
        const reviewCount = LisArray.filter((li) =>
          li.textContent.includes("date")
        ).length;
        localStorage.setItem(linkText, reviewCount);
      });
  }
});

const getTopTwenty = () => {
  // Get all the keys in local storage
  const keys = Object.keys(localStorage);

  // Map the keys to objects with the key as the 'name' and the value in local storage as the 'count'
  const items = keys.map((key) => ({
    name: key,
    count: localStorage.getItem(key),
  }));

  // Sort the items by count in descending order
  const sortedItems = items.sort((a, b) => b.count - a.count);

  // Return the first 10 items
  return sortedItems.slice(0, 20);
};

const twenty = getTopTwenty();

twenty.forEach((e) => console.log(e));
