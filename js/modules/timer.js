function timer({selector, endTime}){
    // === timer ===
    setTime(selector, endTime)
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
}
export default timer;