function modal(modalTimer){
    // === modal ===
    const modalBtn = document.querySelectorAll('[data-modal]');
        
    
    window.addEventListener('scroll', showModalByScroll)
    modalBtn.forEach(item => item.addEventListener('click', () => showModal(modalTimer)))
    
    function showModalByScroll(){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
}
function showModal(modalTimer){
    const modal = document.querySelector('.modal');

    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    if(modalTimer)clearTimeout(modalTimer)
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
export {modal, showModal}