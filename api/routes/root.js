const express = require("express");
const router = express.Router();

// Just simple info for root api endpoint
router.get("/", (_, res) => {
    res.send(`<style>
    *, 
    *:before, 
  *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
    adding: 0;
  }
  
  body {
  background: #435363;
  -webkit-animation: bg 5s infinite alternate;
  -moz-animation: bg 5s infinite alternate;
  -o-animation: bg 5s infinite alternate;
  animation: bg 5s infinite alternate;
  }
  
  @-webkit-keyframes bg {
  0%   { background: #984D6F; }
  100% { background: #435363; }
  }
  @-moz-keyframes bg {
  0%   { background: #984D6F; }
  100% { background: #435363; }
  }
  @-o-keyframes bg {
  0%   { background: #984D6F; }
  100% { background: #435363; }
  }
  @keyframes bg {
  0%   { background: #984D6F; }
  100% { background: #435363; }
  }
  
  h1 {
  padding-top: 380px;
  font-family: 'Joti One', cursive;
  font-size: 3.5em;
  text-align: center;
  color: #FFF;
  text-shadow: rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 1px 0, rgba(0,0,0,0.6) 0 1px, rgba(0,0,0,0.6) 0 1px;
  }
</style>
<h1 
  style="padding-top: 280px;
  align-items: center;
  height: 90%;
  overflow-y: hidden;
  text-transform: uppercase;
  font-weight: 600;
  font-family: monospace;
  font-size: 30pt;">
 <p>WELCOME TO POWER HACKING APP</p>
 <p>Powered By</p>
 <p>Md. Mehedi Hasan Khan</p>
</h1>`).status(200);
});

module.exports = router;