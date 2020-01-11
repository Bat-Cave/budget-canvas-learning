
var bills = [];
var incomes = [];

function addToBills() {
  var product = document.getElementById("product").value;
  var date = document.getElementById("date").value;
  var amount = document.getElementById("amount").value;
  if(product == "" || date == "" || amount == ""){
    document.getElementById("error").innerHTML = "Make sure to fill each input field.";
    var delay = setInterval( function() {
      document.getElementById("error").innerHTML = "";
    }, 3000);
  } else {
    var bill = {};
      bill.type = "bill";
      bill.product = product;
      bill.date = date;
      bill.daynum = Number(date);
      bill.amount = amount;
      bills.push(bill);
    printBills();
  }
  drawChart();
}

function addToIncome() {
  var product = document.getElementById("source").value;
  var date = document.getElementById("indate").value;
  var d = new Date(date);
  var amount = document.getElementById("inamount").value;
  if(product == "" || date == "" || amount == ""){
      document.getElementById("inerror").innerHTML = "Make sure to fill each input field.";
    var delay = setInterval( function() {
      document.getElementById("inerror").innerHTML = "";
      clearInterval(delay);
    }, 3000);
  } else {
    var income = {};
      income.type = "income";
      income.product = product;
      income.date = Number(d.getMonth()+ 1)  + "/" + Number(d.getDate() + 1)  + "/" + d.getFullYear();
      income.daynum = d.getDate();
      income.amount = amount;
      incomes.push(income);
    printIncomes();
  }
  drawChart();
}

function removeFromBills() {
  var product = document.getElementById("product").value;
  var date = document.getElementById("date").value;
  var amount = document.getElementById("amount").value;
  if(product == "" || date == "" || amount == ""){
    document.getElementById("error").innerHTML = "Make sure to fill each input field.";
    var delay = setInterval( function() {
      document.getElementById("error").innerHTML = "";
    }, 3000);
  } else {
    bills.pop();
    printBills();
  }
}

function removeFromIncome() {
  var product = document.getElementById("source").value;
  var date = document.getElementById("indate").value;
  var amount = document.getElementById("inamount").value;
  if(product == "" || date == "" || amount == ""){
    document.getElementById("inerror").innerHTML = "Make sure to fill each input field.";
    var delay = setInterval( function() {
      document.getElementById("inerror").innerHTML = "";
    }, 3000);
  } else {
    incomes.pop();
    printIncomes();
  }
  drawChart();
}

function printBills() {
  var group = document.getElementById("group");
  var sum = 0;
  group.innerHTML = "";
  for (i = 0; i < bills.length; i++){
    group.innerHTML += "<tr id='bill" + i + "'><td>" + bills[i].product + "</td><td>" + bills[i].date + "</td><td> $ " + bills[i].amount + "</td></tr>";
    sum += +bills[i].amount;
  }
  document.getElementById("sum").innerHTML = "$ " + sum;
  console.log(bills);
  console.log(sum);
  console.log(bills.length);
}

function printIncomes() {
  var group = document.getElementById("ingroup");
  var sum = 0;
  group.innerHTML = "";
  for (i = 0; i < incomes.length; i++){
    group.innerHTML += "<tr id='income" + i + "'><td>" + incomes[i].product + "</td><td>" + incomes[i].date + "</td><td> $ " + incomes[i].amount + "</td></tr>";
    sum += +incomes[i].amount;
  }
  document.getElementById("insum").innerHTML = "$ " + sum;
  console.log(incomes);
  console.log(sum);
}

function checkInDate() {
  var date = document.getElementById("date");
  if (date.value > 31){
    date.value = 31;
  }
}

function checkBillDate() {
  var m = document.getElementById("datem");
  var d = document.getElementById("date");
  var y = document.getElementById("datey");
  if (parseInt(m.value) > +12 || parseInt(m.value) < +1){
    m.value = 1;
  }
  if (parseInt(d.value) > +31 || parseInt(d.value) < +1){
    d.value = 1;
  }
  if (parseInt(y.value) > +3000 || parseInt(y.value) < +0){
    y.value = 2019;
  }
}

var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementsByClassName("today").innerHTML = "Today: " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();


