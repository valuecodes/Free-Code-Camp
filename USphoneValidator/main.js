function telephoneCheck(str) {
    // Counting the numbers
    let numCnt=str.replace(/[^0-9]/g, '').length;
    str=str.split("");
    // Checking if the number is 11 long and starting with 1
    if(numCnt==11 && str[0]=='1'){
        str.shift();
        str=str.join("").trim().split("");
        numCnt--;
    }
    
    if(numCnt==10 && str.length==10){ // Checking just numbers
        return true;
    }else if(numCnt==10 && str.length==12){ // Checking spaces and lines
        if(str[3]==" " && str[7]==" "){
            return true;
        }else if(str[3]=="-" && str[7]=="-"){
            return true;
        }
    }else if(numCnt==10 && str.length==13){ //Checking braces
        if(str[0]=="(" && str[3]==")" && str[4]=="-"){
            return true;
        }else if(str[0]=="(" && str[4]==")"){
            console.log(str[0]);
            return true;
        } 
        
    }else if(numCnt==10 && str.length==14){ //Checking braces with space or line
        if(str[0]=="(" && str[3]==")"&& str[4]==" " && str[3]=="-"){
            return true;
        }else if(str[0]=="(" && str[4]==")"&& str[5]==" " && str[9]=="-"){
            return true;
        }
    }
    return false;
  }
  
  console.log(telephoneCheck("(555)555-5555"));