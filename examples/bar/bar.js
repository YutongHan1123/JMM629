const dimensions = {
        width: window.innerWidth * 0.9,
        height: 600,
        margin: {
                top: 20,
                right: 80,
                bottom: 30,
                left: 80,
        },
};

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const svg = d3
        .select('figure#chart')
        .append('svg')
        // .attr("width", dimensions.width)
        // .attr("height", dimensions.height);
        .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
        // group things together
        .append('g')
        .attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

// think of this scale as a function: F(x) = something
const xScale = d3.scaleLinear().range([0, dimensions.boundedWidth]);

const yScale = d3
        .scaleBand()
        .range([0, dimensions.boundedHeight])
        .padding(0.3);

const rowConverter = function(d) {
        return {
                genre: d.genre,
                votes: +d.count,
        };
};

// var rowConverter2 = (d) => {
//     return {
//         genre: d.genre,
//         count: +d.count
//     }
// }

// d3.csv('data.csv');

// load csv in d3v4
// d3.csv('https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv', rowConverter, function(data) {
//     //do stuff here
// });

// load csv in d3v5
d3.csv('https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv', rowConverter).then(
        // our chart goes here

        // data is a group of dataset we want to use
        // d is usually used for typical line (add function to it)

        // if i have arrow, i don't need function. if i have function, i don't need arrow
        // data => console.log(data)

        function(data) {
                // console.log(data);

                // we can update the domain of the xScale with d3.extent
                xScale.domain(d3.extent(data, d => d.votes));
                xScale.domain([
                        0,
                        d3.max(data, function(d) {
                                return d.votes;
                        }),
                ]);
                yScale.domain(data.map(d => d.genre));

                const bars = svg
                        .selectAll('rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('y', d => yScale(d.genre))
                        .attr('width', d => xScale(d.votes))
                        .attr('height', yScale.bandwidth())
                        .style('fill', 'steelblue');

                const xAxis = svg
                        .append('g')
                        .attr('class', 'x axis')
                        .call(d3.axisBottom(xScale))
                        .attr('transform', `translate(0,${dimensions.boundedHeight})`);
                const xAxisText = xAxis.selectAll('text').attr('class', 'axis_text');

                const yAxis = svg
                        .append('g')
                        .attr('class', 'y axis')
                        .call(d3.axisLeft(yScale));
                const yAxisText = yAxis.selectAll('text').attr('class', 'axis_text');
        }
);
