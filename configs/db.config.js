/**
 Module dependencies.
 */
 const mongoose = require("mongoose");
 require('./env.config');
  // Production and Dev Stage Detect
  /**
   * For Running Production State. Start with --production Flag
   * For Running Development State. Run as normal CMD
   */
  
 let dbURI;
 let uri;
 let isLive = false;
 let dbNameLocal = 'PowerHack';
 let dbNameLive = 'PowerHack';

 if (process.env.NODE_ENV === "development") {
   
    console.log("Running at Development State");

    console.log(
          "\x1b[42m%s\x1b[0m",
          "Application was Running at localDB. Any Change Can Be Done"
    );
    
    console.log("\n ########### \n");
  
    // Local Config
    dbURI = `mongodb://localhost:27017/${dbNameLocal}`;
    uri = "localhost://27017";
   
  } else {
    
    // Live Config
    isLive = true;
    dbURI = `mongodb+srv://power_hack:power_hack@cluster0.lurqj5i.mongodb.net/?retryWrites=true&w=majority`;
    uri = "Prod-Connection              ---- > Live";
 
 }
 
module.exports = mongoose
.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Mongodb Connected at", uri);

  !isLive && console.log("Mongodb Connected URI", dbURI);
 
})
.catch(error => console.log("Mongodb Error: " + error));