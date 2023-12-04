document.addEventListener('DOMContentLoaded', function() {
const myBoxes = document.querySelectorAll('.box')
const playerBtn = document.getElementById('player-btn')
const restartBtn = document.getElementById('restart-btn')
const aiBtn = document.getElementById('ai-btn')
const winner = document.getElementById('results-container')


const Game = {
    rows: rows = 3,
    columns: columns = 3,
    board: board = ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    players: ['player1', 'player2'],
    aiPlayer: 'O',
    gameEnd: false,
    resetGame: false,
    aiActive: false,
    playerMode: true,
}

    function switchPlayers(){
        Game.currentPlayer = Game.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    function resetGame(){
        Game.board = ['', '', '', '', '', '', '', '', '']
        Game.currentPlayer = 'X'
        Game.gameEnd = false;
        myBoxes.forEach(box => {
        box.textContent = '';
        aiBtn.disabled = false;
        playerBtn.disabled = false;
        winner.textContent = ''
        })
    }

    aiBtn.addEventListener('click', e => {
        if(!Game.gameEnd){
            Game.aiActive = true;
            Game.playerMode = false;
            aiBtn.disabled = false;
            playerBtn.disabled = true;
        }
    })

    playerBtn.addEventListener('click', e => {
        if(!Game.gameEnd){
            Game.playerMode = true
            Game.aiActive = false;
            playerBtn.disabled = false;
            aiBtn.disabled = true; 
        }
    })


    myBoxes.forEach(myBox =>{
        myBox.addEventListener('click', e => {
            if(!Game.gameEnd != false){
                const index = Array.from(myBoxes).indexOf(myBox);
                addValue(index);
            }
        })
    })
    
    function addValue(index){
        if(Game.board[index] === ''){
            Game.board[index] = Game.currentPlayer;
            updateCell(index, Game.currentPlayer);
            switchPlayers();
            winningResults();
            checkDraw();
            if(Game.currentPlayer === Game.aiPlayer && !Game.gameEnd && Game.aiActive != false){
                aiMove()
            }    
        }
    }
    
    
    function updateCell(index, value){
        myBoxes[index].textContent = value
    }
    
    function winningResults(){
        winResults =[
            [0, 1, 2],
            [0, 3, 6],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [0, 4, 8] 
        ]
        
        for(let results of winResults){
            const [a, b, c] = results;
            
            if(
                Game.board[a] !== '' &&
                Game.board[a] === Game.board[b] &&
                Game.board[a] === Game.board[c]
                ){
                    {
                        if (Game.aiActive && Game.board[a] === Game.aiPlayer) {
                            winner.textContent = 'Ai wins'
                        } else {
                            winner.textContent = (`${Game.players[Game.currentPlayer === 'X' ? 1 : 0]} wins!`);
                        }
                        Game.gameEnd = true;
                    }
                }
            }
        }
        function checkDraw() {
            if (!Game.board.includes('') && !Game.gameEnd) {
                winner.textContent = ('The game ends in a draw!');
                Game.gameEnd = true;
            }
        }

    restartBtn.addEventListener('click', resetGame)

    function aiMove(){
        const emptyIndexes = [];
        for(let i = 0; i < Game.board.length; i++){
            if(Game.board[i] === ''){
                emptyIndexes.push(i)
            }
        }
    
        const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
        Game.board[randomIndex] = Game.aiPlayer;
        updateCell(randomIndex, Game.aiPlayer);
        switchPlayers();
        winningResults();
        checkDraw();
    }
    
});