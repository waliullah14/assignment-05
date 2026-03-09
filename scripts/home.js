const allBtn = document.getElementById("btn-all");
const openBtn = document.getElementById("btn-open");
const closedBtn = document.getElementById("btn-closed");
const searchbtn = document.getElementById("search-btn");
const spinnerSect = document.getElementById("spinner-section");
const issuSect = document.getElementById("issue-section");

let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
loadData(url, "all");

allBtn.addEventListener("click", () => {
    showSpinner();
    toggleBtn(allBtn);
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    loadData(url, "all");
});
openBtn.addEventListener("click", () => {
    showSpinner();
    toggleBtn(openBtn);
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    loadData(url, "open");
});
closedBtn.addEventListener("click", () => {
    showSpinner();
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    toggleBtn(closedBtn);
    loadData(url, "closed");
});
searchbtn.addEventListener("click", () => {
    showSpinner();
    const searchInput = document.getElementById("search-input").value;
    console.log(searchInput);
    if (searchInput.trim() === "") {
        alert("Please enter search text.");
        hideSpinner();
        return;
    }

    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`;
    loadData(url, "search");
});

document.getElementById("issue-container").addEventListener("click",  (event) => {
    selectedCard = event.target.closest(".card");
    if (!selectedCard) {
        return;
    }

    const issueID = selectedCard.querySelector(".card #issue-id").innerText;
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueID}`;

    loadData(url, "detail")
})