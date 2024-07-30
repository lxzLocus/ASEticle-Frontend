const fs = require('fs');

interface origJson {
    url: string; 
    title: string; 
    author: string; 
    conference: string; 
    pages: number; 
    date: string; 
    abstract: string; 
    cite_num: number; 
    submitted: boolean; 
    relevant_no: number; 
    tier: number;
};

// ここを呼び出す
// 01
const preSort = (nowJsonArray: origJson[], type: string): origJson[] => {
    let returnArray: origJson[] = [];
  
    switch(type){
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
function sortByDateDesc(data: any[]): any[] {
    return data.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}

// 関連度昇順に並べ替える関数
function sortByRelevantNoAsc(data: any[]): any[] {
    return data.sort((a, b) => a.relevant_no - b.relevant_no);
}

// 学会ランク昇順に並べ替える関数
function sortByTierAsc(data: any[]): any[] {
    return data.sort((a, b) => {
        const tierCompare = a.tier - b.tier;
        return tierCompare !== 0 ? tierCompare : a.relevant_no - b.relevant_no;
    });
}

// 学会・学術誌名昇順に並べ替える関数
function sortByConferenceAsc(data: any[]): any[] {
    return data.sort((a, b) => {
        const conferenceCompare = a.conference.localeCompare(b.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}

// 被引用数降順に並べ替える関数
function sortByCiteNumDesc(data: any[]): any[] {
    return data.sort((a, b) => {
        const citeNumCompare = b.cite_num - a.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}

// test.jsonファイルのパスを指定
const filePath = '/app/src/app/test.json';
// test.jsonファイルを読み込む
const testData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// テスト
console.log('元のデータ:', JSON.stringify(testData, null, 2));
const refinedData = preSort(testData, "被引用数");
console.log('昇順:', JSON.stringify(refinedData, null, 2));
