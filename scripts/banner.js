const CFonts = require('cfonts');

function emsBanner() {
    CFonts.say('Employee|Management|System', {
        font: 'block',              // define the font face
        align: 'center',            // define text alignment
        colors: ['#34ffed'],        // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
        env: 'node'                 // define the environment CFonts is being executed in
    });
} // end of ems Banner (called from index.js)

module.exports = emsBanner