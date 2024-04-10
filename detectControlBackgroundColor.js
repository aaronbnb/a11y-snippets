// the goal here is to determine the background color of an html element.
// with this information, one can create a focus style that satisfies color contrast requirements
// alternatively, one might do a focus outline that is an animation

function getSurroundingColor(elementId) {
    // Get the element by its ID
    var element = document.getElementById(elementId);

    // Get the computed style of the element
    var computedStyle = window.getComputedStyle(element);

    // Get the width and height of the element
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    // Get the position of the element
    var rect = element.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;

    // Create a canvas element to draw the surroundings
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Get the 2D context of the canvas
    var context = canvas.getContext("2d");

    // Draw the surroundings of the element on the canvas
    context.drawImage(window.screen.availWidth, window.screen.availHeight, x, y, width, height, 0, 0, width, height);

    // Get the pixel data of the canvas
    var imageData = context.getImageData(0, 0, width, height).data;

    // Calculate the average color of the surroundings
    var totalRed = 0,
        totalGreen = 0,
        totalBlue = 0;
    for (var i = 0; i < imageData.length; i += 4) {
        totalRed += imageData[i];
        totalGreen += imageData[i + 1];
        totalBlue += imageData[i + 2];
    }
    var averageRed = Math.round(totalRed / (imageData.length / 4));
    var averageGreen = Math.round(totalGreen / (imageData.length / 4));
    var averageBlue = Math.round(totalBlue / (imageData.length / 4));

    // Format the RGB values
    var surroundingColor = "rgb(" + averageRed + ", " + averageGreen + ", " + averageBlue + ")";

    // Return the surrounding color
    return surroundingColor;
}

// Example usage:
var surroundingColor = getSurroundingColor("your-element-id");
console.log("Surrounding color: " + surroundingColor);
