var MARKET_CHARTS = {}

function chartMarketCap(coinids, days){
  let deferreds = []
  coinids.forEach((coinid)=>{
    console.log("coinid: " + coinid)
    deferreds.push(marketCap(coinid, days))
  })

  $.when.apply(null, deferreds).done(function() {
    console.log("all coins done")
    console.log(JSON.stringify(MARKET_CHARTS))
    
    let datasets = []
    coinids.forEach((coinid)=>{
      let dataset = getDataset(coinid, MARKET_CHARTS[coinid]["market_caps"])
      datasets.push(dataset)
    })

    let coin = coinids[0]
    let labels = getLabels(MARKET_CHARTS[coin]["market_caps"])

    //Reinitialize mapCanvas
    $('#mcapDiv').find('canvas').each(function() {
      $(this).remove()
    });
    $('#mcapDiv').append('<canvas id="mcapCanvas"><canvas>');
    var canvas = document.getElementById('mcapCanvas');
 
    var data = {
      labels: labels,
      datasets: datasets
    }

    var option = {
      showLines: true
    };
    var myLineChart = Chart.Line(canvas,{
      data:data,
      options:option
    });
  });
}


  
function marketCap(coinid, days){
  console.log("coinid: " + coinid)
  console.log("days: " + days)
  let url =  "https://api.coingecko.com/api/v3/coins/" + coinid + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily"
  console.log("url: " + url)
  return  $.ajax({
    url: url,
    success: function(result){
      MARKET_CHARTS[coinid] = result
    }
  });
}

function getDataset(coinid, data){
  let datapoints = []
  data.forEach( (element ) => {
    datapoints.push(element[1])
  });
  return {
    label: coinid,
    data: datapoints,
    fill: false
  }
}

function getLabels(data){
  let dates = []
  data.forEach( (element ) => {
    dt = formattedDate(element[0])
    dates.push(dt)
  });
  return dates
}



function formattedDate(timestamp) {
  var dt = new Date(timestamp);
  return dt.toLocaleDateString("en-US")
}


