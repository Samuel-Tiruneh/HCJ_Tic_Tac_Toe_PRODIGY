// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const playFriendButton = document.getElementById('playFriend');
    const playAIButton = document.getElementById('playAI');
    const modeText = document.getElementById('modeText');
  
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let gameActive = true;
    let isPlayingWithAI = false;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add(currentPlayer); 
    };
  
    const handlePlayerChange = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    };
  
    const handleResultValidation = () => {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} wins!`; 
        gameActive = false;
        // Add blur and rocket animation
        document.getElementById('game').classList.add('blur');
        const rocket = document.createElement('div');
        rocket.classList.add('rocket');
        rocket.textContent = '🚀';
        document.body.appendChild(rocket);
        return;
      }
  
      const roundDraw = !gameState.includes('');
      if (roundDraw) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
      }
  
      handlePlayerChange();
      if (isPlayingWithAI && currentPlayer === 'O') {
        aiMove();
      }
    };
  
    const handleCellClick = (e) => {
      const clickedCell = e.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    };
  
    const resetGame = () => {
      gameActive = true;
      currentPlayer = 'X';
      gameState = Array(9).fill('');
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); 
      });
      statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
      modeText.textContent = '';
      document.getElementById('game').classList.remove('blur');
      const rocket = document.querySelector('.rocket');
      if (rocket) {
        rocket.remove();
      }
    };
  
    const aiMove = () => {
      statusDisplay.textContent = 'AI is thinking...';
      setTimeout(() => {
        let availableCells = gameState
          .map((cell, index) => (cell === '' ? index : null))
          .filter(index => index !== null);
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomCell] = 'O';
        const aiCell = cells[randomCell];
        aiCell.textContent = 'O';
        aiCell.classList.add('O'); 
        handleResultValidation();
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
      }, 3000); 
    };
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    playFriendButton.addEventListener('click', () => {
      isPlayingWithAI = false;
      resetGame();
      modeText.textContent = 'You are playing with a friend';
      playFriendButton.classList.add('active');
      playAIButton.classList.remove('active');
    });
    playAIButton.addEventListener('click', () => {
      isPlayingWithAI = true;
      resetGame();
      modeText.textContent = 'You are playing with AI';
      playAIButton.classList.add('active');
      playFriendButton.classList.remove('active');
    });
  
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  });
  