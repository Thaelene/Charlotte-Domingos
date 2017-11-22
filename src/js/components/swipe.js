import HammerJs from './hammer.js'

export default class SwipeAction {
    constructor() {
        this.projects = {}
        this.projects.thumbnail = document.querySelectorAll('.project-infos_img')
        this.projects.information = document.querySelectorAll('.project-infos_synopsis')
        this.initEvents()

    }

    initEvents() {
        let that = this

        this.projects.thumbnail.forEach(function (thumbnail) {
            let thumbnailImg = new Hammer(thumbnail)
            thumbnailImg.on('panleft', function (ev) {
                showInfo(thumbnailImg)
            })
        });

        this.projects.information.forEach(function (information) {
            let informationBlock = new HammerJs(information)
            informationBlock.on('panright', function (ev) {
                hideInfo(informationBlock)
            })
        })

        function showInfo(e) {
            let projectName = e.element.dataset.name
            let projectNextSibling = e.element.nextElementSibling

            if ((projectName === 'Saut') || (projectName === 'Icare') || (projectName === 'Abyssal') || (projectName === 'Pimbeche')){
                projectNextSibling.style.transform = 'translateY(-100%) translateX(0)'
            }
        }

        function hideInfo(e) {
            let projectInfo = e.element

            projectInfo.style.transform = 'translateY(-100%) translateX(160%)'
        }
    }

}