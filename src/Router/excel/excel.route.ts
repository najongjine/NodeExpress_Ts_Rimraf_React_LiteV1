import { Router } from 'express';
import * as xlsx from 'xlsx';

//router 인스턴스를 하나 만들고
const router = Router();

import imgUpload from '../../multer/imageUpload';

import { AppDataSource } from '../../data-source';

router.get('/test1', async function (req, res) {
  try {
    // Load the Excel file
    const workbook = xlsx.readFile(
      'C:/Users/DAIN/Documents/PetPotion/cat_snack_fix1.csv',
    );

    const sheetName = workbook.SheetNames[0];

    // Access the sheet by name
    const sheet = workbook.Sheets[sheetName];

    let data = xlsx.utils.sheet_to_json(sheet) as any;
    // improvement word changer
    /*
    for (let e of data) {
      if (e?.improvements && e?.improvements.trim()) {
        e.improvements = await wordChanger_improvement(e.improvements);
      } else {
        e.improvements = '';
      }
    }
    */
    let wordList = [] as any;
    for (let e of data) {
      if (e?.ingredient && e?.ingredient.trim()) {
        let splitStr = e.ingredient.split(',');
        for (const j of splitStr) {
          if (!j || !j.trim()) continue;
          if (!wordList.includes(j.trim())) wordList.push(j);
        }
      }
    }
    wordList.sort();
    // make new excel
    /*
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'sheet1');
    await xlsx.writeFile(
      newWorkbook,
      'C:/Users/DAIN/Documents/PetPotion/cat_snack_fix2.csv',
    );
    */
    // Send the parsed data as JSON response
    return res.status(200).json({
      success: true,
      data: wordList,
    });
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      data: null,
      err: error?.message ?? error,
    });
  }
});

let wordChanger_improvement = async (improvements: string) => {
  let changedStr = '';
  if (!improvements || !improvements.trim()) return '';
  let improvementList = [] as any;
  let splitStr = improvements.split(',');
  for (const e of splitStr) {
    changedStr = e.trim();
    if (!e || !e.trim()) continue;
    if (e.trim() == '뼈') changedStr = '뼈 / 관절';
    if (e.trim() == '관절') changedStr = '뼈 / 관절';
    if (e.trim() == '구토') changedStr = '장 / 소화';
    if (e.trim() == '장') changedStr = '장 / 소화';
    if (e.trim() == '소화') changedStr = '장 / 소화';
    if (e.trim() == '기력') changedStr = '활력';
    if (e.trim() == '먼역력') changedStr = '면역';
    if (e.trim() == '면역력') changedStr = '면역';
    if (e.trim() == '방광염') changedStr = '요로';
    if (e.trim() == '비뇨') changedStr = '요로';
    if (e.trim() == '요로계') changedStr = '요로';
    if (e.trim() == '체력') changedStr = '활력';
    if (e.trim() == '백내장') changedStr = '눈 / 시력';
    if (e.trim() == '눈') changedStr = '눈 / 시력';
    if (e.trim() == '시력') changedStr = '눈 / 시력';
    if (e.trim() == '뇌') changedStr = '두뇌';
    if (e.trim() == '변비') changedStr = '장 / 소화';
    if (e.trim() == '빈혈') changedStr = '면역';
    if (e.trim() == '세포') changedStr = '면역';
    if (e.trim() == '알러지') changedStr = '알레르기';
    if (e.trim() == '에너지') changedStr = '활력';
    if (e.trim() == '치석') changedStr = '치아 / 치석';
    if (e.trim() == '치아') changedStr = '치아 / 치석';
    if (e.trim() == '피로회복') changedStr = '활력';
    if (e.trim() == '피모') changedStr = '모질';
    if (e.trim() == '항산화') changedStr = '노화';
    if (e.trim() == '항산화제로') changedStr = '노화';
    if (e.trim() == '향균력') changedStr = '면역';
    if (e.trim() == '항암') changedStr = '면역';
    if (!improvementList.includes(changedStr.trim()))
      improvementList.push(changedStr.trim());
  }
  changedStr = improvementList.join(',');
  return changedStr;
};

// 등록된 라우터를 export
export default router;
