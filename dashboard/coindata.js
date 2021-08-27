var COIN_DATA = []

const coindataColumnDefs = [
  { field: "id" },
  { field: "symbol" },
  { field: "name" },
  {headerName: '4Weeks_Adds.',field: "developer_data.code_additions_deletions_4_weeks.additions"},
  {
    headerName: 'Score',
    groupId: 'scoreGroup',
    children: [
        // using medal column type
        { headerName: 'coingecko', field: 'coingecko_score' , columnGroupShow: 'always'},
        { headerName: 'developer', field: 'developer_score' , columnGroupShow: 'open'},
        { headerName: 'community', field: 'community_score' , columnGroupShow: 'open'},
        { headerName: 'liquidity', field: 'liquidity_score' , columnGroupShow: 'open'},
    ],
  },
];

function tableCoinData(coinids, days){
  COIN_DATA = []
  let deferreds = []
  coinids.forEach((coinid)=>{
    //console.log("coinid: " + coinid)
    deferreds.push(ajaxCoinData(coinid, days))
  })
  $.when.apply(null, deferreds).done(function() {
    //console.log(JSON.stringify(COIN_DATA))

    console.log(JSON.stringify(COIN_DATA))
    let coindataGridOptions = {
      columnDefs: coindataColumnDefs,
      rowData: COIN_DATA
    }

    //Reinitialize coindataDiv
    $('#coindataDiv').find('#coindataGrid').each(function() {
      $(this).remove()
    });
    $('#coindataDiv').append('<div id="coindataGrid" style="height: 200px;" class="ag-theme-alpine">');
    
    let gridDiv = document.querySelector('#coindataGrid');
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
     //console.log(JSON.stringify(result))
     COIN_DATA.push(result)
    }
  });
}



