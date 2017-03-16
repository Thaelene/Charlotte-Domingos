var cards = {};

cards.element = {};
cards.element.thumbnail = document.querySelectorAll('.projects-video-card');
cards.element.description = document.querySelector('.projects-video-content');
cards.element.description_card = document.querySelectorAll('.projects-video-content-description');

cards.element.thumbnail[0].addEventListener('click', function()
{
    if (this.classList.contains("active"))
    {
        close_card(this, 0)
    } else
    {
        animation_card(this, 0);
    }
});
cards.element.thumbnail[1].addEventListener('click', function()
{
    if (this.classList.contains("active"))
    {
        close_card(this, 1)
    } else
    {
        animation_card(this, 1);
    }

});
cards.element.thumbnail[2].addEventListener('click', function()
{
    if (this.classList.contains("active"))
    {
        close_card(this, 2)
    } else
    {
        animation_card(this, 2);
    }
});
cards.element.thumbnail[3].addEventListener('click', function()
{
    if (this.classList.contains("active"))
    {
        close_card(this, 3)
    } else
    {
        animation_card(this, 3);
    }
});

function animation_card(elm, data_attr)
{
    for (var i = 0; i < cards.element.thumbnail.length; i++)
    {
        if (cards.element.thumbnail[i].classList.contains("active"))
        {
            cards.element.description_card[i].style.display = "none";
            cards.element.thumbnail[i].classList.remove("active");
        } else
        {
            elm.className += " active";
            cards.element.description_card[data_attr].style.display = "flex";
        }
    }
}


function close_card(elm, data_attr)
{
    cards.element.description_card[data_attr].style.display = "none";
    elm.classList.remove("active");
}

console.log(cards.element.thumbnail.length);
