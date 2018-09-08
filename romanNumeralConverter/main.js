function convertToRoman(num) {
    numStr=num.toString();
    romanNum=['I','V','X','L','C','D','M'];
    rNum=[];
    var cnt=0;
    // console.log(numStr[0]);
    arrCount=0;
    for(var i=numStr.length-1;i>=0;i--){


        console.log(numStr[i]);
        if(numStr[i]<4 && numStr[i]>0){
            for(var j=0;j<numStr[i];j++){
                rNum.unshift(romanNum[cnt]);
            }
        }else if(numStr[i]==4){
            rNum.unshift(romanNum[cnt],romanNum[cnt+1])
        }

        // problem here below
        else if(numStr[i] >= 5 && numStr[i] <= 8){
            rNum.unshift(romanNum[cnt+1])
            for(var j=0;j<numStr[i]-5;j++){
                rNum.splice(i+1,0,romanNum[cnt]);
            }
            
        }else if(numStr[i] == 9){
            rNum.unshift(romanNum[cnt],romanNum[cnt+2]);
        }
        cnt+=2;
    }
    return rNum.join("");
}

console.log(convertToRoman(97));

