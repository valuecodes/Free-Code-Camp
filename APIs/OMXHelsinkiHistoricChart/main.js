req=new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/valuecodes/Free-Code-Camp/master/APIs/OMXHelsinkiHistoricChart/omxhpi25.json',true);
req.send();
req.onload=function(){
    json=JSON.parse(req.responseText);
    console.log(json.length);
    
    
  document.getElementsByClassName('visHolder')[0].innerHTML=JSON.stringify(json);
}; 
