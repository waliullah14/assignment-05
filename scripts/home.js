const allBtn = document.getElementById("btn-all");
const openBtn = document.getElementById("btn-open");
const closedBtn = document.getElementById("btn-closed");
const searchbtn = document.getElementById("search-btn");
let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
loadData(url, "all");

allBtn.addEventListener("click", () => {
    toggleBtn(allBtn);
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    loadData(url, "all");
});
openBtn.addEventListener("click", () => {
    toggleBtn(openBtn);
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    loadData(url, "open");
});
closedBtn.addEventListener("click", () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    toggleBtn(closedBtn);
    loadData(url, "closed");
});
searchbtn.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
    console.log(searchInput);
    if (searchInput.trim() === "") {
        alert("Please enter search text.");
        return;
    }

    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    url = ""
});

function toggleBtn(btn) {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");

    btn.classList.add("btn-primary");
}

async function loadData(url, btn) {
    const res = await fetch(url);
    const data = await res.json();

    if (btn === "open") {
        const openedData = data.data.filter((card) => card.status === "open");
        displayCard(openedData);
    }

    if (btn === "closed") {
        const closedData = data.data.filter((card) => card.status === "closed");
        displayCard(closedData);
    }

    if (btn === "all") {
        displayCard(data.data);
    }
}

function displayCard(cards) {
    const issueCount = document.getElementById("issue-count");
    issueCount.innerText = cards.length;
    const cardContainer = document.getElementById("issue-container");
    cardContainer.innerHTML = "";

    cards.forEach((card) => {
        const badgesHTML = badgeGenerator(card.labels);
        const newCard = document.createElement("div");

        newCard.innerHTML = `<div class="card rounded-md bg-white shadow-sm border-t-4 ${card.status === "open" ? `border-[#00A96E]` : `border-[#A855F7]`} h-full">
                        <div class="upper p-4 space-y-3 border-b border-[#e5e7eb]">
                            <div class="card-head flex justify-between">
                                <img src="${card.status === "open" ? `./assets/Open-Status.png` : `./assets/Closed- Status .png`}" alt="" />
                                <div class="badge ${card.priority === "high" ? `bg-[#FEECEC] text-[#EF4444]` : ``} ${card.priority === "medium" ? `bg-[#FDE68A] text-[#D97706]` : ``} ${card.priority === "low" ? `bg-[#EEEFF2] text-[#9CA3AF]` : ``}">

                                    ${card.priority === "high" ? `HIGH` : ``}
                                    ${card.priority === "medium" ? `MEDIUM` : ``}
                                    ${card.priority === "low" ? `LOW` : ``}
                                </div>
                            </div>

                            <h2 class="text-sm font-semibold leading-4 min-h-[2rem]">${card.title}</h2>
                            <p class="text-xs text-[#64748B] leading-4 min-h-[3rem]">
                                ${card.description}
                            </p>

                            <div class="badges space-x-2 min-h-[3rem]">
                                ${badgesHTML}
                            </div>
                        </div>

                        <div class="lower p-4">
                            <p class="text-[#64748B] text-xs">#${card.id} by ${card.author}</p>
                            <p class="text-[#64748B] text-xs">${card.createdAt}</p>
                        </div>
                    </div>`;

        cardContainer.appendChild(newCard);
    });
}

function badgeGenerator(labels) {
    const badges = labels.map(
        (label) =>
            `<div class="badge bg-[#FDE68A] text-[#D97706] text-xs">${label === "bug" ? `<i class="fa-solid fa-bug"></i>` : ""} ${label === "help wanted" ? `<i class="fa-solid fa-life-ring"></i>` : ""} ${label === "enhancement" ? `<i class="fa-regular fa-star"></i>` : ""} ${label === "documentation" ? `<i class="fa-regular fa-file"></i>` : ""} ${label === "good first issue" ? `<i class="fa-solid fa-triangle-exclamation"></i>` : ""} ${label.toUpperCase()}</div>`,
    );
    return badges.join("");
}