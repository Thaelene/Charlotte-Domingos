var cards = {};

cards.element = {};
cards.element.card = document.querySelectorAll('.projects-video-card');
cards.element.card_content = document.querySelectorAll('.projects-video-content-description');

cards.element.card[1].addEventListener('click', function()
{
    this.className += ' active';
});
