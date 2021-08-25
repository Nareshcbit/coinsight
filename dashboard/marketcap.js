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
    //$('#mcapCanvas').remove(); 
    $('#mcapDiv').find('canvas').each(function() {
      $(this).remove()
    });

    $('#mcapDiv').append('<canvas id="mcapCanvas"><canvas>');
    var canvas = document.getElementById('mcapCanvas');
 
    var data = {
      labels: dates,
      datasets: [
        {
          label: coinid,
          data: mcaps,
          fill:false,
        }
      ]
    }
    var option = {
      showLines: true
    };
    var myLineChart = Chart.Line(canvas,{
      data:data,
      options:option
    });
  
  })
}

  
function marketCap(coinid, days){
  console.log("coinid: " + coinid)
  console.log("days: " + days)
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