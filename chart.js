// Define the data
const data = [
  { year: 2017, cost: 88.7 },
  { year: 2018, cost: 81.4 },
  { year: 2019, cost: 81.3 },
  { year: 2020, cost: 86.7 },
  { year: 2022, cost: 85.6 },
];

// Set up the SVG element and dimensions
const svgWidth = 600;
const svgHeight = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Create the SVG element
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create the chart group
const chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define the scales
const xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([0, chartWidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.cost)])
  .range([chartHeight, 0]);

// Define the line function
const line = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.cost));

// Draw the line
chart.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

// Add the axes
const xAxis = d3.axisBottom(xScale)
  .ticks(5)
  .tickFormat(d3.format("d"));
  
const yAxis = d3.axisLeft(yScale)
  .ticks(5);

chart.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

chart.append("g")
  .call(yAxis);

// Add the chart title
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .text("Cost of Living in London (2017-2021)");
