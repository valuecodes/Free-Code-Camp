let api="https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    document.addEventListener("DOMContentLoaded", function(event) {
      console.log('starting');
      fetch(api)
      
      .then(function(response) { return response.json(); })
      .then(function(data) {
          var parsedData = parseData(data);
          // console.log(parsedData);
          createChart(parsedData);

      })
      .catch(function(err) { console.log(err); });
      
  });


  function parseData(data) {
    // console.log(data.data);
    var arr = [];
    for (var i in data.data) {
      // console.log(data.data[i][0]);
        arr.push({
            date: new Date(data.data[i][0]), //date
            value:data.data[i][1] //convert string to number
        });
    }
    return arr;
}

let createChart=(data)=>{
console.log(data)
  var svgWidth=600,svgHeight=600;
  var margin={top:20,right:40,bottom:30,left:90};
  var width=svgWidth-margin.left-margin.right;
  var height=svgHeight-margin.top-margin.bottom;

  var svg=d3.select('svg')
    .attr('width',svgWidth)
    .attr('height',svgHeight);

  var g=svg.append('g')
    .attr('transform','translate('+margin.left+','+margin.top+')');

  var x=d3.scaleTime()
    .rangeRound([0,width]);
  
  var y=d3.scaleLinear()
    .rangeRound([height,0]);
console.log(data)
  var line=d3.line()
    .x(function(d){return x(d.date)})
    .y(function(d){return y(d.value)})
    x.domain(d3.extent(data,function(d){return d.date}));
    y.domain(d3.extent(data,function(d){return d.value}));

    // d3.select('svg').selectAll('rect')
    // .data(data)
    // .enter()
    // .append('rect')
    // .attr("x", (d, i) => i * 2+margin.right)
    // .attr("y", (d, i) => height-d.value/50)
    // .attr("width", 2)
    // .attr("height", (d, i) => d.value/50);

    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      // .attr("x", function(d) { return x(d.letter); })
      // .attr("y", function(d) { return y(d.frequency); })
      // .attr("width", x.bandwidth())
      // .attr("height", function(d) { return height - y(d.frequency); });

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append('text')
    .select(".domain")
    .remove()
    .style("font", "190")

  g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Price ($)");

g.append("path")
  .datum(data)
  .attr("fill", "steelblue")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line)
}

