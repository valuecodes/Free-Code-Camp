function checkCashRegister(price, cash, cid) {
    let sum=0;
    var copyCid = cid.map(function(arr) {
        return arr.slice();
    });
    var original = cid.map(function(arr) {
        return arr.slice();
    });
    // console.log(copyCid);
    let cUnit=[0.01,0.05,0.1,0.25,1,5,10,20,100];
    for(var i=cid.length-1;i>=0;i--){
        cid[i].push('Amount');
        cid[i].push(cUnit[i]);
        cid[i].push('Times');
        Math.ceil(cid[i].push(cid[i][1]/cUnit[i]));
        cid[i][5]=Math.ceil(cid[i][5]);
        sum+=cid[i][1];
        sum=Math.ceil(sum);
    }
   let totalSum=0;
//    console.log(cid);
   for(var o=0;o<cid.length;o++){
       totalSum+=cid[o][1];
   }
    // console.log(totalSum);
    let change=cash-price;
    let changeCopy=change;
    change=Math.round(change * 100) / 100;
    // console.log(cid);
    // console.log(change);
    // console.log(sum);
    if(change>sum){
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    let back=new Array;
    let cnt=0;
    for(var i=cid.length-1;i>=0;i--){
        
        
        if(change>=cid[i][3]){
            back.push(copyCid[i][0],0)
            while(1){
                
                back[cnt+1]+=cid[i][3];
                back[cnt+1]=Math.round(back[cnt+1] * 100) / 100;
                change-=cid[i][3];
                copyCid[i][1]-=cid[i][3];
                copyCid[i][1]=Math.round(copyCid[i][1] * 100) / 100;
                change=Math.round(change * 100) / 100;
                if(copyCid[i][1]<0||change<0){
                    // console.log(change);
                    change+=cid[i][3];
                    change=Math.round(change * 100) / 100;
                    back[cnt+1]-=cid[i][3];
                    back[cnt+1]=Math.round(back[cnt+1] * 100) / 100;
                    cnt+=2;
                    
                    break;
                }
    
            }
            // console.log(back);
        }
        
        

    }




    let copy=new Array;
    for(i=0;i<back.length;i+=2){
        copy.push([back[i],back[i+1]]);
    }

    let register={
        status:"OPEN",
        change:[]
    }    
    
    register.change=copy;
    
    // console.log(register.change.length);
    let total=0;
    for(var k=0;k<register.change.length;k++){
        total+=register.change[k][1];
    }
    
    if(total<change){
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    // console.log(register),
    // console.log(back);

    // console.log(total-change);
    // console.log(total);
    // console.log(sum);
    // console.log(copyCid);
    // console.log(change);
    if(totalSum-changeCopy==0){
        register.status="CLOSED";
        register.change=original;
        return register;
    }else{
        // console.log(register.status);
        return register;
    }
    
    
  }
  
  // Example cash-in-drawer array:
  // [["PENNY", 1.01],
  // ["NICKEL", 2.05],
  // ["DIME", 3.1],
  // ["QUARTER", 4.25],
  // ["ONE", 90],
  // ["FIVE", 55],
  // ["TEN", 20],
  // ["TWENTY", 60],
  // ["ONE HUNDRED", 100]]
  
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
