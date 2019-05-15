window.addEventListener('DOMContentLoaded', function(){
'use strict';

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

function hideTabContent (a){
    for (let i=a; i<tabContent.length; i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');    
    }
};

hideTabContent(1);

function showTabContent (b){
    if(tabContent[b].classList.contains('hide')){
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');         
    }
};

info.addEventListener('click', function (event){
    let target = event.target;
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

let deadline = '2019-05-16';

function getTimeRemainig (endtime){
    let t = Date.parse(endtime) - Date.parse(new Date()),
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

function setCloke (id, deadline){
    let timer = document.getElementById(id),
    hours = timer.querySelector('.hours'),
    minutes = timer.querySelector('.minutes'),
    seconds = timer.querySelector('.seconds'),
    timeInterval = setInterval(updateCloke, 1000);

    function updateCloke (){
        let t = getTimeRemainig(deadline);

            function timePlusZero (t){
                if (t < 10) {
                    t = '0' + t;
                }
            return t;
            }

            t.hours = timePlusZero(t.hours);
            t.minuts = timePlusZero(t.minuts);
            t.seconds = timePlusZero(t.seconds);
    
            hours.textContent = t.hours;
            minutes.textContent = t.minuts;
            seconds.textContent = t.seconds;
        
            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
};  

setCloke('timer', deadline);

let more = document.querySelector('.more'),
overlay = document.querySelector('.overlay'),
close = document.querySelector('.popup-close');

more.addEventListener('click', function(){
    overlay.style.display ='block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click', function(){
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});

});
