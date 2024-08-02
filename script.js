const table = document.getElementById("table");
table.innerHTML = ""
const size = 4;
let values = [];
let imgString =
    [
        "https://t4.ftcdn.net/jpg/06/71/74/53/240_F_671745313_mp1wgM3IR43SOAUi6tSHtKBv1ujZqnco.jpg",
        "https://t3.ftcdn.net/jpg/00/60/77/52/240_F_60775224_mXa2NC60kpCjTdMqAz8VpUMqmnmOKkDw.jpg",
        "https://t3.ftcdn.net/jpg/02/69/91/32/240_F_269913209_21Jf3AJsHZZC5AZ3Fjnxh8MoMQo4lgsd.jpg",
        "https://t4.ftcdn.net/jpg/01/84/48/23/240_F_184482333_JdCDk8XGS6haBPvMgfiPuXm8ONDPeNqn.jpg",
        "https://t4.ftcdn.net/jpg/01/97/24/57/240_F_197245747_Zlxa1TAXHcVq74ee0gJMe7bPxD8AXwEx.jpg",
        "https://t3.ftcdn.net/jpg/01/80/25/96/240_F_180259694_yctNdxfmxxTXdXkGXl1PS10ley9Uq5wf.jpg",
        "https://t4.ftcdn.net/jpg/01/28/85/89/240_F_128858954_P5GqvHETKpONm5ODk5fLe9UxG4SyKqJZ.jpg",
        "https://t3.ftcdn.net/jpg/00/71/96/78/240_F_71967847_EkS9aYV91rJvUshcBbFeUuLkGw6Ce3Rj.jpg"
    ]
let firstItem = null;
let secondItem = null;
let guessed = 0;

// generate items
for (let i = 1; i <= size * size / 2; i++) {
    values.push(i);
    values.push(i);
}

// scatter items
for (let i = 0; i < values.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
}

// create table and put items
for (let i = 0; i < size; i++) {
    let row = table.insertRow(i);

    for (let j = 0; j < size; j++) {
        const item = document.createElement("td");
        item.textContent = values[i * size + j];
        item.style.backgroundColor = "#35373d";
        item.addEventListener("click",() => checkItems(item));

        row.insertCell(j).appendChild(item);
    }

    table.appendChild(row);
}

function checkItems(item) {
    if (item.style.backgroundColor === "white")
        return;

    item.style.backgroundColor = "white";
    let index = item.textContent;
    item.style.backgroundImage = `url(${imgString[index - 1]})`;

    if (firstItem === null)
        firstItem = item;
    else if (secondItem === null) {
        secondItem = item;

        if (firstItem.textContent === secondItem.textContent) {
            firstItem = null;
            secondItem = null;
            guessed += 2;
        }
        else {
            setTimeout(() => {
                firstItem.style.backgroundColor = "#35373d";
                secondItem.style.backgroundColor = "#35373d";
                firstItem.style.backgroundImage = "";
                secondItem.style.backgroundImage = "";
                firstItem = null;
                secondItem = null;
            }, 1000);
        }

        if (guessed === size * size) {
            window.alert("Game over! You won! :))");
        }
    }
}