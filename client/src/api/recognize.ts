const doNotInclude = ["total","visa","balance", "purchase"];

const callOCRAPI = async () => {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "K86344961288957");

  let formdata = new FormData();
  formdata.append("url", "https://images.1234567890hihi.repl.co/reciepts/1007-receipt.jpg");
  formdata.append("isTable", "true");
  formdata.append("filetype", "jpg");
  formdata.append("OCREngine","2")
  formdata.append("detectOrientation","true")

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://api.ocr.space/parse/image", requestOptions)
    .then(response => response.text())
    .then(result => jankyMath(JSON.parse(result)))
    .catch(error => console.log('error', error));
  // do something with myJson
};

function jankyMath(data: any){
  console.log(data)
  // console.log(data["ParsedResults"][0]["TextOverlay"]["Lines"])
  let a: any[] = []
  let b: any[] = []
  for (let x of data["ParsedResults"][0]["TextOverlay"]["Lines"]) {
    // console.log(x)
    for (let y of x["Words"]) { 
      a.push(y)
      // console.log(y)
    }
  }
  a.sort((x,y) => x["Top"] < y["Top"] ? -1 : x["Top"] > y["Top"] ? 1 : 0)
  console.log(a)
  // a.sort((x, y) => x["Top"].localeCompare(y["Top"]))
  // console.log(a)
  for (let x = 0; x < a.length-1; x ++){
    // console.log("LOOP")
    let c: any[] = []
    while (x < a.length-1 && Math.abs(a[x]["Top"] - a[x+1]["Top"]) < 20) {
      c.push(a[x])
      x++
    }
    if (c.length > 0) {
      c.push(a[x])
      // console.log(c)
      c.sort((x,y) => x["Left"] < y["Left"] ? -1 : x["Left"] > y["Left"] ? 1 : 0)
      // console.log(c)
      b.push(c)
    }
    
    // console.log(c)
  }
  console.log(b)
  let d: any[] = []
  for (let x of b){
    let e = ""
    for(let y of x.slice(0,x.length-1)){
      e += y["WordText"] + " "
    }
    
    // console.log([e, x[x.length-1]["WordText"]])
    if(/\d/.test(x[x.length-1]["WordText"]) && x[x.length-1]["WordText"].includes(".")){
      let f = true
      for (let y of doNotInclude){
        // console.log(e.toLowerCase())
        if(e.toLowerCase().includes(y)){
          f = false
        }
      }
      if(f){
        d.push([e, x[x.length-1]["WordText"]])
      }
      
    }
  }
  console.log(d)
  return d
  
}

export default callOCRAPI;
