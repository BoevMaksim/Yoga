window.addEventListener('DOMContentLoaded', () => {

const tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

const hideTabContent = a => {
    for (let i=a; i<tabContent.length; i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');    
    }
};

hideTabContent(1);

const showTabContent = b => {
    if(tabContent[b].classList.contains('hide')){
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');         
    }
};

info.addEventListener('click', event => {
    const target = event.target;
    if(target && target.classList.contains('info-header-tab')){
        for(let i=0; i<tab.length; i++){
            if(target == tab[i]){
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});

const deadline = '2019-04-21';

const getTimeRemainig = endtime => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t/1000) % 60),
    minutes = Math.floor((t/1000/60) % 60),
    hours = Math.floor(t/(1000*60*60));

    return {
        'total' : t,
        'hours' : hours,
        'minuts' : minutes,
        'seconds' : seconds
    };
};

const setCloke = (id, deadline) => {
    const updateCloke = () => {
        const t = getTimeRemainig(deadline);

            const timePlusZero = t => {
                if (t < 10) {
                    t = '0' + t;
                }
            return t;
            }
            if (t.total <= 0){
                clearInterval(timeInterval);
                t.hours = 0;
                t.minuts = 0;
                t.seconds = 0;
            };
            t.hours = timePlusZero(t.hours);
            t.minuts = timePlusZero(t.minuts);
            t.seconds = timePlusZero(t.seconds);
    
            hours.textContent = t.hours;
            minutes.textContent = t.minuts;
            seconds.textContent = t.seconds;
        
           
        };

    const timer = document.getElementById(id),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds'),
          timeInterval = setInterval(updateCloke, 1000);

  
};  

setCloke('timer', deadline);

const more = document.querySelector('.more'),
overlay = document.querySelector('.overlay'),
close = document.querySelector('.popup-close');

more.addEventListener('click', () => {
    overlay.style.display ='block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});

const masseg = {
    loading: 'Загрузка...',
    success: 'Спасибо! Мы Вам скоро перезвоним.',
    failure: 'Что-то пошло не так...'
};

const form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMasseg = document.createElement('div');

    statusMasseg.classList.add('status');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMasseg);

        const reqvest = new XMLHttpRequest();
        reqvest.open('POST', 'server.php');
        reqvest.setRequestHeader('Content-Type','applicatio/json; charset=utf-8');

        const formData = new FormData(form);

        const obj ={};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        const json = JSON.stringify(obj);

        reqvest.send(json);

        reqvest.addEventListener('readystatechange', () => {
            if (reqvest.readyState < 4) {
                statusMasseg.innerHTML = masseg.loading;
            } else if (reqvest.readyState === 4 && reqvest.status == 200) {
                statusMasseg.innerHTML = masseg.success;
            } else {
                statusMasseg.innerHTML = masseg.failure;
            } 
        });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

    });

});