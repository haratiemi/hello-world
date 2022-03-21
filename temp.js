function checkCashRegister(price, cash, cid) {
    let change = cash * 100 - price * 100;
    let cidTotal = 0;
    for (let elem of cid)
    {
        cidTotal += elem[1]*100
    }
    if (change > cidTotal)
    {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (change === cidTotal)
    {
        return {status: "CLOSED", change: cid};
    } else
    {
        let answer = [];
        cid = cid.reverse();
        let moneyUnits = {
            'ONE HUNDRED': 10000, // 100
            'TWENTY': 2000, // 20
            'TEN': 1000, // 10
            'FIVE': 500, //5
            'ONE': 100, //1
            'QUARTER': 25, //0.25
            'DIME': 10, //0.1
            'NICKEL': 5, // 0.05
            'PENNY': 1 // 0.01
        }
        for (let elem of cid)
        {
            let holder = [elem[0], 0];
            elem[1] = elem[1]*100;
            while (change >= moneyUnits[elem[0]] && elem[1] > 0)
            {
                change -= moneyUnits[elem[0]];
                elem[1] -= moneyUnits[elem[0]];
                holder[1] += moneyUnits[elem[0]]/100;
            }
            if (holder[1] > 0)
            {
                answer.push(holder);
            }
        }
        if (change > 0)
        {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        }
        return {status: "OPEN", change: answer};
    }
  }
  
//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));// should return {status: "INSUFFICIENT_FUNDS", change: []}.
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));// should return {status: "INSUFFICIENT_FUNDS", change: []}.
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
