document.addEventListener('DOMContentLoaded', () => {
    // tabs
    getClick()
    // timer
    const deadLine = '2021-08-31'
    setTime('.timer', deadLine)
    // modal
    getModal()
    // cards
    renderCards()
    // formListener
    formData()
    // slider
    slider()
    //calculator
    calc()
})

// === timer ===
function calculateTime(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60), 
        seconds = Math.floor((t / 1000) % 60);
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    }
}

function getTime(num){
    if(num < 0) return 0
    else if(num >= 0 && num < 10) return `0${num}`
    return num
}

function setTime(selector, endTime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');
        // timeInterval = setInterval(updateTimer, 1000);
    let timeInterval = setTimeout(function recursive(){
        updateTimer()
        timeInterval = setTimeout(recursive, 1000)
        }, 1000);

    updateTimer()

    function updateTimer(){
        const t = calculateTime(endTime)

        days.textContent = getTime(t.days);
        hours.textContent = getTime(t.hours);
        minutes.textContent = getTime(t.minutes);
        seconds.textContent = getTime(t.seconds);

        if(t.total <= 0) clearInterval(timeInterval)
    }
}

// === tabs ===
function getClick (){
    const tabWrapper = document.querySelector('.tabheader__items')
    const tabs = document.querySelectorAll('.tabheader__item')
    tabWrapper.addEventListener('click', e => {
        const target = e.target
        if(target && target.matches('div.tabheader__item')){
            tabs.forEach((item, index) => {
                if(target == item){
                    changeStyleOfTitle(tabs, index)
                    hideTabs()
                    showTab(index)
                }
            })
        }
    })
}
function changeStyleOfTitle(tabs, index){
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active')
    })
    tabs[index].classList.add('tabheader__item_active')
}

function hideTabs(){
    const tabContent = document.querySelectorAll('.tabcontent')
    tabContent.forEach(item => {
        item.classList.add('hide')
    })
}
function showTab(i){
    const tabContent = document.querySelectorAll('.tabcontent')
    tabContent[i].classList.remove('hide')
}

// === modal ===
function getModal(){
    const modalBtn = document.querySelectorAll('[data-modal]');
        // modalTimer = setTimeout(showModal, 10000);
    
    window.addEventListener('scroll', showModalByScroll)
    modalBtn.forEach(item => item.addEventListener('click', showModal))
    
    function showModalByScroll(){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
}
function showModal(){
    const modal = document.querySelector('.modal');
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    closeModal()
    function closeModal(){
        modal.addEventListener('click', e => {
            const target = e.target
            if(target && target.matches('div.modal') || target && target.matches('div[data-modalClose]')){
                modal.style.display = 'none'
                document.body.style.overflow = ''
            }
        })
        document.addEventListener('keydown', e => {
            if(e.code === 'Escape' && modal.style.display === 'block'){
                modal.style.display = 'none'
                document.body.style.overflow = ''
            }
        })
    }
}


// === cards ===
function renderCards(){
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new CardGenerator(img, altimg, title, descr, price)
    //         .add('.menu .container')
    //     })
    // })
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new CardGenerator(img, altimg, title, descr, price)
            .add('.menu .container')
        })
    })
}

