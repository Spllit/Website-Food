import {getResource} from '../services/services'
import CardGenerator from './CardGenerator'
function cards(){
    // === cards ===
    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new CardGenerator(img, altimg, title, descr, price)
            .add('.menu .container')
        })
    })
    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //         new CardGenerator(img, altimg, title, descr, price)
    //         .add('.menu .container')
    //     })
    // })
}
export default cards