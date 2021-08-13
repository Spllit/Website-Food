import tabs from './modules/tabs';
import calc from './modules/calc';
import form from './modules/form';
import {modal, showModal} from './modules/modal';
import slider from './modules/slider';
import cards from './modules/cards';
import timer from './modules/timer';


document.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(showModal, 10000);

    tabs({
        allTabs: '.tabheader__item',
        container: '.tabheader__items',
    })
    calc()
    form('form')
    modal(modalTimer)
    cards()
    timer({
        selector: '.timer',
        endTime: '2021-08-31',
    })
    slider({
        slides: '.offer__slide',
        prevArrow: 'div.offer__slider-prev',
        dot: 'div.slider__dots_dot',
        sliderContainer: '.offer__slider',
        totalValue: '#total',
        sliderTrack: '.offer__slider-track',
        currentValue: '#current',
        dotsContainer: '.slider__dots_wrapper',
        nextArrow: 'div.offer__slider-next',
    });
})




