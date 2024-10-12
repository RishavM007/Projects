let randomNum = parseInt(Math.random() * 100 + 1);
// console.log(randomNum);
const UserInp = document.querySelector(".guess-number");
const button = document.querySelector(".button-result>button");
let UserAttempts = 1;
let playgame = true;
let UserStore = [];


if (playgame) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isNaN(UserInp.value)) {
            const guess = parseInt(UserInp.value);
            ValidNum(guess);
        }
        else {
            alert("Please enter a valid number, not letters or symbols!");
        }
    })
}
function ValidNum(guess) {
    console.log(typeof (guess))
    if (guess <= 0 || guess > 100) {
        alert("Please Enter A Number Between 1 to 100")
    }
    else {
        CheckNum(guess);
    }
}

function CheckNum(guess) {

    if (guess == randomNum) {
        playgame = false;
        button.disabled = true;
        UserStore.push(guess);
        document.querySelector(".prev-guess").innerText = UserStore;
        document.querySelector(".disp").innerText = `YOU GUESS THE CORRECT NUMBER ${guess}`;

    }
    else {

        if (UserAttempts > 10) {
            playgame = false;
            button.disabled = true;
            document.querySelector(".disp").innerText = `SORRY YOUR ATTEMPTS EXPIRED`;
        }
        else {
            if (guess > randomNum) {
                document.querySelector(".hiorlo").innerText = " TRY MORE LOWER NUMBER"
                UserStore.push(guess);
                document.querySelector(".prev-guess").innerText = UserStore;
                ++UserAttempts;
                document.querySelector(".rem-guess").innerText = 11 - UserAttempts;
            }
            else if (guess < randomNum) {
                document.querySelector(".hiorlo").innerText = "TRY MORE HIGHER NUMBER"
                UserStore.push(guess);
                document.querySelector(".prev-guess").innerText = UserStore;
                ++UserAttempts;
                document.querySelector(".rem-guess").innerText = 11 - UserAttempts;
            }

        }
    }

}
