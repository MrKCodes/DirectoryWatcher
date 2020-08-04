/*
 ===========================================================================

   A Node.js application to show an example use of the DirectoryWatcher.js
   Module

  The DirectorWatcher.js is owned by its respective owner.
  I have extended it to my use case.
  ------Kartikeya Chauhan

 ===========================================================================
*/

// Imports
var dirwatch = require("./modules/DirectoryWatcher.js");
// Kartik
const fs = require('fs');


// Create a monitor object that will watch a directory
// and all it's sub-directories (recursive) 
// should work on both linux and windows, update the path
// to some appropriate test directory of your own.
// you can monitor only a single folder and none of its child
// directories by simply changing the recursive parameter to
// to false
var simMonitor = new dirwatch.DirectoryWatcher("F:\\Developer\\tmp", true);

// start the monitor and have it check for updates
// every half second.
simMonitor.start(500);

// Log to the console when a file is removed
// simMonitor.on("fileRemoved", function (filePath) {
//   console.log("File Deleted: " + filePath);
// });

// Log to the console when a folder is removed
// simMonitor.on("folderRemoved", function (folderPath) {
//   console.log("Folder Removed: " + folderPath);
// });

// log to the console when a folder is added
simMonitor.on("folderAdded", function (folderPath) {
  console.log(folderPath);
  // Copying the new Index html to IIS/Apache dir
  // destination.txt will be created or overwritten by default.
  const source = folderPath + "\\index.html"
  console.log(source)
  const destination = "F:\\Developer\\iis\\index.html"
  //In node v8.5.0, copyFile was added
  fs.copyFile(source, destination, (err) => {
    if (err) throw err;
  console.log('New index.html was copied to destination Web Server');
});

  
});

// To monitor file modification uncomment the below code
// Log to the console when a file is changed.
// simMonitor.on("fileChanged", function (fileDetail, changes) {
//   console.log("File Changed: " + fileDetail.fullPath);
//   for (var key in changes) {
//     console.log("  + " + key + " changed...");
//     console.log("    - From: " + ((changes[key].baseValue instanceof Date) ? changes[key].baseValue.toISOString() : changes[key].baseValue));
//     console.log("    - To  : " + ((changes[key].comparedValue instanceof Date) ? changes[key].comparedValue.toISOString() : changes[key].comparedValue));
//   }
// });

// log to the console when a file is added.
//To monitor files addtion uncomment the next block of code
// simMonitor.on("fileAdded", function (fileDetail) {
//   console.log("File Added: " + fileDetail.fullPath);
// });

// Let us know that directory monitoring is happening and where.
console.log("Directory Monitoring of " + simMonitor.root + " has started");