// === form ===
function formData(){
    const forms = document.querySelectorAll('form')
    const message = {
        'loading': 'img/form/spinner.svg',
        'success': 'Спасибо! Ваша форма отправлена',
        'failure': 'Что-то пошло не так'
    }
    const statusMessage = document.createElement('img')
    statusMessage.classList.add('status')
    statusMessage.src = message.loading
    statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
    ` 

    forms.forEach(form => bindPostData(form))
    
    function bindPostData(form){
        form.addEventListener('submit', e => {
            e.preventDefault()
            // const request = new XMLHttpRequest
            form.insertAdjacentElement('afterend', statusMessage)
            
            // request.open('POST', 'server.php')
            // request.send(formData)
    
            // request.addEventListener('load', () => {
            //     if(request.status === 200){
            //         thanksForm(message.success)
            //         form.reset()
            //         setTimeout(() => {
            //             statusMessage.remove()
            //         }, 3000)
            //     }else{
            //         thanksForm(message.failure)
            //         form.reset()
            //         setTimeout(() => {
            //             statusMessage.remove()
            //         }, 3000)
            //     }
            // })
            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: formJSON
            // })
            const formData = new FormData(form)
            const formJSON = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', formJSON)
            // .then(data => data.text())
            .then(data => {
                thanksForm(message.success)
                statusMessage.remove()
            })
            .catch(() => {
                thanksForm(message.failure)
                statusMessage.remove()
            })
            .finally(() => {
                form.reset()
            }) 
        })
    }
}

async function getResource(url){
    const res = await fetch(url)
    if(!res.ok) throw new Error(`Could not fetch${url}, status: ${res.status}`)
    
    return await res.json()
}

async function postData(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: body
    })
    return await res.json()
}

function thanksForm(message){
    const modal = document.querySelector('.modal')
    const form = modal.querySelector('.modal__dialog .modal__content form')
    const thanksModal = document.createElement('div')
    const thanksModalWrapper = document.querySelector('.modal .modal__dialog .modal__content')
    renderThanksForm()
    function renderThanksForm(){
        showModal()
        form.style.display = 'none'
        thanksModal.innerHTML = `
        <div data-modalClose class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        `
        thanksModalWrapper.append(thanksModal)
    }
    setTimeout(() => {
        thanksModal.remove()
        form.style.display = 'block'
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }, 3000)

    if(modal.display === 'none'){
        thanksModal.remove()
        form.style.display = 'block'
        document.body.style.overflow = ''
    }
}

function slider(){
    const slider = document.querySelector('.offer__slider'),
        img = document.querySelectorAll('.offer__slide'),
        track = document.querySelector('.offer__slider-track'),
        total = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        totalWidth = window.getComputedStyle(track).width,
        dotsWrapper = document.querySelector('.slider__dots_wrapper');
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

        if(target && target.matches('div.offer__slider-prev')){
            slideIndex--
            if(slideIndex < 0) slideIndex = img.length - 1
            switchCurrentSlideIndex()
            offset -= +totalWidth.substring(0, totalWidth.length-2)
            if(offset < 0) offset = +totalWidth.substring(0, totalWidth.length-2) * (img.length-1)
            track.style.transform = `translateX(-${offset}px)`
            sliderDotsHandler()
        }
        else if(target && target.matches('div.offer__slider-next')){
            slideIndex++
            if(slideIndex > img.length - 1) slideIndex = 0
            switchCurrentSlideIndex()
            offset += +totalWidth.substring(0, totalWidth.length-2)
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
            if(target && target.matches('div.slider__dots_dot')){
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
    // const slider = document.querySelector('.offer__slider')
    // const img = document.querySelectorAll('.offer__slide')
    // const total = document.querySelector('#total')
    // const currentSlide = document.querySelector('#current')
    // let slideIndex =  0
    // if(img.length < 10) total.textContent = `0${img.length}`
    // else total.textContent = img.length
    
    // img.forEach((el, i) => {
    //     if(i != slideIndex) el.classList.add('hide')
    // })
    // slider.addEventListener('click', e => {
    //     const target = e.target
    //     if(target && target.matches('div.offer__slider-prev')){
    //         slideIndex--
    //         if(slideIndex < 0) slideIndex = img.length - 1
    //         switchImg()
    //     }
    //     else if(target && target.matches('div.offer__slider-next')){
    //         slideIndex++
    //         if(slideIndex > img.length - 1) slideIndex = 0
    //         switchImg()
    //     }
    // })
    // let switchTimer = setInterval(() => {
    //     slideIndex++
    //     if(slideIndex > img.length - 1) slideIndex = 0
    //     switchImg()
    // }, 6000)
    // function switchImg(){
    //     img.forEach(item => item.classList.add('hide'))
    //     img[slideIndex].classList.remove('hide')
    //     if(slideIndex < 9) currentSlide.textContent = `0${slideIndex + 1}`
    //     else currentSlide.textContent = slideIndex + 1
    // }
}

function calc(){
    const genderWrapper = document.querySelector('#gender'),
        genderBtn = genderWrapper.querySelectorAll('.calculating__choose-item'),
        activenessWrapper = document.querySelector('.calculating__choose_big'),
        activenessBtn = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        calculatingResult = document.querySelector('.calculating__result span'),
        result = {
            'genderValue': 'women',
            'activenessValue': 1.2,
            'heightValue': 0,
            'weightValue': 0,
            'ageValue': 0,
            'total': 0
        };
    parseDataFromLS()
    genderHandler()
    constitutionHandler()
    actvenessHandler()

    function parseDataFromLS(){
        if(JSON.parse(localStorage.getItem('result'))){
            const savedObj = JSON.parse(localStorage.getItem('result'))
            height.value = savedObj.heightValue
            result.heightValue = savedObj.heightValue

            weight.value = savedObj.weightValue
            result.weightValue = savedObj.weightValue

            age.value = savedObj.ageValue
            result.ageValue = savedObj.ageValue

            genderBtn.forEach(item => {
                if(savedObj.genderValue === item.id) {
                    chooseItem(genderBtn, item, 'calculating__choose-item_active')
                    result.genderValue = savedObj.genderValue
                }
            })

            activenessBtn.forEach(item => {
                if(savedObj.activenessValue == item.dataset.activeness){
                    chooseItem(activenessBtn, item, 'calculating__choose-item_active')
                    result.activenessValue = savedObj.activenessValue
                }
            })
            calculating()
        }
    }

    function genderHandler(){
            genderWrapper.addEventListener('click', e => {
            const target = e.target    
            if(target && target.matches('div.calculating__choose-item')){
                chooseItem(genderBtn, target, 'calculating__choose-item_active')
                result.genderValue =  target.dataset.sex
                calculating()
            }
        })
    }

    function constitutionHandler(){
        height.addEventListener('input', () => {
            if(height.value.match(/\D/g)) height.style.border = '1px solid red'
            else{
                height.style.border = 'none'
                result.heightValue = +height.value
                calculating()
            }
        })  
        weight.addEventListener('input', () => {
            if(weight.value.match(/\D/g)) weight.style.border = '1px solid red'
            else{
                weight.style.border = 'none'
                result.weightValue = +weight.value
                calculating()
            }
        })
        age.addEventListener('input', () => {
            if(age.value.match(/\D/g)) age.style.border = '1px solid red'
            else{
                age.style.border = 'none'
                result.ageValue = +age.value
                calculating()
            }
        })
    }

    function actvenessHandler(){
        activenessWrapper.addEventListener('click', e => {
            const target = e.target
            if(target && target.matches('div.calculating__choose-item')){
                chooseItem(activenessBtn, target, 'calculating__choose-item_active')
                result.activenessValue = +target.dataset.activeness
                calculating()
            }
        })
    }
    
    
    function calculating(){
        if(!result.activenessValue || !result.genderValue || !result.heightValue || !result.weightValue || !result.ageValue){
            calculatingResult.textContent = '___'
            return
        }
        else{
            if(result.genderValue === 'women'){
                let bmr = 447.6 + (9.2 * result.weightValue) + (3.1 * result.heightValue) - (4.3 * result.ageValue)
                result.total = Math.round(bmr * result.activenessValue)
                calculatingResult.textContent = result.total
            }
            else if(result.genderValue === 'man'){
                let bmr = 88.36 + (13.4 * result.weightValue) + (4.8 * result.heightValue) - (5.7 * result.ageValue)
                result.total = Math.round(bmr * result.activenessValue)
                calculatingResult.textContent = result.total
            }
            localStorage.setItem('result', JSON.stringify(result))
        }
    }
    function chooseItem(arr, target, targetClass){
        arr.forEach(el => el.classList.remove(targetClass))
        target.classList.add(targetClass)
    }
}