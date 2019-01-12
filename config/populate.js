const express=require("express");
const Stock=require("../models/stock");
const keys=require("./keys");
const fetchurl=require("isomorphic-fetch");
function fetchapi(tickerv)
{
  const url=keys.URL.replace("HERE",tickerv);
  return new Promise(function(resolve,reject){
    fetch(url)
      .then(data=>{return data.json()})
      .then(res=>{
        //console.log(res.dataset.data);
        var st=new Stock({
          ticker: tickerv,
          priceHistory: res.dataset.data,
          column_names: res.dataset.column_names,
        });
        //console.log(st);
        st.save(function(error) {
          console.log("Record saved!");
          if (error) {
            reject(error);
          }
          else{
            var ret={ticker:tickerv,priceHistory:res.dataset.data, column_names: res.dataset.column_names};
            resolve(ret);
          }
        });
      }).catch(error=>{reject(error)});
  })
}
module.exports=fetchapi;
