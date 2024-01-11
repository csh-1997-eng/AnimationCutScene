function getFrameSize(spriteSheetImage, totalRows, totalColumns) {
    // Make sure the image is fully loaded
    if (spriteSheetImage.complete && spriteSheetImage.naturalHeight && spriteSheetImage.naturalWidth) {
        // The width of each frame is the total width of the sprite sheet divided by the number of columns
        let frameWidth = spriteSheetImage.naturalWidth / totalColumns;

        // The height of each frame is the total height of the sprite sheet divided by the number of rows
        let frameHeight = spriteSheetImage.naturalHeight / totalRows;

        console.log(`Each frame is ${frameWidth} pixels wide and ${frameHeight} pixels tall.`);
        return { frameWidth, frameHeight };
    } else {
        console.error('Sprite sheet image is not fully loaded to determine frame size.');
        return null;
    }
}


// Example usage
window.onload = function() {
    let spriteSheet = new Image();
    spriteSheet.onload = function() {
        let totalRows = 8
        let totalColumns = 2
        getFrameSize(spriteSheet, totalRows, totalColumns);
    };
    spriteSheet.src = 'characters/RegularKnight.png'; // Provide the actual path to your sprite sheet
};
