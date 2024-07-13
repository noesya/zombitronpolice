let dial1 = new Nexus.Dial('#content', {
    'size': [100, 100],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 75,
    'max': 100,
    'step': 1,
    'value': 75
});

let dial2 = new Nexus.Dial('#content2', {
    'size': [100, 100],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 200,
    'max': 800,
    'step': 1,
    'value': 200
});
let dial3 = new Nexus.Dial('#content3', {
    'size': [100, 100],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 12,
    'max': 96,
    'step': 1,
    'value': 12
});
let dial4 = new Nexus.Dial('#content4', {
    'size': [100, 100],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': -50,
    'max': 50,
    'step': 1,
    'value': -50
});
let dial5 = new Nexus.Dial('#content5', {
    'size': [100, 100],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 1,
    'max': 50,
    'step': 1,
    'value': 1
});

const socket = io();

dial1.on('change', function (v) {
    socket.emit('dial1', v)
})

dial2.on('change', function (v) {
    socket.emit('dial2', v);
})

dial3.on('change', function (v) {
    socket.emit('dial3', v);
})

dial4.on('change', function (v) {
    fontSize = v;
    socket.emit('dial4', fontSize);
})

dial5.on('change', function (v) {
    fontSkew = v;
    socket.emit('dial5', fontSkew);
})

var buttonAllowMotion = document.getElementById('allow-motion');
function askDeviceMotionPermission() {
    if (typeof (DeviceOrientationEvent) !== "undefined" && typeof (DeviceOrientationEvent.requestPermission) === "function") {
        // (optional) Do something before API request prompt.
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response == "granted") {
                    window.addEventListener("deviceorientation", (event) => {
                        console.log(event)
                        socket.emit('dial-motion', { alpha: event.alpha, beta: event.beta, gamma: event.gamma });
                    });
                }
            })
            .catch(console.error)
    } else {
        alert("DeviceOrientationEvent is not defined");
    }
    buttonAllowMotion.removeEventListener('click', askDeviceMotionPermission);
    buttonAllowMotion.style.display = "none";
}

buttonAllowMotion.addEventListener('click', askDeviceMotionPermission);