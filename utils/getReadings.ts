export function createURL(date) {
  let base = "https://api.katameros.app";
  let calendar = "gregorian";
  let dd_mm_yyyy;
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

export async function getReadings(date) {
  let url = createURL(date);
  let response = await fetch(url);
  let data = await response.json();
  data = data.sections;

  for (let i = 0; i < data.length; i++) {
    let section = data[i];
    if (section.title == "Liturgy") {
      let subRead = section.subSections;
      for (let j = 0; j < subRead.length; j++) {
        if (subRead[j].title == "Synaxarium") {
          subRead.splice(j, 1);
        }
      }
    }
    for (let j = 0; j < section.subSections.length; j++) {
      let subSection = section.subSections[j];

      for (let k = 0; k < subSection.readings.length; k++) {
        let reading = subSection.readings[k];
        if (reading.passages.length > 1) {
          // merge all passages into one passage
          let passage = reading.passages[0];
          for (let l = 1; l < reading.passages.length; l++) {
            passage.ref = `${passage.ref} & ${reading.passages[l].ref}`;
            passage.verses = [...passage.verses, ...reading.passages[l].verses];
          }
          reading.passages = [passage];
        }
      }
    }

  }
  return data;
}