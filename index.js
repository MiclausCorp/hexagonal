//
//  index.js
//  Main Javascript Code for Hexagonal
//
//  Created by mdarius13 on 01.29.2022.
//
//  Copyright 2022 mdarius13
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, 
//  modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
//  persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall 
//  be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
//  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
//  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
//  OR OTHER DEALINGS IN THE SOFTWARE.

/* --- Global HTML Objects --- */
/// Uploaded image
const imgInput = document.getElementById('input');

/// Working Canvas
const canvas = document.getElementById("canvas");

/// Working Canvas Context
const canvasContext = canvas.getContext("2d");

/// File Uploaded
const fileChosen = document.getElementById('file-chosen');

/* --- Global Variables --- */
/// Hexagon mask image
const hexagonMask = new Image();
hexagonMask.src = "mask.PNG";

/// Demo Image
const demoImage = new Image();
demoImage.src = "demo.PNG";

/* --- Initialization Code --- */
window.onload = function() {
    /// Get current year for footer.
    document.getElementById("year").innerHTML = `${new Date().getFullYear()}`;

    /// Initial demo canvas image
    canvasContext.drawImage(demoImage, 0, 0, 400, 400);
}

/// Image Upload global event
imgInput.addEventListener('change', function (e) {
        if (e.target.files) {
            // Get the first uploaded file
            let imageFile = e.target.files[0];

            // Set the title
            fileChosen.textContent = imageFile.name;

            // Read the file
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);

            // Load the canvas with the file
            reader.onloadend = function (e) {
                // Creates image object
                var image = new Image();

                // Assign converted image to image object
                image.src = e.target.result;
                
                // Drawing event:
                image.onload = function () {
                    // Load the mask
                    canvasContext.drawImage(hexagonMask, 0, 0);

                    // Change composite mode to use the Hexagon mask
                    canvasContext.globalCompositeOperation = 'source-in';

                    // Draw image to canvas
                    canvasContext.drawImage(image, 0, 0, 400, 400);

                    // Assigns image base64 string in jpeg format to a variable
                    // let imgData = canvas.toDataURL("image/jpeg", 1);
                };
            };
        }
    }
);