const animals = document.querySelectorAll(".animal") as NodeListOf<HTMLElement>;
const feed = document.querySelector(".feed") as HTMLElement;
const play = document.querySelector(".play") as HTMLElement;
const goSleep = document.querySelector(".goSleep") as HTMLElement;
const clean = document.querySelector(".clean") as HTMLElement;
const gameOver = document.querySelector(".gameOver") as HTMLElement;
const gameOverBtn = document.querySelector(".gameOverBtn") as HTMLButtonElement;
const gameContainer = document.querySelector(".gameContainer") as HTMLElement;
const gameStartContainer = document.querySelector(".gameStartContainer") as HTMLElement;
const chosenTamagochiElement = document.querySelector(".chosenTamagochi") as HTMLElement;

const funBar = document.querySelector(".FUN") as HTMLElement;
const foodBar = document.querySelector(".FOOD") as HTMLElement;
const sleepBar = document.querySelector(".SLEEP") as HTMLElement;

const tamagochies: string[] = ["🐨", "🐼", "🐙", "🦦", "🐡", "🦁", "🐈", "🦝"];

let FUN = 100;
let FOOD = 100;
let SLEEP = 100;

let tamagochiSelected = "";
let wasteInterval: number | null = null;

const wasteContainer = document.createElement("div");
wasteContainer.className = "wasteContainer";
gameContainer.appendChild(wasteContainer);

function resetTamagochiBorders() {
    animals.forEach((animal) => {
        animal.style.border = "";
    });
}

function rnd(num: number) {
    return Math.round(Math.random() * num);
}

function startGame() {

    FUN = 100;
    FOOD = 100;
    SLEEP = 100;
    updateBar(funBar, FUN);
    updateBar(foodBar, FOOD);
    updateBar(sleepBar, SLEEP);
    wasteContainer.innerHTML = "";


    const funInterval = setInterval(() => {
        if (FUN > 0) {
            FUN -= rnd(5);
            updateBar(funBar, FUN);
        } else {
            clearInterval(funInterval);
            endGame();
        }
    }, 500);

    const foodInterval = setInterval(() => {
        if (FOOD > 0) {
            FOOD -= rnd(4);
            updateBar(foodBar, FOOD);
        } else {
            clearInterval(foodInterval);
            endGame();
        }
    }, 1000);

    const sleepInterval = setInterval(() => {
        if (SLEEP > 0) {
            SLEEP -= rnd(5);
            updateBar(sleepBar, SLEEP);
        } else {
            clearInterval(sleepInterval);
            endGame();
        }
    }, 1500);

    if (wasteInterval) clearInterval(wasteInterval);
    wasteInterval = setInterval(() => {
        produceWaste("💩");
    }, 3000);
}

function updateBar(bar: HTMLElement, value: number) {
    bar.style.width = `${value}%`;
    if (value <= 0) {
        bar.style.width = "0%";
    }
}

function produceWaste(waste: string) {
    const wasteElement = document.createElement("div");
    wasteElement.className = "waste";
    wasteElement.innerHTML = waste;

    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const randomX = Math.random() * (containerWidth - 50);
    const randomY = Math.random() * (containerHeight - 50);

    wasteElement.style.left = `${randomX}px`;
    wasteElement.style.top = `${randomY}px`;

    wasteContainer.appendChild(wasteElement);

    if (wasteContainer.childElementCount > 5) {
        endGame();
    }
}

function cleanWaste() {
    wasteContainer.innerHTML = "";
}

function endGame() {
    if (wasteInterval) clearInterval(wasteInterval);
    gameContainer.style.display = "none";
    gameOver.style.display = "flex";
}

animals.forEach((animal, index) => {
    animal.onclick = () => {
        tamagochiSelected = tamagochies[index];

        resetTamagochiBorders();
        animal.style.border = "2px solid skyblue";

        gameStartContainer.style.display = "none";
        gameContainer.style.display = "flex";
        gameOver.style.display = "none";

        chosenTamagochiElement.innerHTML = tamagochiSelected;
        chosenTamagochiElement.classList.add("animateAnimal");

        startGame();
    };
});

clean.onclick = () => {
    cleanWaste();
};

goSleep.onclick = () => {
    SLEEP += rnd(15);
    if (SLEEP > 100) SLEEP = 100;
    updateBar(sleepBar, SLEEP);
};

play.onclick = () => {
    FUN += rnd(20);
    if (FUN > 100) FUN = 100;
    updateBar(funBar, FUN);
};

feed.onclick = () => {
    FOOD += rnd(10);
    if (FOOD > 100) FOOD = 100;
    updateBar(foodBar, FOOD);
};

gameOverBtn.onclick = () => {
    gameStartContainer.style.display = "flex";
    gameStartContainer.style.alignItems = "center";
    gameStartContainer.style.justifyContent = "center";
    gameOver.style.display = "none";
    gameContainer.style.display = "none";
};
