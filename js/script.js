// Free code variable declarations
let canvas, context;
let backgroundImage, knightImage, kingImage;
let knightPosition, knightFrame, kingPosition, kingFrame;
let gameWidth, gameHeight;
let lastUpdateTime, deltaTime;

// Assets paths
let backgroundImageSrc = 'assets/background/ThroneRoom.png';
let KingImageSrc = 'assets/characters/KingKnight.png';
let knightImageSrc = 'assets/characters/RegularKnight.png';

// music
let backgroundMusic = 'assets/music/backGroundMusic.mp3';



// Initialize function
function initialize() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    // Resize canvas to fill window
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;

    canvas.width = gameWidth;
    canvas.height = gameHeight;

    // Load images
    backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    
    knightImage = new Image();
    knightImage.src = knightImageSrc;

    kingImage = new Image();
    kingImage.src = KingImageSrc;
    
    
    // Initialize knight position and frame
    knightPosition = { x: gameWidth / 4, y: gameHeight / 2 }; // Starting at the left, middle of the screen
    knightFrame = 0; // Assuming the first frame of the sprite is the standing pose

    kingPosition = { x: 3 * gameWidth / 4, y: gameHeight / 2 };// Starting at the left, middle of the screen
    kingFrame = 0; 

    // Set up the last update time
    lastUpdateTime = Date.now();

    // Start the game loop once assets are loaded
    backgroundImage.onload = kingImage.onload = knightImage.onload = function() {
        // Make sure all images are loaded before starting the game loop
        if(backgroundImage.complete && kingImage.complete && knightImage.complete) {
            requestAnimationFrame(gameLoop);
        }
    };
}


// Constants for the knight's sprite sheet
const knightFrameWidth = 30; // The width of each frame in the sprite sheet
const knightFrameHeight = 23; // The height of each frame in the sprite sheet
const knightAnimationRowY = knightFrameHeight * 1; // 2nd row (0-indexed so it's multiplied by 1)
const knightTotalFrames = 2; // Total frames in the knight's walking animation
const knightAnimationSpeed = 0.3; // Knight's animation speed


// Constants for the king's sprite sheet
const kingFrameWidth = 15; // The width of each frame in the sprite sheet
const kingFrameHeight = 193.1 ; // The height of each frame in the sprite sheet
const kingAnimationRowY = kingFrameHeight * 10; // 11th row (0-indexed so it's multiplied by 10)
const kingTotalFrames = 6; // Total frames in the king's walking animation
const kingAnimationSpeed = 0.3; // King's animation speed

let conversationStage = 0; // A variable to track the stage of the conversation
// Additional variables for controlling the animation state
let knightMovingRight = true;
let kingMovingLeft = true;


