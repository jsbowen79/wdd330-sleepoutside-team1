document.addEventListener('DOMContentLoaded', () =>{

    const h1EL = document.querySelector('h1'); 
    const startButtonEL = document.querySelector('#start'); 
    const pauseButtonEL = document.querySelector('#pause'); 
    
    let timeLeft = 10; 
    
    function decrementTimer() {
        timeLeft -= 1;
        h1EL.textContent = timeLeft;
        if (timeLeft < 1) {
            setTimeout(() => {
                clearInterval(timer);
                h1EL.textContent = 'Time is Up!';
            })
                
        };
    }
    
    
    startButtonEL.addEventListener('click', () => {
        timer = setInterval(decrementTimer, 1000); 
    })
    
    pauseButtonEL.addEventListener('click', () => {
        clearInterval(timer); 
    })
    
})