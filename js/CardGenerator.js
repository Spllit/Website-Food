class CardGenerator{
    constructor(img, alt, title, description, coast){
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.description = description; 
        this.coast = coast;
    }
    add(selector){
        const card = document.createElement('div')
        const section = document.querySelector(selector)
        card.innerHTML = `<div class="menu__item"><img src="${this.img}" alt=${this.alt}><h3 class="menu__item-subtitle">${this.title}</h3><div class="menu__item-descr">${this.description}</div><div class="menu__item-divider"></div><div class="menu__item-price"><div class="menu__item-cost">Цена:</div><div class="menu__item-total"><span>${this.coast * 73}</span> грн/день</div></div></div>`

        section.append(card)
    }
}