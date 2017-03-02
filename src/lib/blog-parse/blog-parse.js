import path from 'path';
import toml from 'toml';

const HEADER_END = '---';

function header(text) {
    const p = text.indexOf(HEADER_END);
    const headerText = text.substring(0, p);
    return toml.parse(headerText);
}

function body(text) {
    const p = text.indexOf(HEADER_END);
    return text.substring(p + 4);
}

function date(filename) {
    return path.basename(filename).substring(0, 'YYYY-MM-DD'.length);
}

export default { header, body, date };
