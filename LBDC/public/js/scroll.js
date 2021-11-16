const setupScrolling = () => {
    const container = [...document.querySelectorAll('.film-container')]
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')]
    const preBtn = [...document.querySelectorAll('.pre-btn')]


    container.forEach((scroll, i) => {
        // Le getBoundingClientRect permet de retourner les dimensions du container.
        let containerDimensions = scroll.getBoundingClientRect();
        let containerWidth = containerDimensions.width;


        nxtBtn[i].addEventListener('click', () => {
            scroll.scrollLeft += containerWidth
        })

        preBtn[i].addEventListener('click', () => {
            scroll.scrollLeft -= containerWidth
        })
    })



}