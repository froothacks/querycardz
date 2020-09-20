var card = document.querySelector('.flipcard');

card.addEventListener( 'click', function() {
    console.log("clicked"); 
    card.classList.toggle('is-flipped');
});