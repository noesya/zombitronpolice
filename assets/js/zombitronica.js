let zombitronica = {
    initialized: false,
    playing: false,
    sequencer: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0]
        ]
    },

    start: function () {
        if (!this.initialized) {
            this.initialize();
        }
        Tone.getTransport().start();
        this.playing = true;
    },

    stop: function () {
        Tone.getTransport().stop();
        this.playing = false;
    },

    initialize: function () {
        console.log("initialize Zombitronica");

        Tone.getTransport().start();
        Tone.getTransport().bpm.value = 90;

        this.initializeFilters();

        // this.initialize

        this.cool = new Tone.DuoSynth({
            "volume": -8,
            "detune": 3,
            "portamento": 0.3,
            "vibratoAmount": 0.5,
            "vibratoRate": 5,
            "harmonicity": 1.005,
            "voice0": {
                "envelope": {
                    "attack": 0.01,
                    "attackCurve": "linear",
                    "decay": 0.25,
                    "decayCurve": "exponential",
                    "release": 1.2,
                    "releaseCurve": "exponential",
                    "sustain": 0.4
                },
                "filter": {
                    "Q": 2,
                    "detune": 0,
                    "frequency": 0,
                    "gain": 0,
                    "rolloff": -24,
                    "type": "lowpass"
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "attackCurve": "linear",
                    "decay": 0.05,
                    "decayCurve": "exponential",
                    "release": 2,
                    "releaseCurve": "exponential",
                    "sustain": 0.3,
                    "baseFrequency": 100,
                    "exponent": 2,
                    "octaves": 4
                },
                "oscillator": {
                    "detune": 0,
                    "frequency": 0,
                    "partialCount": 0,
                    "partials": [],
                    "phase": 0,
                    "type": "sawtooth"
                }
            },
            "voice1": {
                "envelope": {
                    "attack": 0.25,
                    "attackCurve": "linear",
                    "decay": 4,
                    "decayCurve": "exponential",
                    "release": 0.8,
                    "releaseCurve": "exponential",
                    "sustain": 0.1
                },
                "filter": {
                    "Q": 2,
                    "detune": 0,
                    "frequency": 0,
                    "gain": 0,
                    "rolloff": -12,
                    "type": "bandpass"
                },
                "filterEnvelope": {
                    "attack": 0.05,
                    "attackCurve": "linear",
                    "decay": 0.05,
                    "decayCurve": "exponential",
                    "release": 2,
                    "releaseCurve": "exponential",
                    "sustain": 0.7,
                    "baseFrequency": 5000,
                    "exponent": 2,
                    "octaves": -1.5
                },
                "oscillator": {
                    "detune": 0,
                    "frequency": 0,
                    "partialCount": 0,
                    "partials": [],
                    "phase": 0,
                    "type": "sawtooth"
                }
            }
        }).chain(this.gain);

        this.monotron = new Tone.FMSynth({
            "volume": -15,
            "detune": 1,
            "portamento": 1,
            "harmonicity": 4,
            "oscillator": {
                "partialCount": 0,
                "partials": [],
                "phase": 0,
                "type": "sine"
            },
            "envelope": {
                "attack": 0.01,
                "attackCurve": "linear",
                "decay": 0.2,
                "decayCurve": "exponential",
                "release": 0.5,
                "releaseCurve": "exponential",
                "sustain": 1
            },
            "modulation": {
                "partialCount": 0,
                "partials": [],
                "phase": 0,
                "type": "sine"
            },
            "modulationEnvelope": {
                "attack": 0.1,
                "attackCurve": "linear",
                "decay": 0.0001,
                "decayCurve": "exponential",
                "release": 1.5,
                "releaseCurve": "exponential",
                "sustain": 1
            },
            "modulationIndex": 152.22
        }).toDestination();

        this.coolpitch = "B2";
        this.cool.triggerAttack(this.coolpitch);

        this.initializeSequencer();
        this.initializeSocket();
        this.initialized = true;
    },

    initializeFilters: function () {
        this.gain = new Tone.Gain(0).toDestination()

        this.lowpass = new Tone.Filter(2000, "lowpass").toDestination();

        this.delay = new Tone.Reverb({
            "wet": 0.0,
            "decay": 1.5,
            "preDelay": 0.001
        }).chain(this.lowpass);

        this.distortion = new Tone.Distortion({
            distortion: 0.0,
            wet: 0.8
        }).chain(this.lowpass);
    },

    initializeSequencer: function () {
        // Step va de 0 à 7 et indique l'étape de la matrice en cours (la verticale)
        this.sequencer.step = 0;

        // Les lecteurs fournissent les sons
        this.sequencer.players = new Tone.Players({
            urls: {
                "player0": "422304__akustika__hcr-01.wav",
                "player1": "422461__akustika__sdr-105.wav",
                "player2": "422450__akustika__bdr-106.wav",
                "player3": "422286__akustika__bdr-05.wav",
            },
            release: 1,
            baseUrl: "/assets/sounds/",
        }).toDestination();

        // Le loop est le moteur du séquenceur
        this.sequencer.loop = new Tone.Loop((time) => {
            this.sequencer.playSounds(time);
            this.sequencer.step = (this.sequencer.step + 1) % 8;
        }, "16n").start(0);

        // La fonction qui joue les sons selon l'état de la matrice
        this.sequencer.playSounds = function (time) {
            if (this.matrix[0][this.step] == 1) {
                let notes = []
            }
            for (let i = 0; i < this.matrix.length; i++) {
                let note = "player" + i
                let active = this.matrix[i][this.step] == 1;
                if (active) {
                    this.players.player(note).start(time);
                }
            }
        }
    },

    initializeSocket: function () {
        this.socket = io();

        this.socket.on('sequencer', (detail) => {
            let value = detail.state ? 1 : 0;
            this.sequencer.matrix[detail.row][detail.column] = value;
        });
    }

}

document.querySelector("#start")?.addEventListener("click", async () => {
    await Tone.start();
    zombitronica.start();
})

/*
function updatePitch(index, pitch) { // pitch = note style C4
    for (let i = 0; i < synths[index].sequence.length; i++) {
        if (synths[index].sequence.events[i]) {
            synths[index].sequence.events[i] = pitch
        }
    }
    synths[index].note = pitch
}

const socket = io();

socket.on('position', (data) => {
    gain.gain.rampTo(data.y, 0.1); 
    const gam = ['A1', 'C2' , 'D2' , 'E2' , 'G2', 'A2', 'C3' , 'D3' , 'E3' , 'G3', 'A4']
    let newpitch = gam[parseInt(data.x*10)]
    if ( coolpitch != newpitch) {
        cool.triggerAttack(newpitch);
        coolpitch = newpitch;
    }
});

socket.on('dial1', (data) => {
    //  bpm
    Tone.Transport.bpm.value = data * 200 + 60;
});

socket.on('dial2', (data) => {
    distortion.distortion= data*2.0;
});

socket.on('dial3', (data) => {
    delay.wet.value = data 
});

socket.on('slider', (data) => {
    // slider 1 - kick pitchdecay
    let val = ((1 / (0.01 + data[0] / 8))).toString() + "hz"
    synths[0].synth.pitchDecay = val

    // slider 2 - snare harmony
    synths[1].synth.harmonicity = data[1] * 9 + 0.1

    // slider 3 -
    let p = synths[2].synth.oscillator.partials
    p[3] = data[2] * 2
    synths[2].synth.oscillator.partials = p

    // slider 4 - pitch 
    updatePitch(3, Tone.Frequency(data[3] * 50.0 + 20, "midi").toNote())
});
*/