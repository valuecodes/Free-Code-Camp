let api="https://raw.githubusercontent.com/valuecodes/Free-Code-Camp/master/APIs/OMXHelsinkiHistoricChart/Data/omx25.json";

    document.addEventListener("DOMContentLoaded", function(event) {
      console.log('starting');
      fetch(api)
      
      .then(function(response) { return response.json(); })
      .then(function(data) {
          var parsedData = parseData(data);
          console.log(parsedData);
          createChart(parsedData);
          // createMouse();

      })
      .catch(function(err) { console.log(err); });
      
  });


  function parseData(data) {
    // console.log(data.length);
    var arr = [];
    // for (var i in data) {
      for(var i=0;i<data.length;i++){
        if(i%250==0){
           arr.push({
            date: new Date(data[i][0]).getFullYear(), //date
            value:data[i][1].split(',')[0] //convert string to number
          });
        }
      }
      // console.log(data.data[i][0]);
        
    // }
    return arr;
}

// let createMouse=()=>{
//   const w = 600;
//   const h = 200;
//   const padding=30;

//   const svg = d3.select("body")
//   .append("svg")
//   .attr("width", w+padding)
//   .attr("height", h+padding)
//   .attr('class','chart')


  // d3.select(".chart")
  // .append("svg")
  // .attr("width", 50)
  // .attr("height", 50)
  // .append("circle")
  // .attr("cx", 25)
  // .attr("cy", 25)
  // .attr("r", 25)
  // .style("fill", "purple")
  // .attr('class','circle')


// var circle=  d3.select(".chart")
// .append("circle")
// .attr("cx", 1125)
// .attr("cy", 1125)
// .attr("r", 25)
// .style("fill", "purple")
// .attr('class','circle')

// Circle follows

//   d3.select(".chart")
//       .on("mousemove", function(){  
//         console.log(d3.mouse(this))
//           mousex = d3.mouse(this);
//           mousex = mousex[0] + 5;
//           mousey = d3.mouse(this);
//           mousey = mousey[1] + 5;
//           circle.style("cx", mousex + "px" )
//           circle.style("cy", mousey + "px" )
//         })
// }

// Crosshair

// var vertical=  d3.select(".chart")
// .append("rect")
// .attr("x", 1125)
// .attr("y", 0)
// .attr('width',1)
// .attr('height',500)
// .style("fill", "black")


// var horizontal=  d3.select(".chart")
// .append("rect")
// .attr("x", 0)
// .attr("y", 1000)
// .attr('width',500)
// .attr('height',1)
// .style("fill", "black")


//   d3.select(".chart")
//       .on("mousemove", function(){  
//         console.log(d3.mouse(this))
//           mousex = d3.mouse(this);
//           mousex = mousex[0];
//           mousey = d3.mouse(this);
//           mousey = mousey[1];
//           vertical.style("x", mousex + "px" )
//           horizontal.style("y", mousey + "px" )
//         })
// }


let createChart=(data)=>{

  const w = 600;
  const h = 200;
  const padding=30;

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([h -padding, padding])

const xScale = d3.scaleLinear()
    .domain([d3.min(data, (d) => d.date),d3.max(data, (d) => d.date)])
    .range([padding, w - padding]);
  
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w+padding)
    .attr("height", h+padding)
    .attr('class','chart')
    .on('mouseover', function(h,w) {
        console.log(w);
    });

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => w- xScale(d.date))
    .attr("y", (d, i) => h-yScale(parseInt(d.value)))
    .attr("width", 25)
    .attr("height", (d, i) => yScale(parseInt( d.value)))
    .attr('class','bar')
    .style('fill', '#33adff')
    .on('mouseover', function(d, i) {
        d3.select(this)
          .attr("r", 10)
          .style("fill", "red")
          .attr("width", 30)
          .attr("x", (d, i) => w- xScale(d.date)-2,5)
    })
    .on("mouseout", function(d) {
      d3.select(this)
      .attr("r", 5.5)
      .style("fill", '#33adff')
      .attr("width", 25)
      .attr("x", (d, i) => w- xScale(d.date))
    });
    
    const xAxis=d3.axisBottom(xScale)
      .tickFormat(d3.format("d"))
      .ticks(data.length)
      
    svg.append('g')
        .data(data)
        .attr('transform','translate('+13+','+(h)+')')
        .attr("fill", "black")
        .call(xAxis)
        
    const yAxis=d3.axisLeft(yScale)
      // .tickFormat(d3.format("d"))
      // .ticks(data.length)
    
      
    // svg.append('g')
    //     .data(data)
    //     .attr('transform','translate(0,'+w+')')
    //     .attr("fill", "black")
    //     .call(yAxis)

    // var vertical = d3.select("body")
    //     .append("div")
    //     .attr("class", "remove")
    //     .style("position", "absolute")
    //     .style("z-index", "19")
    //     .style("width", "1px")
    //     .style("height", h-padding+"px")
    //     .style("top", padding+"px")
    //     .style("bottom", 0+"px")
    //     .style("left", "0px")
    //     .style('right','200px')
    //     .style("background", "black");
  
  // d3.select("body")
  //     .on("mousemove", function(){  
  //       console.log(d3.mouse(this))
  //        mousex = d3.mouse(this);
  //        mousex = mousex[0] + 5;
  //        vertical.style("left", mousex + "px" )})
  //     .on("mouseover", function(){  
  //        mousex = d3.mouse(this);
  //        mousex = mousex[0] + 5;
  //        vertical.style("left", mousex + "px")});

    var vertical=  d3.select(".chart")
      .append("rect")
      .attr("x", 1125)
      .attr("y", 0)
      .attr('width',1)
      .attr('height',400)
      .style("fill", "black")


    var horizontal=  d3.select(".chart")
      .append("rect")
      .attr("x", 0)
      .attr("y", 1000)
      .attr('width',1500)
      .attr('height',1)
      .style("fill", "black")


    d3.select(".chart")
      .on("mousemove", function(){  
        console.log(d3.mouse(this))
          mousex = d3.mouse(this);
          mousex = mousex[0];
          mousey = d3.mouse(this);
          mousey = mousey[1];
          vertical.style("x", mousex + "px" )
          horizontal.style("y", mousey + "px" )
        });
}

