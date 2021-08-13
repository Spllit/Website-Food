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
export default calc;