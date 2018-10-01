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

let createChart=data=>{

    let dataset=[];
    let year=[];
    
    for(var i=0;i<data.length;i++){
        dataset.push(data[i].value);
    }
    const w=500;
    const h=500;
    const padding=60;

    const xScale=d3.scaleLinear()
        .domain([0,dataset.length])
        .range([padding,w-padding]);
    
    const yScale=d3.scaleLinear()
        .domain([0,d3.max(dataset,(d)=>d)])
        .range([h-padding, padding]);

    var svg =d3.select('body')
        .append('svg')
        .attr('width',w)
        .attr('height',h);
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d,i) => xScale(i))
        .attr('y',(d,i) =>yScale(d)) 
        .attr("width", 3)
        .attr("height", (d, i) =>h- yScale(d))
        .attr("fill", "#f1f2f8");

    const xAxis=d3.axisBottom(xScale);

    svg.append('g')
        .attr('transform','translate(0,'+(h-padding+30)+')')
        .call(xAxis)
        .attr("fill", "white")
        .attr('style','white')
};