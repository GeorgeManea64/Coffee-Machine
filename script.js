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

    let coffee = coffeeTypes[coffeeChoice];
    let multiplier = cupSizes[sizeChoice];

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

        setStatusMessage(`✅ Here is your ${sizeChoice} ${coffee.name} ☕`);
    }

    updateMachineStatus();
}

function fillMachine() {
    coffeeMachine.water = Math.min(coffeeMachine.water + 500, 1000);
    coffeeMachine.milk = Math.min(coffeeMachine.milk + 500, 800);
    coffeeMachine.coffeeBeans = Math.min(coffeeMachine.coffeeBeans + 100, 300);
    coffeeMachine.cups = Math.min(coffeeMachine.cups + 3, 10);
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

function updateMachineStatus() {
    // Update textual status
    document.getElementById("machineStatus").innerHTML = `
        Water: ${coffeeMachine.water} ml <br>
        Milk: ${coffeeMachine.milk} ml <br>
        Coffee Beans: ${coffeeMachine.coffeeBeans} g <br>
        Cups: ${coffeeMachine.cups} <br>
        Money: $${coffeeMachine.money} <br>
        Cups Sold: ${coffeeMachine.totalCupsSold}
    `;

    const maxValues = {
        water: 1000,
        milk: 800,
        coffeeBeans: 300
    };
    
    // Clamp the current machine values to max limits
    const clampedWater = Math.min(coffeeMachine.water, maxValues.water);
    const clampedMilk = Math.min(coffeeMachine.milk, maxValues.milk);
    const clampedBeans = Math.min(coffeeMachine.coffeeBeans, maxValues.coffeeBeans);
    
    // Calculate % widths based on clamped values
    const waterPercent = Math.max((clampedWater / maxValues.water) * 100, 0);
    const milkPercent = Math.max((clampedMilk / maxValues.milk) * 100, 0);
    const beansPercent = Math.max((clampedBeans / maxValues.coffeeBeans) * 100, 0);
    
    // Update bar widths
    document.getElementById("barWater").style.width = waterPercent + "%";
    document.getElementById("barMilk").style.width = milkPercent + "%";
    document.getElementById("barBeans").style.width = beansPercent + "%";
    
    // Change bar colors
    updateBarColor("barWater", waterPercent);
    updateBarColor("barMilk", milkPercent);
    updateBarColor("barBeans", beansPercent);
    
    // Optional helper to change color based on level
    function updateBarColor(id, percent) {
        const bar = document.getElementById(id);
        if (percent > 75) {
            bar.style.backgroundColor = "#4caf50"; // green
        } else if (percent > 50) {
            bar.style.backgroundColor = "#ffff00"; // yellow
        } else if (percent > 25) {
            bar.style.backgroundColor = "#ff9800"; // orange
        } else {
            bar.style.backgroundColor = "#f44336"; // red
        }
    }
}