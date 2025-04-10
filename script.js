let coffeeMachine = {
    water: 1000,
    milk: 800,
    coffeeBeans: 300,
    cups: 10,
    money: 1000,
    totalCupsSold: 0
};

const coffeeTypes = {
    1: { name: "Espresso", water: 250, milk: 0, coffeeBeans: 16, cost: 4 },
    2: { name: "Latte", water: 350, milk: 75, coffeeBeans: 20, cost: 7 },
    3: { name: "Cappuccino", water: 200, milk: 100, coffeeBeans: 12, cost: 6 },
    4: { name: "Macchiato", water: 100, milk: 50, coffeeBeans: 14, cost: 5 },
    5: { name: "Mocha", water: 250, milk: 150, coffeeBeans: 18, cost: 8 }
};

const cupSizes = { small: 0.75, medium: 1, large: 1.5 };
const milkTypes = { 1: "Regular", 2: "Almond", 3: "Oat" };

function updateMachineStatus() {
    document.getElementById("machineStatus").innerHTML = `
        Water: ${coffeeMachine.water} ml <br>
        Milk: ${coffeeMachine.milk} ml <br>
        Coffee Beans: ${coffeeMachine.coffeeBeans} g <br>
        Cups: ${coffeeMachine.cups} <br>
        Money: $${coffeeMachine.money} <br>
        Cups Sold: ${coffeeMachine.totalCupsSold}
    `;
}

function buyCoffee() {
    let coffeeChoice = document.getElementById("coffeeType").value;
    let sizeChoice = document.getElementById("cupSize").value;
    let milkChoice = document.getElementById("milkType").value;

    let coffee = coffeeTypes[coffeeChoice];
    let multiplier = cupSizes[sizeChoice];
    let milkType = milkTypes[milkChoice];

    let requiredWater = coffee.water * multiplier;
    let requiredMilk = coffee.milk * multiplier;
    let requiredBeans = coffee.coffeeBeans * multiplier;
    let finalCost = coffee.cost * multiplier;

    if (coffeeMachine.water < requiredWater) {
        setStatusMessage("⚠ Not enough water!");
    } else if (coffeeMachine.milk < requiredMilk) {
        setStatusMessage("⚠ Not enough milk!");
    } else if (coffeeMachine.coffeeBeans < requiredBeans) {
        setStatusMessage("⚠ Not enough coffee beans!");
    } else if (coffeeMachine.cups < 1) {
        setStatusMessage("⚠ Not enough cups!");
    } else {
        coffeeMachine.water -= requiredWater;
        coffeeMachine.milk -= requiredMilk;
        coffeeMachine.coffeeBeans -= requiredBeans;
        coffeeMachine.cups -= 1;
        coffeeMachine.money += finalCost;
        coffeeMachine.totalCupsSold += 1;

        setStatusMessage(`✅ Here is your ${sizeChoice} ${coffee.name} with ${milkType} milk! ☕`);
    }

    updateMachineStatus();
}

function fillMachine() {
    coffeeMachine.water += 500;
    coffeeMachine.milk += 500;
    coffeeMachine.coffeeBeans += 100;
    coffeeMachine.cups += 5;
    setStatusMessage("✅ Supplies refilled!");
    updateMachineStatus();
}

function takeMoney() {
    setStatusMessage(`💰 You took $${coffeeMachine.money}`);
    coffeeMachine.money = 0;
    updateMachineStatus();
}

function resetSales() {
    coffeeMachine.totalCupsSold = 0;
    setStatusMessage("🔄 Sales reset!");
    updateMachineStatus();
}

function setStatusMessage(message) {
    document.getElementById("statusMessage").innerHTML = message;
    setTimeout(() => {
        document.getElementById("statusMessage").innerHTML = "";
    }, 3000);
}

updateMachineStatus();