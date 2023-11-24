//display name and nickname
function displayname() {
    let playername = document.getElementById("namedisplay");
    let playernickname = document.getElementById("nicknamedisplay");
    playername.textContent = localStorage.getItem('name');
    playernickname.textContent = localStorage.getItem('nickname');
 }
 
 // shuffle tiles and start game
 let tiles = Array.from(document.getElementsByClassName("tile"));
 
 function shuffletiles(tiles) {
    let currentindex = tiles.length;
    let temp;
    let randomindex;
    while (0 !== currentindex) {
        randomindex = Math.floor(Math.random() * currentindex);
        currentindex -= 1;
        temp = tiles[currentindex];
        tiles[currentindex] = tiles[randomindex];
        tiles[randomindex] = temp;
    }
    return tiles;
 }
 
 function startgame() {
    tiles = shuffletiles(tiles);
    tiles.forEach((item, index) => {
        item.style.order = index + 1;
    });
 
    let emptyTiles = Array.from(document.getElementsByClassName('empty'));
    emptyTiles.forEach((item, index) => {
        let bombCount = updateCount(index);
        item.textContent = bombCount;
    });
 }
 
 //timer
 let finaltime = 0;
 let finalnoofclicks = 0;
 let time = document.getElementById('time');
 let seconds = 0;
 let timer;
 
 function startTimer() {
    timer = setInterval(() => {
        seconds++;
        time.textContent = seconds;
        finaltime = seconds;
    }, 1000)
 }
 
 //updating clicks
 let clicks = 0;
 let click = document.getElementById('clicks');
 
 tiles.forEach((item) => {
    item.addEventListener('click', () => {
        clicks++;
        click.textContent = clicks;
        finalnoofclicks = clicks;
    })
 })
 
 //gameover
 let bombs = Array.from(document.getElementsByClassName('bombtile'));
 let bombs1 = Array.from(document.getElementsByClassName('bomb'));
 
 bombs1.forEach((item) => {
    item.addEventListener('click', () => {
        alert("Game Over!");
        localStorage.setItem("timetaken", finaltime);
        localStorage.setItem("noofclicks", finalnoofclicks);
    })
 })
 
 //directions
 let directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1]
 ];
 
 function updateCount(index) {
    let bombs = 0;
    let x = index % 8; // assuming an 8x8 grid
    let y = Math.floor(index / 8);
 
    for (let i = 0; i < directions.length; i++) {
        let newX = x + directions[i][0];
        let newY = y + directions[i][1];
 
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            let aroundIndex = newY * 8 + newX;
            if (tiles[aroundIndex].classList.contains('bomb')) {
                bombs++;
            }
        }
    }
    return bombs;
 }
 
 displayname();
 startTimer();
 startgame();
 