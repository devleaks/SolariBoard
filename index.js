/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

require(["lib/domReady", // Waits for page load
    "lib/gl-util",
    "src/renderer",
], function(doc, glUtil, Renderer) {
    "use strict";
    //
    // Create gl context and start the render loop
    //
    var canvas = document.getElementById("canvas");
    var gl = glUtil.getContext(canvas);
    var renderer;

    if(!gl) {
        // Replace the canvas with a message that instructs them on how to get a WebGL enabled browser
        //glUtil.showGLFailed(frame);
        console.log('webgl initialization failed');
        return;
    }

    canvas.width = 512;window.innerWidth;
    canvas.height = 512; window.innerHeight;

    renderer = new Renderer(gl, canvas);
    renderer.resize(gl, canvas);

    glUtil.startRenderLoop(gl, canvas, function(gl, timing) {
        renderer.drawFrame(gl, timing);
    });

    //
    // Wire up the Fullscreen button
    //
    var fullscreenBtn = document.getElementById("fullscreen");

    document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen;

    var canvasOriginalWidth = canvas.width;
    var canvasOriginalHeight = canvas.height;
    /*fullscreenBtn.addEventListener("click", function() {
        if(frame.webkitRequestFullScreen) {
            frame.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if(frame.mozRequestFullScreen) {
            frame.mozRequestFullScreen();
        }
    }, false);
    */
    function fullscreenchange() {
        if(document.webkitIsFullScreen || document.mozFullScreen) {
            canvas.width = screen.width;
            canvas.height = screen.height;
        } else {
            canvas.width = canvasOriginalWidth;
            canvas.height = canvasOriginalHeight;
        }
        renderer.resize(gl, canvas);
    }
});
