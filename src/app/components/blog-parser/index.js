function extractHeader(lines) {
  const header = [];
  for (let i = 0; i < lines.length; ++i) {
    const l = lines[i].trim();
    if (l === '---') {
      return header;
    } else {
      header.push(l);
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
      header.date = header.file.substring(0, 10);
      return header;
    }
  } catch(e) {
    throw new Error(`${lines}\n(${e})`);
  }
}

export default { extractHeader, parseHeader };
