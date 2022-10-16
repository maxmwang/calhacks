const callOCRAPI = async () => {
  const response = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://images.1234567890hihi.repl.co/reciept.jpg',
      isTable: 'true',
      filetype: 'jpg',
    }), // string or object
    headers: {
      'Content-Type': 'multipart/form-data;',
      apikey: 'K86344961288957',
    },
  });
  const myJson = await response.json(); // extract JSON from the http response
  console.log(myJson);
  return myJson;
  // do something with myJson
};

export default callOCRAPI;
