import async from "async";
import { chunk } from "lodash";

const retry = fn => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fn();
      return resolve(data);
    } catch (error) {
      await sleep(500);
      return resolve(retry(fn));
    }
  });
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const promiseChunk = (
  array,
  fn,
  {
    chunkLength = 50,
    returnData = true,
    fnItemsChunk = () => {},
    hasLog = true
  } = {}
) => {
  return new Promise((resolve, reject) => {
    const rows = chunk(array, chunkLength);
    let items = [];
    let startDate = null;
    let endDate = null;

    async.series([
      ...rows.map(
        (rowItem, index) =>
          function(callback) {
            startDate = Date.now();
            Promise.all(rowItem.map(fn))
              .then(newItems => {
                if (returnData) {
                  items = [...items, ...newItems];
                }
                fnItemsChunk(newItems, index);
                endDate = Date.now();
                if (hasLog) {
                  console.log(
                    `    - ${index + 1}/${
                      rows.length
                    } (${chunkLength} | s=${(endDate - startDate) / 1000})`
                  );
                }
                callback(null);
              })
              .catch(error => {
                console.log(error);
                callback(error);
              });
          }
      ),

      async callback => {
        if (returnData) {
          return resolve(items);
        }
        return resolve(null);
      }
    ]);
  });
};

export { retry, sleep, promiseChunk };
