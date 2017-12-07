import SwipeAction from './components/swipe.js';
import RevealAction from './components/scrollReveal.js';
import MasonryJs from './components/masonry.js';

const BODY = document.querySelector('body')

document.addEventListener("DOMContentLoaded", () => 
{
    if (BODY.classList.contains('homepage'))
    {
        new SwipeAction()
        new RevealAction();
    } else if (BODY.classList.contains('gallery'))
    {
      new MasonryJs()
    }    
})
