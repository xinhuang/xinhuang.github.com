import fs from 'fs-extra';
import { Observable } from 'rx';

function walk(dir) {
    return Observable.create(o => {
        fs.walk(dir)
            .on('data', item => o.onNext(item.path))
            .on('end', item => o.onCompleted());
    });
}

export { walk };
