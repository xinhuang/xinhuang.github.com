function extractHeader(lines) {
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i] === '---') {
      return lines.slice(0, i);
    }
  }
  return lines;
}

function parseHeader(lines) {
  try {
    if (lines.length === 0) {
      return {};
    } else {
      let header = {};
      for (let i = 0; i < lines.length; ++i) {
        const tmp = JSON.parse(`{${lines[i]}}`);  // eslint-disable-line angular/json-functions
        for (let key in tmp) {
          header[key] = tmp[key];
        }
      }
      return header;
    }
  } catch(e) {
    console.log(e);
    throw e;
  }
}

export default { extractHeader, parseHeader };
