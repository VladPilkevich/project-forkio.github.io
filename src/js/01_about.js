// **** HEADER **** //


let burger = document.querySelector('#burger');
let burO = document.querySelector('#burOne');
let burT = document.querySelector('#burTwo');
let burTr = document.querySelector('#burTre');
let item = document.querySelector('#burgerI');
let burgerX = document.querySelector('#burgerX');

burger.addEventListener('click', function () {
    item.style.display = 'block';
    burger.style.display = 'none';
    burgerX.style.display = 'block';
});

burgerX.addEventListener('click', function () {
    item.style.display = 'none';
    burger.style.display = 'block';
    burgerX.style.display = 'none';
});

window.addEventListener('click', function (e) {
    let top = e.target.closest("#burgerI");
    if (top !== item && e.target !== burger && burgerX.style.display === 'block' && e.target !== burO && e.target !== burT && e.target !== burTr) {
        // console.log('work');
        item.style.display = 'none';
        burger.style.display = 'block';
        burgerX.style.display = 'none';
    }
})



window.onresize = function() {
    if (screen.availWidth >= 481) {
        item.style.display = 'flex';
        burger.style.display = 'none';
        burgerX.style.display = 'none';
    } else {
        item.style.display = 'none';
        burger.style.display = 'block';
        burgerX.style.display = 'none';
    }
};

