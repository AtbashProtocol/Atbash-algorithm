const Curve = require('./curve.js')
const ModPoint = require('./modpoint.js')


//Baby Step Gaint Step
;(() => {
    // Initialize
    let k = 161224n // Secret key
    const G = new ModPoint(572271n, 776159n)
    const smallCurve = new Curve(113345n, 386257n, 827413n, 828349n, G) // y^2 = x^3 + 113345x + 386257 (mod 827413)
    const P = smallCurve.multiply(G, k)

    // Baby-step
    let n = smallCurve.n 
    let n_sqrt = BigInt(Math.ceil(Math.sqrt(Number(n))))
    var table = new Map();
    for (let i = 1n; i < n_sqrt; i++) {
        let Q = smallCurve.multiply(G, BigInt(i))
        table.set(Q.x, i)
    }

    // Giant-step
    for (let j = 1n; j < n_sqrt; j++) {
        let R = smallCurve.multiply(G, BigInt(j * n_sqrt))
        let Q = smallCurve.subtract(P, R)
        if (table.has(Q.x)) {
            let i = table.get(Q.x)
            console.log(`k = ${BigInt(i) + BigInt(j * n_sqrt)}`)
            break
        }
    }
})()