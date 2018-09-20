req=new XMLHttpRequest();
req.open("GET",'/json/cats.json',true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  console.log(json);
//   document.getElementsByClassName('message')[0].innerHTML=JSON.stringify(json);
};