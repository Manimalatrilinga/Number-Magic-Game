$(document).ready(function() {
    let turn = 0;
    let userNumbers = [];
    let adminNumbers = [];
    let userName = "User"; // Default user name

    $("#nextToGameBtn").click(function() {
        const name = prompt("Please enter your name:");
        if (name) {
            userName = name.trim() !== "" ? name.trim() : "User";
            $("#instructionsSection").hide();
            $("#gameArea").show();
            $("#userTurn1").show();
            $("#userNameDisplay").text(userName); // Update display if you have a placeholder
            turn = 1;
            $.get('/start_game', function(data) {
                if (data && data.admin_number) {
                    adminNumbers.push(data.admin_number);
                    $("#adminResponse1").text(`Admin's first number: ${data.admin_number}. Remember, the Admin doesn't know your number, ${userName}.`);
                } else {
                    $("#adminResponse1").text("Error starting the game.");
                }
            });
        }
    });

    $("#submitNumber1").click(function() {
        const userNumber = $("#userNumber1").val();
        if (userNumber.length === 4 && !isNaN(userNumber)) {
            userNumbers.push(parseInt(userNumber));
            $("#userNumberDisplay1").text(`${userName}, you entered: ${userNumber}. Remember this number, the Admin doesn't store it.`);
            $.post('/user_input', { user_number: userNumber }, function(data) {
                if (data && data.admin_number) {
                    adminNumbers.push(data.admin_number);
                    $("#adminResponse2").text(`Admin's second number: ${data.admin_number}.`);
                    $("#userTurn1").hide();
                    $("#userTurn2").show();
                    turn = 2;
                } else {
                    $("#adminResponse2").text("Error receiving Admin's number.");
                }
            });
        } else {
            alert("Please enter a valid 4-digit number, ${userName}.");
        }
    });

    $("#submitNumber2").click(function() {
        const userNumber = $("#userNumber2").val();
        if (userNumber.length === 4 && !isNaN(userNumber)) {
            userNumbers.push(parseInt(userNumber));
            $("#userNumberDisplay2").text(`${userName}, you entered: ${userNumber}. Remember this number, the Admin doesn't store it.`);
            $.post('/user_input', { user_number: userNumber }, function(data) {
                if (data && data.admin_number) {
                    adminNumbers.push(data.admin_number);
                    $("#adminResponse3").text(`Admin's third number: ${data.admin_number}.`);
                    $("#userTurn2").hide();
                    $("#userTurn3").show();
                    turn = 3;
                } else {
                    $("#adminResponse3").text("Error receiving Admin's number.");
                }
            });
        } else {
            alert("Please enter a valid 4-digit number, ${userName}.");
        }
    });

    $("#submitNumber3").click(function() {
        const userNumber = $("#userNumber3").val();
        if (userNumber.length === 4 && !isNaN(userNumber)) {
            userNumbers.push(parseInt(userNumber));
            $("#userNumberDisplay3").text(`${userName}, you entered: ${userNumber}. Remember this number, the Admin doesn't store it.`);
            $("#userTurn3").hide();
            $.get('/reveal_sum', function(data) {
                if (data && data.total_sum) {
                    const userConfirmation = confirm(`Have you added the three numbers you entered and the three numbers the Admin provided, ${userName}?`);
                    if (userConfirmation) {
                        $("#predictedSum").html(`The total sum is: <strong>${data.total_sum}</strong>`);
                        $("#finalResult").show();
                    } else {
                        $("#predictedSum").text(`Ok, no problem, ${userName}. Take your own time and come again.`);
                        $("#finalResult").show();
                    }
                } else {
                    $("#predictedSum").text("Error revealing the sum.");
                    $("#finalResult").show();
                }
            });
        } else {
            alert("Please enter a valid 4-digit number, ${userName}.");
        }
    });

    $("#aboutUsLink, #revealMagicLink").click(showAboutUs);

    function showAboutUs() {
        $("#instructionsSection").hide();
        $("#gameArea").hide();
        $("#finalResult").hide();
        $("#aboutUsSection").show();
        $("#aboutUsText").html(`
            <h3>Hello ${userName}!</h3>
            <p>Thank you for playing! I hope you enjoyed this little game.</p>
            <p>This web browser game was created by the Admin, Manimala Trilinga, as a small, silly fun game to help you relax in your free time.</p>
            <p>I know you're very interested and curious about the magic behind it, so here is the truth:</p>
            <hr>
            <h4>The Truth Behind the Magic:</h4>
            <p>The "magic" relies on a simple mathematical trick. The Admin strategically chooses the numbers in the second and third turns based on your input to create a predictable outcome.</p>
            <p>The Admin does not have access to or store the numbers you enter at any point during the game. Your numbers are only visible to you, ${userName}.</p>
            <p>The final sum appears to be a prediction, but it's the result of this clever number selection by the Admin.</p>
            <p>So, there's no real magic involved, just a bit of clever math!</p>
            <hr>
            <p>Thank you for playing and for your curiosity, ${userName}!</p>
        `);
    }
});