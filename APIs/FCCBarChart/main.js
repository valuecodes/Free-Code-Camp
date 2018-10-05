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
            date: new Date(data.data[i][0]).getFullYear(), //date
            value:data.data[i][1] //convert string to number
        });
    }
    return arr;
}

let createChart=data=>{

    let dataset=[];
    let year=[];
    
    for(var i=0;i<data.length;i++){
        dataset.push([data[i].value,data[i].date]);
    }

  

    const w=500;
    const h=500;
    const padding=30;

    console.log(d3.max(dataset,(d,i)=>d[1]));

    const xScale=d3.scaleLinear()
        .domain([1947,2017])
        .range([0+padding,w-padding]);
    
    const yScale=d3.scaleLinear()
        .domain([0,d3.max(dataset,(d,i)=>d[0])])
        .range([h-padding, 0]);

    var svg =d3.select('body')
        .append('svg')
        .attr('class', 'overlay')
        .attr('width',w)
        .attr('height',h);

    var bart = d3.select('.bar')
    .style('opacity', 0,9)
    .style("fill", "black")
    .attr("width", 10)
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d,i) => xScale(d[1]))
        .attr('y',(d,i) =>yScale(d[0])) 
        .attr('class', 'bar')
        .attr("width", 3)
        .attr("height", (d, i) =>h- yScale(d[0])-padding)
        .attr("fill", "lightgray")
        .style('fill', '#33adff')
        .on('mouseover', function(d,i) {
            bart.transition()
            .style('opacity', 0,9)
            .style("fill", "black")
            .attr("width", 100)
            .attr("x", (d,i) => 100)
            .attr("height", (d, i) =>h- yScale(d[0])-100)
            console.log(d);
            // changeColor(d);
            // d3.selectAll('.bar')
            

            
            // .style('height', 10 + 'px')
            // .style('width', 2 + 'px')
            // .style('opacity', .9)
            // .style('left', ( 10) + 0 + 'px')
            // .style('top', 100 + 'px')
            // .style('transform', 'translateX(600px)');
        })
        // .attr("width", 10);
function changeColor(bar){
    d3.select('rect').style("fill", "red");
}
        
    const xAxis=d3.axisBottom(xScale);

    svg.append('g')
        .data(dataset)

        .attr('transform','translate(0,'+(h-padding)+')')
        // .append('text')
        // .attr("fill", "black")
        .call(xAxis)

};