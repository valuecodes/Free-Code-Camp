function rot13(str) { 
    let alphabets=[];
    let newArr=[];
    // Put alphabets in an array
    for(var i=0;i<26;i++){
        alphabets[i]=String.fromCharCode(i+65);
    }
    // Loop trough str char by char
    for(var i=0;i<str.length;i++){
        // Push special char to newArr
        if(str[i].match(/^[ !?.,]+$/)){
            newArr.push(str[i]);
        }
        // Loop trough alphabets till 
        for(var j=0;j<alphabets.length;j++){
            // Check if match and use circular array
            if(str[i]==alphabets[j]){
            newArr.push(alphabets[(j+13)%alphabets.length]);
            }
        }
    }
    return newArr.join("");
}
  
  // Change the inputs below to test
  console.log(rot13("SERR YBIR?"));