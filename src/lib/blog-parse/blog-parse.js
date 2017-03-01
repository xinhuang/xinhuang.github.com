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
        try {
          const tmp = JSON.parse(`{${lines[i]}}`);  // eslint-disable-line angular/json-functions
          for (let key in tmp) {
            header[key] = tmp[key];
          }
        } catch(e) {
          throw new Error(`JSON.parse failed at line ${lines[i]}\n${e}\n${e.stack}`)
        }
      }
      if (header.file) {
          header.date = postdate(header.file);
      }
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

function header(text) {
    const p = text.indexOf('---');
    const headerText = text.substring(0, p);
    return parseHeader(headerText.split('\n'));
}

function body(text) {
    const p = text.indexOf('---');
    return text.substring(p + 4);
}

function postdate(filename) {
    return path.basename(filename).substring(0, 10);
}

export default { extractHeader, parseHeader, parse, header, body, postdate };
