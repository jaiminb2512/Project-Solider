const menElement = document.querySelector('.men')
const menMenuContainer = document.querySelector('.men-menu-container')

menElement.addEventListener('mouseover', () => {
    menMenuContainer.style.display = 'block'
    menElement.style.borderBottom = '3px solid #ee5f73' 
});

menElement.addEventListener('mouseout', () => {
    menMenuContainer.style.display = 'none';
    menElement.style.borderBottom = 'none' 
});

const leftRound = document.getElementById('left-round');
const rightRound = document.getElementById('right-round');
const row1 = document.querySelector('.items-row-1'); 
const row2 = document.querySelector('.items-row-2'); 

rightRound.addEventListener('click', () => {
    row2.style.width = '100%';    
    row1.style.width = '0';
});

leftRound.addEventListener('click', () => {
    row1.style.width = '100%';    
    row2.style.width = '0';
});
