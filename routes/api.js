const express=require("express");
const router=express.Router();
const keys=require("../config/keys");
const Stock=require("../models/stock");
const populateDB=require("../config/populate");

//fetch stock
function filterByDate(priceHistory, start, end)
{
  var history=[];
  if(start.length==0 || end.length==0)
    history=priceHistory;
  else
    for(let i=0;i<priceHistory.length;i++)
    {
      if(Date.parse(priceHistory[i][0])>=Date.parse(start) && Date.parse(priceHistory[i][0])<=Date.parse(end))
        history.push(priceHistory[i]);
    }
  return history;
}
router.get('/stock', function(req, res) {
  var start="",end="";
  if(typeof req.query.start!= 'undefined')
    start=req.query.start;
  if(typeof req.query.end!= 'undefined')
    end=req.query.end;

  Stock.find({
    'ticker': req.query.ticker,
  }, function(err, stocks) {
    if(err)
    {
      console.error(err);
      res.send({});
    }
    else if(stocks.length==0)
    {
      populateDB(req.query.ticker)
      .then(ret=>{
        ret["priceHistory"]=filterByDate(ret.priceHistory,start,end);
        //console.log(ret);
        res.send(ret);
      })
      .catch(error=>{res.send({});});
    }
    else
    {
      history=filterByDate(stocks[0].priceHistory,start,end);
      res.send({
      priceHistory: history,
      ticker: stocks[0].ticker,
      column_names: stocks[0].column_names});
    }
  });
});

module.exports=router;
