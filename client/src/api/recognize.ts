/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */
const doNotInclude = ['total', 'visa', 'balance', 'purchase'];

const callOCRAPI = async (base64Image: string) => {
  const myHeaders = new Headers();
  myHeaders.append('apikey', 'K86344961288957');

  const formdata = new FormData();
  formdata.append('base64Image', base64Image);
  formdata.append('isTable', 'true');
  formdata.append('filetype', 'jpg');
  formdata.append('OCREngine', '2');
  formdata.append('detectOrientation', 'true');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  const res = await fetch('https://api.ocr.space/parse/image', requestOptions)
    .then((response) => response.text())
    .then((result) => jankyMath(JSON.parse(result)))
    .catch((error) => console.log('error', error));
  // do something with myJson

  return res;
};

function jankyMath(data: any) {
  console.log(data);
  // console.log(data["ParsedResults"][0]["TextOverlay"]["Lines"])
  const a: any[] = [];
  const b: any[] = [];
  for (const x of data.ParsedResults[0].TextOverlay.Lines) {
    // console.log(x)
    for (const y of x.Words) {
      a.push(y);
      // console.log(y)
    }
  }
  a.sort((x, y) => (x.Top < y.Top ? -1 : x.Top > y.Top ? 1 : 0));
  console.log(a);
  // a.sort((x, y) => x["Top"].localeCompare(y["Top"]))
  // console.log(a)
  for (let x = 0; x < a.length - 1; x++) {
    // console.log("LOOP")
    const c: any[] = [];
    while (x < a.length - 1 && Math.abs(a[x].Top - a[x + 1].Top) < 20) {
      c.push(a[x]);
      x++;
    }
    if (c.length > 0) {
      c.push(a[x]);
      // console.log(c)
      c.sort((x, y) => (x.Left < y.Left ? -1 : x.Left > y.Left ? 1 : 0));
      // console.log(c)
      b.push(c);
    }

    // console.log(c)
  }
  console.log(b);
  const d: any[] = [];
  for (const x of b) {
    let e = '';
    for (const y of x.slice(0, x.length - 1)) {
      e += `${y.WordText} `;
    }

    // console.log([e, x[x.length-1]["WordText"]])
    if (/\d/.test(x[x.length - 1].WordText) && x[x.length - 1].WordText.includes('.')) {
      let f = true;
      for (const y of doNotInclude) {
        // console.log(e.toLowerCase())
        if (e.toLowerCase().includes(y)) {
          f = false;
        }
      }
      if (f) {
        d.push([e, x[x.length - 1].WordText]);
      }
    }
  }
  console.log(d);
  return d;
}

export default callOCRAPI;
