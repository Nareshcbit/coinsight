var COIN_DATA = []

const coindataColumnDefs = [
  { field: "id" },
  { field: "symbol" },
  { field: "name" },
];


const columnDefs = [
  { field: "make" },
  { field: "model" },
  { field: "price" }
];

// specify the data
const rowData = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }
];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
};

function tableCoinData(coinids, days){
  COIN_DATA = []
  let deferreds = []
  coinids.forEach((coinid)=>{
    console.log("coinid: " + coinid)
    deferreds.push(ajaxCoinData(coinid, days))
  })
  $.when.apply(null, deferreds).done(function() {
    console.log("all coins done")
    console.log(JSON.stringify(COIN_DATA))

    let coindataGridOptions = {
      columnDefs: coindataColumnDefs,
      rowData: COIN_DATA
    }

    //Reinitialize coindataDiv
    $('#coindataDiv').find('#coindataGrid').each(function() {
      $(this).remove()
    });
    $('#coindataDiv').append('<div id="coindataGrid" style="height: 200px; width:500px;" class="ag-theme-alpine">');
    
    const gridDiv = document.querySelector('#coindataGrid');
    console.log("gridDiv: " + gridDiv)
    console.log(JSON.stringify(gridOptions))
    new agGrid.Grid(gridDiv, coindataGridOptions);
    
  })

}
function ajaxCoinData(coinid, days){
  console.log("coinid: " + coinid)
  console.log("days: " + days)
  //let url =  "https://api.coingecko.com/api/v3/coins/" + coinid + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily"
  let url = "https://api.coingecko.com/api/v3/coins/" + coinid + "?localization=false&tickers=false&market_data=false&community_data=true&developer_data=true&sparkline=false"

  console.log("url: " + url)
  return  $.ajax({
    url: url,
    success: function(result){
     console.log(JSON.stringify(result))
     COIN_DATA.push(result)
    }
  });
}



