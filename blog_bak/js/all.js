const SkewedOne = document.querySelector('.SkewedOne');
const SkewedTwo = document.querySelector('.SkewedTwo');
const boxlist = document.querySelector('.box-list');
const contat__ctr = document.querySelector('.contat__ctr');
const head__title = document.querySelector('.head__title');
window.addEventListener('scroll',function(){
    const value1 = -15 + window.scrollY / 45;
    const value2 = 15 + window.scrollY / -45;

    console.log(window.scrollY);
    SkewedOne.style.transform ='skewY('+ value1 + 'deg)' ;
    SkewedTwo.style.transform ='skewY('+ value2 + 'deg)' ;

    head__title.style.animation ='fande-in 0.6s ease-in forwards';
    if(window.scrollY > 560){
        boxlist.style.animation ='right-in 0.5s ease-in forwards';
    }
    if(window.scrollY > 2230){
        contat__ctr.style.animation ='fande-in 0.5s ease-in forwards';
    }
});
