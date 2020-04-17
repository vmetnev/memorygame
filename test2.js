for (i = 0; i < 10; i++) {
    console.log(rnd(0, 15))
}

function rnd(min, max) {
    return min + Math.round(Math.random() * max)
}