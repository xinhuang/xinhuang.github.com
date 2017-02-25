import path from 'path';

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
  throw new Error('Seems there is no header in the lines');
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
      header.date = path.basename(header.file).substring(0, 10);
      return header;
    }
  } catch(e) {
    throw new Error(`parseHeader: Error at line '${lines}'\n(${e})\n${e.stack}`);
  }
}

function parse(lines) {
  const headerLines = extractHeader(lines);
  lines.splice(0, headerLines.length + 1);
  return {
    header: parseHeader(headerLines),
    content: lines,
  };
}

function body(text) {
    const p = text.indexOf('---');
    return text.substring(p + 4);
}

export default { extractHeader, parseHeader, parse, body };
