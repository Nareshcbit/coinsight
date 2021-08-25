function chartMarketCap(coinid, days){
  $.when(
    marketCap(coinid, days)
  ).done(function(result) {
    console.log("coinid: " + coinid)
    console.log("result: " + JSON.stringify(result))
    let prices = {}
    let market_caps = {}
    result["prices"].forEach( (element ) => {
      dt = formattedDate(element[0])
      prices[dt] = element[1]
    });
    
    
    let dates = []
    let mcaps = []
    result["market_caps"].forEach( (element ) => {
      dt = formattedDate(element[0])
      dates.push(dt)

      market_caps[dt] = element[1]
      mcaps.push(element[1])

    });

    console.log(JSON.stringify(market_caps))

    var canvas = document.getElementById('mcapChart');
    canvas.width  = 800;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Market Cap',
          data: mcaps,
          fill: false,
        }]
      },
    })




  })
}

  
function marketCap(coinid, days){
  console.log("ticker: " + $("#searchtext").val())
  let url =  "https://api.coingecko.com/api/v3/coins/" + coinid + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily"
  console.log("url: " + url)
  return  $.ajax({
    url: url
  });
}

function formattedDate(timestamp) {
  var dt = new Date(timestamp);
  return dt.toLocaleDateString("en-US")
}