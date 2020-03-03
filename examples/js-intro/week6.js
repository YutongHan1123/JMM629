// const x = 'this is a string';
let x = 25;
let y;
let z;

x = 25;
y = 'string';
z = true;

x + z;
// console.log(x + z);

// x + y;
// console.log(x + y);

// const myArray = [1, 'string', true, 4, 5, 6, 7, 8, 9];

// console.log(x);
// {
//         const x = 2;
//         console.log(x);
// }
// console.log(x);

const fruit = {
        kind: 'orange',
        color: 'orange',
        quantity: 9,
        tasty: true,
};

const theFruits = [
        {
                kind: 'orange',
                color: 'orange',
                quantity: 9,
                tasty: true,
        },
        {
                kind: 'grapes',
                color: 'purple',
                quantity: 100,
                tasty: true,
        },
        {
                kind: 'durian',
                color: 'orange-yellow',
                quantity: 1,
                tasty: false,
        },
];

for (let index = 0; index < theFruits.length; index++) {
        // check that we're going through the right number of things
        // console.log(index);
        // get the kind of each fruit
        // console.log(`${theFruits[index].kind}  ${theFruits[index].tasty}`);

        if (theFruits[index].tasty == true) {
                // fruit is tasty, so give me the name
                console.log(theFruits[index].kind);
        } else {
                // fruit is not tasty, ignore name
                // have to use `` not ''
                console.log(`This ${theFruits[index].kind} belong on mars in another castle`);
        }
}
