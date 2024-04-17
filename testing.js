function createURL(date) {
  let base = "https://api.katameros.app";
  let calendar = "gregorian";
  let dd_mm_yyyy;
//   The previous var should look like this: 17-04-2024
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    dd_mm_yyyy = `${dd}-${mm}-${yyyy}`;
  let languageId = "2";
  let bibleId = "2";
  let url = `${base}/readings/${calendar}/${dd_mm_yyyy}?languageId=${languageId}&bibleId=${bibleId}`;
  return url;
}

const url = createURL(new Date());

console.log(url);
