"use strict";


function iterateOverElements(logSources, printer) {
  const lastValueFromEachSource = {}
  // fill out the hashmap with the first value from all of the log sources
  for(let i = 0; i < logSources.length; i++) {
    lastValueFromEachSource[i] = logSources[i].pop();
  }

  // iterate while the hashmap has values
  while (Object.keys(lastValueFromEachSource).length) {
    // get the minimum index to print
    const minimum = findMinEntryIndex(lastValueFromEachSource);
    printer.print(lastValueFromEachSource[minimum])
    // get the next value from this log source
    const lastValueFromCurrentSource = logSources[minimum].pop()
    // if its not valid it means it we should take it out of the hashmap
    if(!lastValueFromCurrentSource) {
      delete lastValueFromEachSource[minimum]
    } else {
      lastValueFromEachSource[minimum] = lastValueFromCurrentSource
    }
  }
}

function findMinEntryIndex(lastValueFromEachSource) {
  const toArray = Object.entries(lastValueFromEachSource);
  // if this happens it means we only got one last log source
  if(toArray.length === 0) return toArray[0][0]
  const minDate = toArray.reduce((earliest, current) => {
    return current[1].date < earliest[1].date ? current : earliest;
  }, toArray[0]);
  return minDate[0]
}


module.exports = (logSources, printer) => {
  iterateOverElements(logSources, printer)
  printer.done()
  return console.log("Sync sort complete.");
};
