//var fs = require('fs');
;
// ここを呼び出す
// 01
var preSort = function (nowJsonArray, type) {
    var returnArray = [];
    switch (type) {
        case "日付":
            returnArray = sortByDateDesc(nowJsonArray);
            break;
        case "関連度":
            returnArray = sortByRelevantNoAsc(nowJsonArray);
            break;
        case "学会ランク":
            returnArray = sortByTierAsc(nowJsonArray);
            break;
        case "学会学術誌名":
            returnArray = sortByConferenceAsc(nowJsonArray);
            break;
        case "被引用数":
            returnArray = sortByCiteNumDesc(nowJsonArray);
            break;
    }
    return returnArray;
};
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
// 学会ランク昇順に並べ替える関数
function sortByTierAsc(data) {
    return data.sort(function (a, b) {
        var tierCompare = a.tier - b.tier;
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
// 被引用数降順に並べ替える関数
function sortByCiteNumDesc(data) {
    return data.sort(function (a, b) {
        var citeNumCompare = b.cite_num - a.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}
