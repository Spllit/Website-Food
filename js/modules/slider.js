function slider({sliderContainer, slides, sliderTrack, totalValue, currentValue, nextArrow, prevArrow, dotsContainer, dot}){
    // slider
    const slider = document.querySelector(sliderContainer),
        img = document.querySelectorAll(slides),
        track = document.querySelector(sliderTrack),
        total = document.querySelector(totalValue),
        currentSlide = document.querySelector(currentValue),
        totalWidth = window.getComputedStyle(track).width,
        dotsWrapper = document.querySelector(dotsContainer);
    let slideIndex =  0,
        offset = 0;

    if(img.length < 10) total.textContent = `0${img.length}`
    else total.textContent = img.length
    track.style.width = 100 * img.length + '%'

    for(let i = 0; i < img.length; i++){
        dotsWrapper.innerHTML += '<div class="slider__dots_dot"></div>'
    }

    dotsWrapper.style.width = img.length * 20 + 'px'
    sliderDotsHandler()

    slider.addEventListener('click', e => {
        const target = e.target

        if(target && target.matches(prevArrow)){
            slideIndex--
            if(slideIndex < 0) slideIndex = img.length - 1
            switchCurrentSlideIndex()
            offset -= +totalWidth.match(/\d/ig).join('')
            if(offset < 0) offset = +totalWidth.substring(0, totalWidth.length-2) * (img.length-1)
            track.style.transform = `translateX(-${offset}px)`
            sliderDotsHandler()
        }
        else if(target && target.matches(nextArrow)){
            slideIndex++
            if(slideIndex > img.length - 1) slideIndex = 0
            switchCurrentSlideIndex()
            offset += +totalWidth.match(/\d/ig).join('')
            if(offset > +totalWidth.substring(0, totalWidth.length-2) * (img.length-1)) offset = 0
            track.style.transform = `translateX(-${offset}px)`
            sliderDotsHandler()
        }
    })

    function switchCurrentSlideIndex(){
        if(slideIndex < 9) currentSlide.textContent = `0${slideIndex + 1}`
        else currentSlide.textContent = slideIndex + 1
    }

    function sliderDotsHandler(){
        const dots = document.querySelectorAll('.slider__dots_dot') 
        dotClassHandler()
        dotsWrapper.addEventListener('click', e => {
            const target = e.target
            if(target && target.matches(dot)){
                dots.forEach((item, index) => {
                    if(item == target){
                        slideIndex = index
                        switchCurrentSlideIndex()
                        offset = slideIndex * (+totalWidth.substring(0, totalWidth.length-2))
                        track.style.transform = `translateX(-${offset}px)`
                        dotClassHandler()
                    }
                })
            }
        })

        function dotClassHandler(){
            dots.forEach(item => item.classList.remove('slider__dots_dot--active'))
            dots[slideIndex].classList.add('slider__dots_dot--active')
        }
    }
}
export default slider