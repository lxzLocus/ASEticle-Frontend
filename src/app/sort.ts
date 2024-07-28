import * as fs from 'fs';

// 日付昇順に並べ替える関数
function sortByDateAsc(data: any[]): any[] {
    return data.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        return dateCompare !== 0 ? dateCompare : a.relevant_no - b.relevant_no;
    });
}

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

// 関連度降順に並べ替える関数
function sortByRelevantNoDesc(data: any[]): any[] {
    return data.sort((a, b) => b.relevant_no - a.relevant_no);
}

// 学会・学術誌名昇順に並べ替える関数
function sortByConferenceAsc(data: any[]): any[] {
    return data.sort((a, b) => {
        const conferenceCompare = a.conference.localeCompare(b.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}

// 学会・学術誌名降順に並べ替える関数
function sortByConferenceDesc(data: any[]): any[] {
    return data.sort((a, b) => {
        const conferenceCompare = b.conference.localeCompare(a.conference);
        return conferenceCompare !== 0 ? conferenceCompare : a.relevant_no - b.relevant_no;
    });
}

// 被引用数昇順に並べ替える関数
function sortByCiteNumAsc(data: any[]): any[] {
    return data.sort((a, b) => {
        const citeNumCompare = a.cite_num - b.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}

// 被引用数降順に並べ替える関数
function sortByCiteNumDesc(data: any[]): any[] {
    return data.sort((a, b) => {
        const citeNumCompare = b.cite_num - a.cite_num;
        return citeNumCompare !== 0 ? citeNumCompare : a.relevant_no - b.relevant_no;
    });
}

// // test.jsonファイルのパスを指定
// const filePath = './test.json';
// // test.jsonファイルを読み込む
// const testData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// // 日付昇順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const ascSortedData = sortByDateAsc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('昇順:', JSON.stringify(ascSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(ascSortedData, null, 2));
// console.log(`昇順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 日付降順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const descSortedData = sortByDateDesc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('降順:', JSON.stringify(descSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(descSortedData, null, 2));
// console.log(`降順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 関連度昇順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const ascSortedData = sortByRelevantNoAsc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('昇順:', JSON.stringify(ascSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(ascSortedData, null, 2));
// console.log(`昇順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 関連度降順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const descSortedData = sortByRelevantNoDesc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('降順:', JSON.stringify(descSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(descSortedData, null, 2));
// console.log(`降順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 学会・学術誌名昇順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const ascSortedData = sortByConferenceAsc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('昇順:', JSON.stringify(ascSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(ascSortedData, null, 2));
// console.log(`昇順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 学会・学術誌名降順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const descSortedData = sortByConferenceDesc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('降順:', JSON.stringify(descSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(descSortedData, null, 2));
// console.log(`降順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 被引用数昇順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const ascSortedData = sortByCiteNumAsc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('昇順:', JSON.stringify(ascSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(ascSortedData, null, 2));
// console.log(`昇順に並べ替えたデータを ${filePath} に上書き保存しました。`);

// // 被引用数降順テスト
// console.log('元のデータ:', JSON.stringify(testData, null, 2));
// const descSortedData = sortByCiteNumDesc([...testData]);  // 元のデータを保持するためにスプレッド演算子を使用
// console.log('降順:', JSON.stringify(descSortedData, null, 2));
// fs.writeFileSync(filePath, JSON.stringify(descSortedData, null, 2));
// console.log(`降順に並べ替えたデータを ${filePath} に上書き保存しました。`);
