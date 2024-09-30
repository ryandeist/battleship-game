# Browser Battleship Game
![Battleship Game Screenshot](https://github.com/user-attachments/assets/8cbabfed-b6be-480c-8f4a-acb3814ffe24)



This program is an adaptation of the classic board game, Battleship. I chose this game not just because I remember it fondly from my childhood, but also it presented a great opportunity to solve unique challenges in JavaScript, like how to place the ships, validating possible placements, and sink logic. As opposed to most other browser versions of this game that have the ship placement logic handled using CSS and HTML, I developed all of the logic exclusively with JavaScript. 

## Overview:
- This is a two player game.
- Each player is represented by a 10x10 board.
- Each board has five hidden ships of varying length placed randomly on their board.
- Ships can be placed horizonally or vertically. Boats cannot overlap.
- To play, the players take turns attempting to *'hit'* and enemy ship by selecting a square on their oppenents board.
- A ship will *'sink'* if all of the board squares it occupies are hit.
- The first player to sink all their opponents ships wins the game!

[**Deployed App**](https://ryandeist.github.io/battleship-game/)

[**Original Planning Materials**](https://github.com/ryandeist/battleship-game/blob/main/project-plan.txt)

## Assets Attribution: 
- [Title Background Image](https://www.nicepng.com/downpng/u2w7e6u2t4a9e6q8_picture-library-battleship-clipart-aircraft-carrier-aircraft-carrier/)
- [Galley Font](https://www.freefonts.io/download/galley/)
- [Alfa Slab One Font](https://fonts.google.com/)
- [Explosion Image](https://www.nicepng.com/downpng/u2q8a9a9e6t4y3e6_explosion-png-red-explosion-png/)
- [White 'X' Image](https://www.nicepng.com/downpng/u2q8i1a9r5i1e6u2_buy-online-transparent-white-x-png/)
- [Other Ship Images](https://imgbin.com/png/X6THe2CH/warship-maritime-transport-stock-illustration-png)

## Built with:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Next Steps:
- Refactor CSS for mobile.
- Refactor for drier code.
- Audio cues for hits, misses, and sinks.
- Collapsible instructions.
- Hover effect putting a target on the hovered square.
- Allow custom ship placement.
- Add computer player functionality.
