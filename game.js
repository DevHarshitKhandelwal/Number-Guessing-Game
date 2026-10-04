const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(
    "Welcome to the Number Guessing Game!\n" +
    "I'm thinking of a number between 1 and 100.\n"
);

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function start(n) {
    let num = Math.floor(Math.random() * 100) + 1;
    let count = 0;

    while (count < n) {
        let guess = Number(await askQuestion("Enter Your Guess: "));

        count++;

        if (guess > num) {
            console.log(`Incorrect! The number is less than ${guess}.`);
        }
        else if (guess < num) {
            console.log(`Incorrect! The number is greater than ${guess}.`);
        }
        else {
            console.log(
                `Congratulations! You guessed the correct number in ${count} attempts.`
            );

            let retry = await askQuestion("Want to play another game y/n: ");

            if (retry.toLowerCase() === "y") {
                choices();
            } else {
                console.log("Thanks for playing!");
                rl.close();
            }

            return;
        }
    }

    console.log(
        `Unfortunately! You lose the game because the number was: ${num}`
    );

    let retry = await askQuestion("Want to play another game y/n: ");

    if (retry.toLowerCase() === "y") {
        choices();
    } else {
        console.log("Thanks for playing!");
        rl.close();
    }
}

async function choices() {

    console.log(
        "Please select the difficulty level:\n" +
        "1. Easy (10 chances)\n" +
        "2. Medium (5 chances)\n" +
        "3. Hard (3 chances)\n"
    );

    let choice = await askQuestion("Enter Your Choice: ");

    switch (choice) {

        case "1":
            console.log(
                "\nGreat! You have selected the Easy difficulty level.\n" +
                "Let's start the game!\n"
            );
            start(10);
            break;

        case "2":
            console.log(
                "\nGreat! You have selected the Medium difficulty level.\n" +
                "Let's start the game!\n"
            );
            start(5);
            break;

        case "3":
            console.log(
                "\nGreat! You have selected the Hard difficulty level.\n" +
                "Let's start the game!\n"
            );
            start(3);
            break;

        default:
            console.log("\nWrong input\n");
            choices();
            break;
    }
}

choices();