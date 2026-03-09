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

    if (btn === "all" || btn === "search") {
        if (data.data.length === 0) {
            alert("No Result Found");
        }
        displayCard(data.data);
    }

    if (btn === "detail") {
        displayDetail(data.data);
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

        newCard.innerHTML = `<div class="card rounded-md bg-white shadow-sm border-t-4 ${card.status === "open" ? `border-[#00A96E]` : `border-[#A855F7]`} h-full hover:cursor-pointer">
                        <div class="upper p-4 space-y-3 border-b border-[#e5e7eb]">
                            <div class="card-head flex justify-between">
                                <img src="${card.status === "open" ? `./assets/Open-Status.png` : `./assets/Closed- Status .png`}" alt="" />
                                <div class="badge ${card.priority === "high" ? `bg-[#FEECEC] text-[#EF4444]` : ``} ${card.priority === "medium" ? `bg-[#FDE68A] text-[#D97706]` : ``} ${card.priority === "low" ? `bg-[#EEEFF2] text-[#9CA3AF]` : ``} rounded-full">

                                    ${card.priority === "high" ? `HIGH` : ``}
                                    ${card.priority === "medium" ? `MEDIUM` : ``}
                                    ${card.priority === "low" ? `LOW` : ``}
                                </div>
                            </div>

                            <h2 class="text-sm font-semibold leading-4 min-h-[2rem]">${card.title}</h2>
                            <p class="text-xs text-[#64748B] leading-4 min-h-[4rem]">
                                ${card.description}
                            </p>

                            <div class="badges space-x-2 min-h-[3rem]">
                                ${badgesHTML}
                            </div>
                        </div>

                        <div class="lower p-4">
                            <p class="text-[#64748B] text-xs" >#<span id="issue-id">${card.id}</span> by ${card.author}</p>
                            <p class="text-[#64748B] text-xs">${card.createdAt}</p>
                        </div>
                    </div>`;

        cardContainer.appendChild(newCard);
    });

    hideSpinner();
}

function badgeGenerator(labels) {
    const badges = labels.map(
        (label) =>
            `<div class="badge bg-[#FDE68A] text-[#D97706] text-xs rounded-full">${label === "bug" ? `<i class="fa-solid fa-bug"></i>` : ""} ${label === "help wanted" ? `<i class="fa-solid fa-life-ring"></i>` : ""} ${label === "enhancement" ? `<i class="fa-regular fa-star"></i>` : ""} ${label === "documentation" ? `<i class="fa-regular fa-file"></i>` : ""} ${label === "good first issue" ? `<i class="fa-solid fa-triangle-exclamation"></i>` : ""} ${label.toUpperCase()}</div>`,
    );
    return badges.join("");
}

function displayDetail(card) {
    const modalContainer = document.getElementById("detail_modal");
    modalContainer.innerHTML = "";
    const badgesinnerHTML = badgeGenerator(card.labels);
    let modal = document.createElement("div");
    modal.innerHTML = `<div class="modal-box p-8 space-y-4 ">
                    <h3 class="text-lg font-bold">${card.title}</h3>
                    <div class="sm:flex items-center space-x-2 space-y-3 sm:space-y-0">
                        <div class="badge ${card.status === "open" ? `bg-[#00A96E]` : `bg-[#A855F7]`} text-white rounded-full text-xs">
                            ${card.status === "open" ? `Open` : `Closed`}
                        </div>
                        <ul class="flex text-xs text-[#64748B] space-x-2 list-disc list-inside">
                            <li>${card.assignee ? (card.status==="open"? `Opened by ${card.assignee}` : `Closed by ${card.assignee}`) : (`No assignee found`)}</li>
                            <li>${card.updatedAt}</li>
                        </ul>
                    </div>

                    <div class="badges space-x-2">
                        ${badgesinnerHTML}
                    </div>

                    <p class="text-[#64748B]">${card.description}</p>

                    <div class="bg-[#F8FAFC] grid grid-cols-2 rounded-md p-4">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="font-semibold">${card.assignee ? `${card.assignee.toUpperCase()}` : `No assignee found`}</p>
                        </div>
                        <div>
                            <p class="text-[#64748B]">Priority:</p>
                            <div class="badge ${card.priority === "high" ? `bg-[#EF4444] text-[#FFFFFF]` : ``} ${card.priority === "medium" ? `bg-[#D97706] text-[#FFFFFF]` : ``} ${card.priority === "low" ? `bg-[#9CA3AF] text-[#FFFFFF]` : ``} rounded-full">

                                    ${card.priority === "high" ? `HIGH` : ``}
                                    ${card.priority === "medium" ? `MEDIUM` : ``}
                                    ${card.priority === "low" ? `LOW` : ``}
                                </div>
                        </div>
                    </div>

                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary outline-0">
                                Close
                            </button>
                        </form>
                    </div>
                </div>`;
    modalContainer.appendChild(modal);

    detail_modal.showModal();
}

function showSpinner() {
    issuSect.classList.add("hidden");
    spinnerSect.classList.remove("hidden");
}
function hideSpinner() {
    spinnerSect.classList.add("hidden");
    issuSect.classList.remove("hidden");
}