function update() {
    let now = Date.now();
    deltaTime = (now - lastUpdateTime) / 1000;
    lastUpdateTime = now;

    switch(conversationStage) {
        case 0:
            // Move knight towards the king
            if (knightPosition.x < (gameWidth / 2 - knightFrameWidth)) {
                knightPosition.x += kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++; // Move to the next stage
            }
            break;
        case 1:

            // Move knight towards the king
            if (knightPosition.x < (gameWidth / 2 - knightFrameWidth)) {
                knightPosition.x += kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++; // Move to the next stage
            }
            break;
        case 2:
            // King moves slightly to the left
            if (kingPosition.x > (gameWidth / 2 - kingFrameWidth - 50)) { // 50 is a small step
                log.console("gameWidth"+gameWidth)
                log.console("gameWidth"+gameWidth)
                kingPosition.x -= kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break;
        case 3:
            // King moves slightly down
            if (kingPosition.y < (gameHeight / 2 + 50)) { // 50 is a small step
                kingPosition.y += kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break;
        case 4:
            // Knight moves slightly down
            if (knightPosition.y < (gameHeight / 2 + 50)) { // 50 is a small step
                knightPosition.y += kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break;
        case 5:
            // King moves slightly to the left
            if (kingPosition.x > (gameWidth / 2 - kingFrameWidth - 50)) { // 50 is a small step
                kingPosition.x -= kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break; 
        case 6:
            // Knight moves slightly to the Right
            if (knightPosition.x > (gameWidth / 2 - knightFrameWidth + 50)) { // 50 is a small step
                knightPosition.x -= kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break;
        case 7:
            // King moves slightly up
            if (kingPosition.y > (gameHeight / 2 - 50)) {
                kingPosition.y -= kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break; 
        case 8:
            // Kightmoves slightly up
            if (knightPosition.y > (gameHeight / 2 - 50)) {
                knightPosition.y -= kingAnimationSpeed * deltaTime;
            } else {
                conversationStage++;
            }
            break;      
    }

    // // Knight's movement logic
    // if (knightMovingRight) {
    //     knightPosition.x += 100 * deltaTime;
    //     if (knightPosition.x > gameWidth - knightFrameWidth) {
    //         knightMovingRight = false;
    //     }
    // } else {
    //     knightPosition.x -= 100 * deltaTime;
    //     if (knightPosition.x < 0) {
    //         knightMovingRight = true;
    //     }
    // }

    // // King's movement logic
    // if (kingMovingLeft) {
    //     kingPosition.x -= 100 * deltaTime;
    //     if (kingPosition.x < 0) {
    //         kingMovingLeft = false;
    //     }
    // } else {
    //     kingPosition.x += 100 * deltaTime;
    //     if (kingPosition.x > gameWidth - kingFrameWidth) {
    //         kingMovingLeft = true;
    //     }
    // }

    // Update the frame index for knight and king animation
    // Assuming we have functions getKnightFrame() and getKingFrame() that return the appropriate frame
    knightFrame = getFrame(deltaTime, knightFrame, knightTotalFrames, knightAnimationSpeed);
    kingFrame = getFrame(deltaTime, kingFrame, kingTotalFrames, kingAnimationSpeed);

}






// Generic getFrame function to update animation frames for both knight and king
function getFrame(deltaTime, currentFrame, totalFrames, animationSpeed) {
    // Increment the frame index based on the deltaTime and animationSpeed
    currentFrame += deltaTime * animationSpeed;

    // Use Math.floor to get a whole number frame index
    currentFrame = Math.floor(currentFrame);

    // Wrap the frame index if it exceeds the total number of frames
    if (currentFrame >= totalFrames) {
        currentFrame = 0;
    }

    return currentFrame;
}


// Draw function
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    context.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);

    // Draw the knight at the updated position and frame
    drawFrame(knightImage, knightFrame, knightPosition.x, knightPosition.y, knightFrameWidth, knightFrameHeight, knightAnimationRowY, knightTotalFrames);

    // Draw the king at the updated position and frame
    drawFrame(kingImage, kingFrame, kingPosition.x, kingPosition.y, kingFrameWidth, kingFrameHeight, kingAnimationRowY, kingTotalFrames);
}

    // Helper function to draw frames from the sprite sheet
    function drawFrame(image, frameIndex, posX, posY, frameWidth, frameHeight, animationRowY, totalFrames) {
        let frameX = (frameIndex % totalFrames) * frameWidth;
        let frameY = animationRowY; // Y coordinate for the specific animation row

        context.drawImage(
            image,
            frameX,
            frameY,
            frameWidth,
            frameHeight,
            posX,
            posY,
            frameWidth,
            frameHeight
        );

    // Draw text boxes based on the conversation stage
    context.fillStyle = 'white'; 
    context.font = '16px Arial'; 

    // const textMargin = 20; 

    
    // const textY = canvas.height - textMargin;

    // const textWidth = context.measureText(text).width;
    // const textX = (canvas.width - textWidth) / 2;

    
    switch(conversationStage) {
        case 0:
            context.fillText("Narrator: In the grand castle of Eldoria, a knight named Sir Byte, once hailed as a hero, makes his way through the dimly lit corridors towards the throne room. His heart heavy with anticipation, for today he is to face his liege, King Algorithm, and learn the truth behind his unjust exile.", 50, 50);
            break;
        case 1:
            context.fillText("Sir Byte: (with determination) Your Majesty, I stand before you. What is the meaning of these accusations?", 50, 80);
            break;
        case 2:
            context.fillText("King Algorithm: (coldly) Sir Byte, once my most trusted knight, I have received grave reports of your treachery. Rumors have reached my ears that you conspired with our enemies, betraying your oath and our kingdom.", 50, 50); 
            break;
        case 3:
            context.fillText("Sir Byte: (shocked) Your Majesty, I assure you, these accusations are baseless! I have served you faithfully, risking my life countless times in your name.", 50, 80);
            break;
        case 4:
            context.fillText("King Algorithm: (dismissively) Words can be deceiving, Sir Byte. The evidence against you is substantial. Witnesses claim to have seen you meeting with known enemies in secret.", 50, 50); 
            break;
        case 5:
            context.fillText("Narrator: The knight's eyes widen, disbelief and anger coursing through his veins. He realizes that he has become a pawn in a wicked game, orchestrated by the very king he had sworn to protect.", 50, 80);
            break;
        case 6:
            context.fillText("Sir Byte: (voice trembling with anger) My liege, I have been betrayed! It is you who have conspired against me, not the other way around. I shall not rest until I uncover the truth and bring justice to the name of Sir Byte!", 50, 50); 
            break;
        case 7:
            context.fillText("Narrator: With a heavy heart and a burning desire for vengeance, Sir Byte embarks on a perilous journey. He must gather allies, uncover the truth, and restore his honor, all while facing the challenges that lie ahead.", 50, 80); 
            break;
        case 8:
            context.fillText("Narrator: The tale of Sir Byte's quest for redemption begins now.", 50, 50); 
            break;
    }
}

// Game loop function
function gameLoop() {
    update(); // Update the position and state
    draw();   // Draw the updated state
    requestAnimationFrame(gameLoop); // Request the next frame
}

document.getElementById('startButton').addEventListener('click', function() {
    let backgroundMusicElement = new Audio(backgroundMusic);
    backgroundMusicElement.play()
    .catch(e => console.error('Failed to start background music:', e));

    // Remove the button after starting the game
    this.remove();

    // Stop music after 60 seconds
    setTimeout(() => {
        backgroundMusicElement.pause();
    }, 60000);

    // Start everything by initializing
    initialize();
});
