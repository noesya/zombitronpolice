const socket = io();
const text = document.querySelector('#start');

let width = 75
let weight = 200
let opsz = 12

socket.on('dial1', (data) => {
    console.log('c le contrôleur 1', data);
    updateStyle(data, weight, opsz);
});

socket.on('dial2', (data) => {
    console.log('c le contrôleur 2', data)
    updateStyle(width, data, opsz);
});

socket.on('dial3', (data) => {
    console.log('c le contrôleur 3', data);
    updateStyle(width, weight, data);
});

function updateStyle(twidth, tweight, topsz) {
    width = twidth
    weight = tweight
    opsz = topsz
    text.style.fontVariationSettings = "'wdth' " + width + ", 'wght' " + weight + ",'opsz'" + opsz;
}

socket.on('dial4', (data) => {
    console.log('c le contrôleur 4', data)
    text.style.transform = 'skewX(' + data + 'deg)';
});

socket.on('dial5', (data) => {
    console.log('c le contrôleur 5', data)
    text
        .style.fontSize = data + 'rem';
});

socket.on('dial-motion', (data) => {
    text.style.transform = 'skewX(' + data.alpha + 'deg) skewY(' + data.beta + 'deg)';
});