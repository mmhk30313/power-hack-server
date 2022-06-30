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
//  let dbUserNameLive = 'RoadSideAssistanceUser';
 
 if (process.env.NODE_ENV === "development") {
   
    console.log("Running at Development State");
  
    //  console.log("\n ########### \n");
    console.log(
          "\x1b[42m%s\x1b[0m",
          "Application was Running at localDB. Any Change Can Be Done"
    );
    
    console.log("\n ########### \n");
  
    // Local Config
    dbURI = `mongodb://localhost:27017/${dbNameLive}`;
    uri = "localhost://27017";
   
  } else {
    
    isLive = true;
    dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lurqj5i.mongodb.net/?retryWrites=true&w=majority`;
    uri = "Prod-Connection              ---- > Live";
 
 }
 
module.exports = mongoose
.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Mongodb Connected at", uri);

  !isLive && console.log("Mongodb Connected URI", dbURI);
 
})
.catch(error => console.log("Mongodb Error: " + error));