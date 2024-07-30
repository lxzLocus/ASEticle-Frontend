//import * as fs from 'fs';
var fs = require('fs');
;
var refine = function (type, sortType, refineDate, acm, arxiv, ieee, originJsonArray) {
    var returnArray = [];
    // 日付フィルタ
    if (refineDate !== null) {
        returnArray = originJsonArray.filter(function (item) { return parseInt(item.date) >= refineDate; });
    }
    // acm, arxiv, ieee中でtrueの項目の要素を絞込み
    if (acm === true || arxiv === true || ieee === true) {
        returnArray = returnArray.filter(function (item) {
            var domain = new URL(item.url).hostname;
            if (acm && domain === 'dl.acm.org')
                return true;
            if (arxiv && domain === 'arxiv.org')
                return true;
            if (ieee && domain === 'ieeexplore.ieee.org')
                return true;
            return false;
        });
    }
    returnArray = sort(type, sortType, returnArray);
    return returnArray;
};
var sort = function (type, sortType, nowJsonArray) {
    var returnArray = [];
    switch (type) {
        case "日付":
            if (sortType === "昇順") {
                returnArray = sortByDateAsc(nowJsonArray);
            }
            else {
                returnArray = sortByDateDesc(nowJsonArray);
            }
            break;
        case "関連度":
            if (sortType === "昇順") {
                returnArray = sortByRelevantNoAsc(nowJsonArray);
            }
            else {
                returnArray = sortByRelevantNoDesc(nowJsonArray);
            }
            break;
        case "学会ランク":
            if (sortType === "昇順") {
                returnArray = sortByTierAsc(nowJsonArray);
            }
            else {
                returnArray = sortByTierDesc(nowJsonArray);
            }
            break;
        case "学会学術誌名":
            if (sortType === "昇順") {
                returnArray = sortByConferenceAsc(nowJsonArray);
            }
            else {
                returnArray = sortByConferenceDesc(nowJsonArray);
            }
            break;
        case "被引用数":
            if (sortType === "昇順") {
                returnArray = sortByCiteNumAsc(nowJsonArray);
            }
            else {
                returnArray = sortByCiteNumDesc(nowJsonArray);
            }
            break;
    }
    return returnArray;
};
// 日付昇順に並べ替える関数
function sortByDateAsc(data) {
    return data.sort(function (a, b) {
        var dateCompare = a.date.localeCompare(b.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}
// 日付降順に並べ替える関数
function sortByDateDesc(data) {
    return data.sort(function (a, b) {
        var dateCompare = b.date.localeCompare(a.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}
// 関連度昇順に並べ替える関数
function sortByRelevantNoAsc(data) {
    return data.sort(function (a, b) { return a.relevant_no - b.relevant_no; });
}
// 関連度降順に並べ替える関数
function sortByRelevantNoDesc(data) {
    return data.sort(function (a, b) { return b.relevant_no - a.relevant_no; });
}
// 学会ランク昇順に並べ替える関数
function sortByTierAsc(data) {
    return data.sort(function (a, b) {
        var tierCompare = a.tier - b.tier;
        return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会ランク降順に並べ替える関数
function sortByTierDesc(data) {
    return data.sort(function (a, b) {
        var tierCompare = b.tier - a.tier;
        return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会・学術誌名昇順に並べ替える関数
function sortByConferenceAsc(data) {
    return data.sort(function (a, b) {
        var conferenceCompare = a.conference.localeCompare(b.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}
// 学会・学術誌名降順に並べ替える関数
function sortByConferenceDesc(data) {
    return data.sort(function (a, b) {
        var conferenceCompare = b.conference.localeCompare(a.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}
// 被引用数昇順に並べ替える関数
function sortByCiteNumAsc(data) {
    return data.sort(function (a, b) {
        var citeNumCompare = a.cite_num - b.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}
// 被引用数降順に並べ替える関数
function sortByCiteNumDesc(data) {
    return data.sort(function (a, b) {
        var citeNumCompare = b.cite_num - a.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}
// test.jsonファイルのパスを指定
var filePath = '/app/src/app/test.json';
// test.jsonファイルを読み込む
var testData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
// テスト
console.log('元のデータ:', JSON.stringify(testData, null, 2));
var refinedData = refine("日付", "昇順", 230101, true, false, true, testData);
console.log('昇順:', JSON.stringify(refinedData, null, 2));
