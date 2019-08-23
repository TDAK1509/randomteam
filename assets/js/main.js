function _disableMinusButton() {
    const minusButton = document.querySelector("#minus");
    minusButton.setAttribute("disabled", true);
}

function _enableMinusButton() {
    const minusButton = document.querySelector("#minus");
    minusButton.removeAttribute("disabled");
}

function increment() {
    const teamCounterDOM = document.querySelector("#team-counter");
    let teamCounter = parseInt(teamCounterDOM.innerText);

    teamCounterDOM.innerText = ++teamCounter;
    if (teamCounter > 0) _enableMinusButton();
}

function decrement() {
    const teamCounterDOM = document.querySelector("#team-counter");
    let teamCounter = parseInt(teamCounterDOM.innerText);

    teamCounterDOM.innerText = --teamCounter;
    if (teamCounter === 0) _disableMinusButton();
}

function addMember() {
    const container = document.querySelector(".members-container");

    const memberRow = _createMemberRow();
    const input = _createInput();
    const addButton = _createAddButton();
    const removeButton = _createRemoveButton();

    memberRow.appendChild(input);
    memberRow.appendChild(addButton);
    memberRow.appendChild(removeButton);

    container.appendChild(memberRow);

    input.focus();
}

function removeMember() {
    const container = document.querySelector(".members-container");
    container.removeChild(container.lastChild);
    console.log(container);
}

function _createMemberRow() {
    const memberRow = document.createElement("div");
    memberRow.classList.add("member");
    return memberRow;
}

function _createInput() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("member-name");
    input.value = "Member name";
    input.addEventListener("focus", e => e.target.select());

    return input;
}

function _createAddButton() {
    const button = document.createElement("button");
    button.classList.add("no-border");
    button.classList.add("add");
    button.addEventListener("click", addMember);

    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-plus");

    button.appendChild(icon);

    return button;
}

function _createRemoveButton() {
    const button = document.createElement("button");
    button.classList.add("no-border");
    button.classList.add("minus");
    button.addEventListener("click", removeMember);

    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-minus");

    button.appendChild(icon);

    return button;
}

function assignTeams() {
    const members = _getMemberNames();
    const teamCounter = _getTeamCounter();

    if (teamCounter > members.length) {
        _setError("Number of teams > number of members");
        return false;
    }

    const result = _assignTeams(members, teamCounter);
    _setError("");
    _setResult(result);
}

function _getMemberNames() {
    const membersDOM = document.querySelectorAll(".member-name");
    let members = [];

    membersDOM.forEach(member => {
        const memberName = member.value;
        members.push(memberName);
    });

    return members;
}

function _getTeamCounter() {
    const teamCounterDOM = document.querySelector("#team-counter");
    const teamCounter = parseInt(teamCounterDOM.innerText);
    return teamCounter;
}

function _setError(message) {
    const error = document.querySelector(".error");
    error.innerText = message;
}

function _assignTeams(members, teamCounter) {
    let results = [];

    let i = 0;

    while (members.length) {
        const index = getRandomInteger(0, members.length);
        const member = members.splice(index, 1);

        if (!results[i]) results.push([]);

        results[i].push(member[0]);

        i++;
        if (i === teamCounter) i = 0;
    }

    return results;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function _setResult(result) {
    const container = document.querySelector("#result");

    container.innerHTML = "";

    result.forEach((r, index) => {
        const li = document.createElement("li");

        const h5 = document.createElement("h5");
        h5.innerText = `Team ${index + 1}`;

        li.appendChild(h5);

        r.forEach(member => {
            const p = document.createElement("p");
            p.innerText = member;
            li.appendChild(p);
        });

        container.appendChild(li);
    });

    container.classList.remove("hidden");
}
