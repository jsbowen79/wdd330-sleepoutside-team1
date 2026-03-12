const nodeList = document.querySelectorAll(".products a"); 
nodeList.forEach(element => {
    element.addEventListener('click', () => {
        init();
    })
});
