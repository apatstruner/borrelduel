document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cowboy1Img = document.getElementById('cowboy1-img');
    const cowboy2Img = document.getElementById('cowboy2-img');
    const cowboy1Tombstone = document.getElementById('cowboy1-tombstone');
    const cowboy2Tombstone = document.getElementById('cowboy2-tombstone');
    const countdownEl = document.getElementById('countdown');
    const startButton = document.getElementById('start-button');
    const reactionTimesEl = document.getElementById('reaction-times');
    const reactionTimeText = document.getElementById('reaction-time-text');
    const winnerAnnouncement = document.getElementById('winner-announcement');
    const winnerTextEl = document.getElementById('winner-text');
    const leaderboardList = document.getElementById('leaderboard-list');

    // Sound Elements
    const drawSound = document.getElementById('draw-sound');
    const shootSound = document.getElementById('shoot-sound');
    const winMusic = document.getElementById('win-music');
    const suspenseSound = document.getElementById('suspense-sound');

    // Game State Variables
    let duelStarted = false;
    let keyPressHandled = false;
    let duelStartTime = 0;
    let playerReactionTime = 0;
    let gameState = 'waiting'; // 'waiting', 'countdown', 'duel', 'end'

    // Array of random cowboy names
    const cowboyNames = [
        "Billy de Jongen", "Wilde Willem", "Annie Schutter", "Dokter Hollander", "Rampzalige Jansje",
        "Jesse de Bandiet", "Boef Casper", "Zonnedans Kind", "Wout de Vredige", "Buffel Bill",
        "Karel de Verkenner", "Patje Pistool", "Zwarte Bart", "Bill Boef", "Tom de Jager",
        "Kees de Jongere", "Belle de Ster", "Johnny Ruiter", "Krullebol Bertus", "Nelis de Schurk",
        "Cherokee Jan", "Dikke Neus Kaatje", "Jim Bruggenbouwer", "Natte Liefde", "IJsbrand Dart",
        "Klaas de Koele", "Bas Meester", "Lucas de Kort", "Kind Koen", "Frans de Boef",
        "Bas Reus", "Jan Wessel Harder", "Schutter Slim", "Parel Hart", "Tom Sluiper",
        "Jim Kruidenier", "Zander de Grijze", "Albert de Jager", "Bobje Dalton", "Emmet Dalton",
        "Kind Antrim", "Rudolf Bok", "Mysterieuze Dave", "Jan Koning Visser", "Sam Bas",
        "Texaanse Jack", "Harrie de Stunt", "Belle Schilders", "Charlie de Boog", "Manuel Gonzales",
        "Jack Schurk", "Sam Zeskiller", "Albert de Sniper", "Klaas de Masker", "Lars Lasso",
        "Elmer MacBuur", "Bronco Willem", "Henk de Sluwe", "Willem Kwikzilver", "Dave de Revolverheld",
        "Jan Hendrik", "Harrold Logan", "Panco Villa", "Postkoets Maria", "Krul Jack",
        "Ben de Revolver", "Daan Boogman", "Dirk Breedwel", "Frans McLowery", "Izaak Klan",
        "Johnny Behekst", "Koning Visser", "Dokter Schots", "James Bende", "Charlie Slinger",
        "Gabbertje Hooi", "Pawnee Willem", "Ringo Kind", "Willem Harp", "Scottje Kolen",
        "Joaquin de Bandiet", "Bill Tillman", "Rechter Roy Boon", "Klaas de Bil", "Buckje Taylor",
        "Jim Reider", "Zilveren Hakken", "Tom de Mix", "Broncho Jan Sneeuw", "Panco Barnes",
        "Hoodoo Bruin", "Sadie Boomgaard", "Rattelslang Dick", "Grote Voet Willem", "Buffel Frankje",
        "Davy de Kruidenier", "Dokter Middelaar", "Hollandse Henry", "Grote George", "Jack de Slager",
        "Tom Smit", "Clint Oosterman", "Rudolf Schot", "Waard Bond", "Freddy de Jager",
        "Wilde Bende", "Dode Dick", "Jake McCandles", "Stompje Bel", "Californie Koos",
        "Kreupel Kreek", "Nevada Smit", "Willem Pen", "Monte Wals", "Haantje Kogelregen",
        "Diaken Jan Muller", "Ben Wouters", "Shane Koffie", "De Prediker", "Jeb Coen",
        "Eenzame Duif", "Jack Paling", "Paladijn", "Rauwe Jongen", "Bat Jacoby",
        "Qurtje Evans", "Django", "Lee de Slager", "Missouri Kind", "De Cisco Kid",
        "Tom de Sluiper", "Brennan Jeb", "Blonde Jan", "Kaleb de Veldwachter", "Jubal Vroege",
        "Buckje Molenaar", "Silas de Jager", "Ben de Vos", "Rufus Leeuw", "Amos Evert",
        "Laredo Stevens", "Frank Stekel", "Pike Bisschop", "Denton Rijder", "Zelden Gezien",
        "Krul Joe", "Blaze Brennan", "Texaanse Rood", "Reese Doorn", "Wolfje Anders",
        "Slank Wit", "Bronco Henry", "Zebulon McCandless", "Stormy Lang", "Pekel Bill",
        "Kind McCoy", "Bart Maverick", "Grafsteen Jack", "El Wolf", "Rode Ruiter",
        "Engelen Ogen", "Jake Lepel", "Hulpsheriff Dirk", "Bowie Blad", "Whip Willem",
        "Aas Hoog", "Zilveren Stad Slim", "Panhandle Piet", "Stofje de Ruiter", "Cactus Jaap",
        "Uitvaller Josey Wales", "Jackje Stro", "Grote Ijzer", "Wagen Trein Walt", "Zonnedans Slim",
        "Pistoolheld Jake", "Prerie Jaap", "Zes Schot Stef", "Bandiet Bakker", "Pistool Piet",
        "Stofje Roders", "Hickok Henk", "Bliksem Loet", "Grote Ben", "Coyote Klaas",
        "Slangen-oog Sam", "Apache Kind", "Maverick Mike", "Ranger Roel", "Mustang Matt"
    ];


    // Array to keep track of scheduled timeouts
    let scheduledTimeouts = [];

    // Function to randomize cowboy names
    function randomizeCowboys() {
        let cowboy1Name = cowboyNames[Math.floor(Math.random() * cowboyNames.length)];
        let cowboy2Name = cowboyNames[Math.floor(Math.random() * cowboyNames.length)];

        // Ensure the names are different
        while (cowboy1Name === cowboy2Name) {
            cowboy2Name = cowboyNames[Math.floor(Math.random() * cowboyNames.length)];
        }

        document.getElementById('cowboy1-name').textContent = cowboy1Name;
        document.getElementById('cowboy2-name').textContent = cowboy2Name;
    }

    // Start Duel Event Listener
    startButton.addEventListener('click', startDuel);

    // Enable player controls initially to allow starting the game with shooting inputs
    enablePlayerControls();

    function startDuel() {
        duelStarted = false;
        keyPressHandled = false;
        startButton.style.display = 'none';
        countdownEl.textContent = '';
        randomizeCowboys(); // Randomize cowboy names
        resetCowboys();
        changeBackground(); // Change the background
        gameState = 'countdown';
        startCountdown();
    }

    function startCountdown() {
        countdownEl.textContent = 'Maak je klaar...';
        suspenseSound.play(); // Start the suspense sound
        suspenseSound.playbackRate = 1.0; // Reset playback rate

        // Random delay between 3 to 11 seconds
        const randomDelay = Math.floor(Math.random() * 8000) + 3000;

        // Schedule fake cues
        const fakeCueTimes = [];
        const numberOfFakeCues = Math.floor(Math.random() * 3); // 0 to 2 fake cues
        for (let i = 0; i < numberOfFakeCues; i++) {
            fakeCueTimes.push(Math.random() * randomDelay * 0.8); // Ensure fake cues happen before the actual 'Draw!'
        }

        // Sort fake cue times
        fakeCueTimes.sort((a, b) => a - b);

        let cueIndex = 0;
        let lastTime = 0;

        function scheduleNextCue() {
            if (cueIndex < fakeCueTimes.length) {
                const delay = fakeCueTimes[cueIndex] - lastTime;
                lastTime = fakeCueTimes[cueIndex];
                const timeoutId = setTimeout(() => {
                    playFakeCue();
                    cueIndex++;
                    // Increase playback rate slightly
                    suspenseSound.playbackRate += 0.1;
                    scheduleNextCue();
                }, delay);
                scheduledTimeouts.push(timeoutId);
            } else {
                // Schedule the real 'Draw!' signal
                const remainingDelay = randomDelay - lastTime;
                const drawTimeoutId = setTimeout(() => {
                    suspenseSound.pause();
                    suspenseSound.currentTime = 0;
                    drawSound.play(); // Play the 'Draw!' sound
                    countdownEl.textContent = 'SCHIET!';
                    countdownEl.style.color = 'red'; // Change text color to red
                    duelStarted = true;
                    duelStartTime = performance.now();
                    gameState = 'duel';
                }, remainingDelay);
                scheduledTimeouts.push(drawTimeoutId);
            }
        }

        scheduleNextCue();
    }


    function playFakeCue() {
        // Display a random distraction message
        const fakeMessages = ['Klaar...', 'Voor...', 'Wacht...', 'Kalm...', 'Hold...', 'Nu...', 'Ga!'];
        countdownEl.textContent = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        setTimeout(() => {
            countdownEl.textContent = '';
        }, 500); // Display the fake cue briefly
    }

    function enablePlayerControls() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('touchstart', handleTouchStart);
        window.addEventListener("gamepadconnected", handleGamepadConnected);
        window.requestAnimationFrame(updateGamepadStatus);
    }

    function handleKeyPress(event) {
        const key = event.key.toLowerCase();
        if (gameState === 'waiting') {
            startDuel();
        } else if ((gameState === 'countdown' || gameState === 'duel') && !keyPressHandled) {
            const currentTime = performance.now();
            if (gameState === 'countdown') {
                // Penalize for shooting early
                playerReactionTime = 'Schoot te vroeg!';
                keyPressHandled = true;
                duelStarted = false;
                gameState = 'end';
                removePlayerControls();
                shootSound.play();
                flashBackground();
                // Stop the suspense sound and clear timeouts
                suspenseSound.pause();
                suspenseSound.currentTime = 0;
                scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                scheduledTimeouts = [];

                countdownEl.textContent = '';
                // Player loses
                if (key === 'a') {
                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy1', 'cowboy2'); // Player 1 loses
                } else {
                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy2', 'cowboy1'); // Player 2 loses
                }
            } else if (gameState === 'duel') {
                playerReactionTime = ((currentTime - duelStartTime) / 1000).toFixed(3);
                keyPressHandled = true;
                duelStarted = false;
                gameState = 'end';
                removePlayerControls();
                shootSound.play();
                flashBackground();
                if (key === 'a') {
                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy2', 'cowboy1');
                } else {
                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy1', 'cowboy2');
                }
            }
        }
    }

    function handleTouchStart(event) {
        const touchX = event.touches[0].clientX;
        const screenWidth = window.innerWidth;
        if (gameState === 'waiting') {
            startDuel();
        } else if ((gameState === 'countdown' || gameState === 'duel') && !keyPressHandled) {
            const currentTime = performance.now();
            if (gameState === 'countdown') {
                // Penalize for shooting early
                playerReactionTime = 'Schoot te vroeg!';
                keyPressHandled = true;
                duelStarted = false;
                gameState = 'end';
                removePlayerControls();
                shootSound.play();
                flashBackground();
                // Stop the suspense sound and clear timeouts
                suspenseSound.pause();
                suspenseSound.currentTime = 0;
                scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                scheduledTimeouts = [];

                countdownEl.textContent = '';
                // Player loses
                if (touchX < screenWidth / 2) {
                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy1', 'cowboy2'); // Player 1 loses
                } else {
                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy2', 'cowboy1'); // Player 2 loses
                }
            } else if (gameState === 'duel') {
                playerReactionTime = ((currentTime - duelStartTime) / 1000).toFixed(3);
                keyPressHandled = true;
                duelStarted = false;
                gameState = 'end';
                removePlayerControls();
                shootSound.play();
                flashBackground();
                if (touchX < screenWidth / 2) {
                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy2', 'cowboy1');
                } else {
                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                    playLoserAnimation('cowboy1', 'cowboy2');
                }
            }
        }
    }

    function handleGamepadConnected(event) {
        const gamepad = event.gamepad;
        console.log('Gamepad connected:', gamepad);
        window.requestAnimationFrame(updateGamepadStatus);
    }

    function updateGamepadStatus() {
        if (!keyPressHandled) {
            const gamepads = navigator.getGamepads();
            for (let i = 0; i < gamepads.length; i++) {
                const gp = gamepads[i];
                if (gp) {
                    for (let j = 0; j < gp.buttons.length; j++) {
                        if (gp.buttons[j].pressed) {
                            const currentTime = performance.now();
                            if (gameState === 'waiting') {
                                startDuel();
                                return;
                            }
                            if (gameState === 'countdown') {
                                // Penalize for shooting early
                                playerReactionTime = 'Schoot te vroeg!';
                                keyPressHandled = true;
                                duelStarted = false;
                                gameState = 'end';
                                removePlayerControls();
                                shootSound.play();
                                flashBackground();
                                // Stop the suspense sound and clear timeouts
                                suspenseSound.pause();
                                suspenseSound.currentTime = 0;
                                scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                                scheduledTimeouts = [];

                                countdownEl.textContent = '';
                                // Player loses
                                if (i === 0) {
                                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                                    playLoserAnimation('cowboy1', 'cowboy2');
                                } else {
                                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                                    playLoserAnimation('cowboy2', 'cowboy1');
                                }
                                return;
                            } else if (gameState === 'duel') {
                                playerReactionTime = ((currentTime - duelStartTime) / 1000).toFixed(3);
                                keyPressHandled = true;
                                duelStarted = false;
                                gameState = 'end';
                                removePlayerControls();
                                shootSound.play();
                                flashBackground();
                                if (i === 0) {
                                    playOnceGIF(cowboy1Img, "assets/CowBoyQuickDrawShot.gif");
                                    playLoserAnimation('cowboy2', 'cowboy1');
                                } else {
                                    playOnceGIF(cowboy2Img, "assets/CowBoyQuickDrawShot.gif");
                                    playLoserAnimation('cowboy1', 'cowboy2');
                                }
                                return;
                            }
                        }
                    }
                }
            }
            window.requestAnimationFrame(updateGamepadStatus);
        }
    }

    function removePlayerControls() {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener("gamepadconnected", handleGamepadConnected);
    }

    function playOnceGIF(imgElement, gifPath) {
        imgElement.src = gifPath + '?' + new Date().getTime();
    }

    function resetCowboys() {
        cowboy1Img.style.display = 'block';
        cowboy1Img.src = "assets/CowBoyIdle.gif";

        cowboy2Img.style.display = 'block';
        cowboy2Img.src = "assets/CowBoyIdle.gif";

        cowboy1Tombstone.style.display = 'none';
        cowboy2Tombstone.style.display = 'none';

        // Remove glow effect from frames
        const cowboy1Frame = document.querySelector('#cowboy1 .frame');
        const cowboy2Frame = document.querySelector('#cowboy2 .frame');
        cowboy1Frame.classList.remove('winner-glow');
        cowboy2Frame.classList.remove('winner-glow');
    }
    function flashBackground() {
        // Store the current background
        const originalBackground = document.body.style.backgroundImage;

        // Flash the background to a solid color, e.g., white
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'white';

        // After a short delay, revert the background to the original one
        setTimeout(() => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = ''; // Clear the background color
        }, 100); // 100ms flash duration
    }

    function playLoserAnimation(loser, winner) {
        const loserImg = document.getElementById(`${loser}-img`);
        const loserTombstone = document.getElementById(`${loser}-tombstone`);
        const winnerImg = document.getElementById(`${winner}-img`);
        const winnerName = document.getElementById(`${winner}-name`).textContent;

        const loserFrame = document.querySelector(`#${loser} .frame`);
        const winnerFrame = document.querySelector(`#${winner} .frame`);
        setTimeout(() => {
            loserImg.style.display = 'none';
            loserTombstone.style.display = 'block';
        }, 1500); // Adjusted to ensure full animation plays

        setTimeout(() => {
            playOnceGIF(winnerImg, "assets/CowBoySmokingIdle.gif");
            winMusic.play();

            // Add glow effect to the winning cowboy's frame
            winnerFrame.classList.add('winner-glow');
            countdownEl.textContent = '';
            winnerTextEl.textContent = `${winnerName} Wins!`;
            winnerAnnouncement.style.display = 'block';
            reactionTimesEl.style.display = 'block';
            reactionTimeText.textContent = `Reaction Time: ${playerReactionTime} seconds`;

            // Update the leaderboard if the player didn't shoot early
            if (playerReactionTime !== 'Schoot te vroeg!') {
                updateLeaderboard(winnerName, parseFloat(playerReactionTime));
                displayLeaderboard();
            }

            gameState = 'end';
            enableResetOnInput();
        }, 1500); // Adjusted timing

        countdownEl.textContent = '';
    }

    function enableResetOnInput() {
        document.addEventListener('keydown', resetGameOnInput);
        document.addEventListener('touchstart', resetGameOnInput);
        window.addEventListener("gamepadconnected", handleGamepadConnected);
    }

    function resetGameOnInput() {
        document.removeEventListener('keydown', resetGameOnInput);
        document.removeEventListener('touchstart', resetGameOnInput);
        window.removeEventListener("gamepadconnected", handleGamepadConnected);
        winMusic.pause();
        winMusic.currentTime = 0;
        reactionTimesEl.style.display = 'none';
        winnerAnnouncement.style.display = 'none';
        gameState = 'waiting';
        resetGame();
        enablePlayerControls(); // Re-enable controls for the next game
    }

    function resetGame() {
        resetCowboys();
        countdownEl.textContent = "";
        startButton.style.display = 'block';
        countdownEl.style.color = '#FFD700'; // Change text color to red
    }

    // Leaderboard Functions
    function loadLeaderboard() {
        let leaderboard = localStorage.getItem('leaderboard');
        if (leaderboard) {
            return JSON.parse(leaderboard);
        } else {
            return [];
        }
    }

    function saveLeaderboard(leaderboard) {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    function updateLeaderboard(name, reactionTime) {
        let leaderboard = loadLeaderboard();
        leaderboard.push({ name: name, reactionTime: reactionTime });
        // Sort by fastest reaction time
        leaderboard.sort((a, b) => a.reactionTime - b.reactionTime);
        // Keep only top 5 scores
        leaderboard = leaderboard.slice(0, 5);
        saveLeaderboard(leaderboard);
    }

    function displayLeaderboard() {
        const leaderboard = loadLeaderboard();
        leaderboardList.innerHTML = '';
        leaderboard.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `${entry.name}: ${entry.reactionTime.toFixed(3)} seconds`;
            leaderboardList.appendChild(listItem);
        });
    }

    function changeBackground() {
        const backgrounds = [
            'assets/backgrounds/background.png',
            'assets/backgrounds/canyon.png',
            'assets/backgrounds/forest.jpg'
        ];
        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        document.body.style.backgroundImage = `url('${randomBackground}')`;
    }

    // Display the leaderboard on page load
    changeBackground();
    displayLeaderboard();
    // Function to hide the address bar on mobile
    function hideAddressBar() {
        window.scrollTo(0, 1);
    }

// Call this function when the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
        hideAddressBar();
    });

// Additionally, when resizing or orientation change occurs
    window.addEventListener("resize", hideAddressBar);
    window.addEventListener("orientationchange", hideAddressBar);

});
