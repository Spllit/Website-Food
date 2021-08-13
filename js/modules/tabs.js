function tabs({container, allTabs}){
    // === tabs ===
    const tabWrapper = document.querySelector(container)
    const tabs = document.querySelectorAll(allTabs)
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
}
export default tabs;