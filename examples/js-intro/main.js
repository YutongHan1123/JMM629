const dataset = [5, 10, 15, 20, 15];

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

const body = d3.select('body');

body.selectAll('future-paragraph')
        .data(theFruits)
        .enter()
        .append('p')
        .text(function(d) {
                return `I can count up to ${d.kind}`;
        })
        .style('color', function(d) {
                if (d.tasty == true) {
                        return yellow;
                }
                return green;
        });
