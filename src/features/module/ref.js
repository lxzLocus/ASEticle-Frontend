export default function refine(originJsonArray, options) {
  let returnArray = [];
  // 日付フィルタ
  if (options.refineDate === "0") {
    returnArray = originJsonArray.filter(item => parseInt(item.date) >= parseInt(options.refineDate));
  } else {
    options.refineDate = options.refineDate.slice(-2) + "0101";
    returnArray = originJsonArray.filter(item => parseInt(item.date) >= parseInt(options.refineDate));
  }
  // acm, arxiv, ieee中でtrueの項目の要素を絞込み
  if (options.acm || options.arxiv || options.ieee) {
    returnArray = returnArray.filter(item => {
      const domain = new URL(item.url).hostname;
      if (options.acm && domain === 'dl.acm.org')return true;
      if (options.arxiv && domain === 'arxiv.org')return true;
      if (options.ieee && domain === 'ieeexplore.ieee.org')return true;
      return false;
    });
  }
  returnArray = sort(options.type, options.sortType, returnArray);
  console.log(`REFINE++${returnArray}`);
  return returnArray;
}

function sort(type, sortType, nowJsonArray) {
  let returnArray = [];
  console.log(`type : ${type}, sortType : ${sortType}`);
  switch (type) {
    case "date":
      returnArray = sortType === "昇順" ? sortByDateAsc(nowJsonArray) : sortByDateDesc(nowJsonArray);
      break;
    case "relevant_no":
      returnArray = sortType === "昇順" ? sortByRelevantNoAsc(nowJsonArray) : sortByRelevantNoDesc(nowJsonArray);
      break;
    case "tier":
      returnArray = sortType === "昇順" ? sortByTierAsc(nowJsonArray) : sortByTierDesc(nowJsonArray);
      break;
    case "学会学術誌名":
      returnArray = sortType === "昇順" ? sortByConferenceAsc(nowJsonArray) : sortByConferenceDesc(nowJsonArray);
      break;
    case "cite_num":
      returnArray = sortType === "昇順" ? sortByCiteNumAsc(nowJsonArray) : sortByCiteNumDesc(nowJsonArray);
      break;
  }
 
  return returnArray;
}

function sortByDateAsc(data) {
  return data.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByDateDesc(data) {
  return data.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByRelevantNoAsc(data) {
  return data.sort((a, b) => a.relevant_no - b.relevant_no);
}

function sortByRelevantNoDesc(data) {
  return data.sort((a, b) => b.relevant_no - a.relevant_no);
}

function sortByTierAsc(data) {
  return data.sort((a, b) => {
    const tierCompare = a.tier - b.tier;
    return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByTierDesc(data) {
  return data.sort((a, b) => {
    const tierCompare = b.tier - a.tier;
    return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByConferenceAsc(data) {
  return data.sort((a, b) => {
    const conferenceCompare = a.conference.localeCompare(b.conference);
    return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByConferenceDesc(data) {
  return data.sort((a, b) => {
    const conferenceCompare = b.conference.localeCompare(a.conference);
    return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByCiteNumAsc(data) {
  return data.sort((a, b) => {
    const citeNumCompare = a.cite_num - b.cite_num;
    return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
  });
}

function sortByCiteNumDesc(data) {
  return data.sort((a, b) => {
    const citeNumCompare = b.cite_num - a.cite_num;
    return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
  });
}