function drawChart() {
  var dates = [];
  var inlines = [];
  var billlines = [];
  var totalmax = 100;
  var chart = document.getElementById("chart");
  //find highest amount for left pane
  var billsmax = 0;
  for (i = 0; i < bills.length; i++){
    if (+bills[i].amount > +billsmax) {
      billsmax = bills[i].amount;
    }
  }
  var incomesmax = 0;
  for (i = 0; i < incomes.length; i++){
    if (+incomes[i].amount > +incomesmax) {
      incomesmax = incomes[i].amount;
    }
  }
  if(+billsmax > +incomesmax){
    totalmax = billsmax;
    globaltotal = totalmax;
  }else {
    totalmax = incomesmax;
    globaltotal = totalmax;
  }
  //

  //find range of dates for bottom pane
  var firstdate = 31;
  var lastdate = 0;
  for(i = 0; i < incomes.length; i++){
    var y = incomes[i].date.slice(incomes[i].date.indexOf("/")+1, incomes[i].date.lastIndexOf("/"));
    if(+y > +lastdate){
      lastdate = y;
    }
    if(+y < +firstdate){
      firstdate = y;
    }
  }
  for(i = 0; i < bills.length; i++){
    var y = bills[i].date;
    if(+y > +lastdate){
      lastdate = y;
    }
    if(+y < +firstdate){
      firstdate = y;
    }
  }
  for(i = 0; i < lastdate + 1; i++){
    if(i <= +lastdate && i >= +firstdate){
      dates.push(i);
    }
  }

  console.log("First Date: " + firstdate);
  console.log("Last Date: " + lastdate);
  console.log(dates);
  //

  //draw grid
  var canvas = document.getElementById("chart");
  var ctx = canvas.getContext("2d");
  var contain = document.getElementById("chartcontainer");
  var width = Math.round(contain.clientWidth * 2) - 8;
  var height = Math.round(contain.clientHeight * 2) - 8;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  canvas.style.width = (canvas.width / 2) + "px";
  canvas.style.height = (canvas.height / 2) + "px";
  ctx.scale(1,1);
  var columnswidth = (canvas.width - 80) / (dates.length + 1);
  var rowsheight = ((canvas.height - 80) / 5);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px verdana";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("$ 0", 40, canvas.height - 80);


  for(r = 0; r < 6; r++){
    ctx.beginPath();
    ctx.moveTo(80, (rowsheight * r));
    ctx.lineTo(canvas.width, (rowsheight * r));
    ctx.strokeStyle = "rgba(0, 0, 0, .8)";
    ctx.stroke();
  }
  for(c = 0; c < dates.length + 2; c++){
    ctx.beginPath();
    ctx.moveTo((columnswidth * c) + 80, 0);
    ctx.lineTo((columnswidth * c) + 80, canvas.height - 80);
    ctx.strokeStyle = "rgba(0, 0, 0, .8)";
    ctx.stroke();
  }
  for(j = 0; j < dates.length; j++){
    var text = dates[j];
    var wid = ctx.measureText(text).width;
    var size = 24;
    if(wid > 76){
      size -= .3;
    }
    ctx.font = size + "px verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(dates[j], (columnswidth * j) + columnswidth + 80, canvas.height - 40);
  }
  for(j = 1; j < 5; j++){
    var text = Math.round(Number((totalmax / 4) * j));
    var wid = ctx.measureText(text).width;
    ctx.font =  "20px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("$ " + text, 40, canvas.height - 80 - (rowsheight * j));
  }
  //Find coordinates for points and plots points
  var points = incomes.concat(bills);
  for(p = 0; p < points.length; p++){
    var q = p + 1;
    var y = height - 80 - ((height - 80) * (points[p].amount / (globaltotal * 1.25)));
    var x = (dates.indexOf(points[p].daynum) * columnswidth) + 80 + (columnswidth * 2);
    if(points[p].type == "income"){
      inlines.push(x);
      inlines.push(y);
      ctx.beginPath();
      ctx.fillStyle = "#CBFF8C";
      ctx.arc( x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      if(inlines.length > 1){
        for(t = 0; t < inlines.length; t += 2){
          ctx.beginPath();
          ctx.strokeStyle = "#CBFF8C";
          ctx.lineWidth = 3;
          ctx.moveTo(inlines[t], inlines[t+1]);
          ctx.lineTo(inlines[t+2], inlines[t+3]);
          ctx.stroke();
        }
      }
      console.log("Line: " + x + ", " + y);
      console.log(inlines);
    } else {
      billlines.push(x);
      billlines.push(y);
      ctx.beginPath();
      ctx.fillStyle = "#EC547A";
      ctx.arc( x - columnswidth, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      if(billlines.length > 1){
        for(t = 0; t < billlines.length; t += 2){
          ctx.beginPath();
          ctx.strokeStyle = "#EC547A";
          ctx.lineWidth = 3;
          ctx.moveTo(billlines[t] - columnswidth, billlines[t+1]);
          ctx.lineTo(billlines[t+2] - columnswidth, billlines[t+3]);
          ctx.stroke();
        }
      }
    }
    console.log("Point " + p + " x: " + x)
    console.log("Point " + p + " y: " + y)
    console.log("daynum: " + points[p].daynum)
    console.log("amount: " + points[p].amount)
  }
}

