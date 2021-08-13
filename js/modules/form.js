import {showModal} from './modal'
import {postData} from '../services/services'
function form(form){
    // === form ===
    const forms = document.querySelectorAll(form)
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
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)
            const formJSON = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', formJSON)
            .then(() => {
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
}
export default form;