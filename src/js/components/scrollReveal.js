import ScrollReveal from 'scrollreveal';
export default class RevealAction {

    constructor(){
        window.sr = ScrollReveal();
        sr.reveal('.project-infos');
    }
} 