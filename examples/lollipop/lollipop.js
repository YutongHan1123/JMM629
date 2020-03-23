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

const svg = d3.select('figure#chart')
        .append('svg')
        // .attr("width", dimensions.width)
        // .attr("height", dimensions.height);
        .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
        // group things together
        .append('g')
        .attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

const xScale = d3.scaleLinear().range([0, dimensions.boundedWidth]);

const yScale = d3
        .scaleBand()
        .range([0, dimensions.boundedHeight])
        .padding(1);

const rowConverter = function(d) {
        return {
                genre: d.genre,
                votes: +d.count,
        };
};

// load csv in d3v5
d3.csv('https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv', rowConverter).then(
        function(data) {
                data.sort(function(b, a) {
                        return a.votes - b.votes;
                });

                xScale.domain(d3.extent(data, d => d.votes));
                xScale.domain([
                        0,
                        d3.max(data, function(d) {
                                return d.votes;
                        }),
                ]);
                yScale.domain(data.map(d => d.genre));

                const myline = svg
                        .selectAll('myline')
                        .data(data)
                        .enter()
                        .append('line')
                        .attr('x1', d => xScale(d.votes))
                        .attr('x2', xScale(0))
                        .attr('y1', d => yScale(d.genre))
                        .attr('y2', d => yScale(d.genre))
                        .attr('stroke', 'steelblue');

                const mybubble = svg
                        .selectAll('mycircle')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('cx', function(d) {
                                if (d.votes > 0) {
                                        return xScale(d.votes);
                                }
                        })
                        .attr('cy', function(d) {
                                if (d.votes > 0) {
                                        return yScale(d.genre);
                                }
                        })
                        .attr('r', '7')
                        .style('fill', 'yellow')
                        .attr('stroke', 'steelblue');

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
