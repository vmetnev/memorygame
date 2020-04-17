let source = [{
        name: "first",
        src: 1
    },
    {
        name: "second",
        src: 2
    }, {
        name: "third",
        src: 3
    }, {
        name: "fourth",
        src: 4
    }, {
        name: "fifth",
        src: 5
    }
]

let scope = {}

let output = []; // mac lenght 16 0-15

generateOutput();

function generateOutput() {
    let counter = -1;
    let sequence = 0;

    while (counter < 15) {
        let picture = source[rnd(0, source.length - 1)]
        output[uniqueID(0, 15)] = picture;
        output[uniqueID(0, 15)] = picture;
        counter++;
        counter++;
    }
    console.log(output)
}

function uniqueID(min, max) {
    let thisCounter = 0
    let contender = 0;
    do {
        contender = rnd(min, max)
        thisCounter++


    } while (scope[contender] === true || thisCounter === 100)
    scope[contender] = true;
    return contender;
}


function rnd(min, max) {
    let toReturn = min + Math.round(Math.random() * max)
    console.log(toReturn);
    return toReturn;
}