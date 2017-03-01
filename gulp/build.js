import conf from './conf';
import parse from '../src/lib/blog-parse/blog-parse';
import rxfs from '../src/lib/rx-fs-extra';

import gulp from 'gulp';
import path from 'path';
import print from 'gulp-print';
import fs from 'fs-extra';
import {
    Observable
} from 'rx';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import marked from 'marked';
import mustache from 'mustache';
import hljs from 'highlightjs';

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'uglify-save-license']
});

gulp.task('clean', () => {
    return $.del([conf.paths.dist, conf.paths.tmp]);
});

gulp.task('test', () => {
    return gulp.src([path.join(conf.paths.src, '**/*.spec.js')], {
            read: false
        })
        .pipe(print())
        .pipe(mocha());
});

function loadIndex(type) {
    const indexPath = path.join(conf.paths.tmp, type, 'index.json');
    if (!fs.existsSync(indexPath)) {
        return {};
    } else {
        const data = fs.readFileSync(indexPath).toString();
        try {
            return JSON.parse(data);
        } catch (e) {
            conf.onError(e);
            return {};
        }
    }
}

function buildIndex(type) {
    if (!fs.existsSync(path.join(conf.paths.tmp, type))) {
        fs.mkdirsSync(path.join(conf.paths.tmp, type));
    }
    const dir = path.join(conf.paths.data, type);
    const index = {};
    return rxfs.walk(dir)
        .filter(p => p.endsWith('.md'))
        .filter(p => path.basename(p) != 'index.md')
        .map(f => {
            var data = fs.readFileSync(f).toString().split('\n');
            data.unshift(`"file": "${f}"`);
            const header = parse.parse(data).header;
            header.url = `/${type}/${path.basename(header.file, '.md')}.html`;
            return header;
        })
        .toArray()
        .first()
        .doOnError(e => {
            conf.onError(e);
        })
        .map(headers => {
            index.posts = headers;
            index.posts.reverse();
            fs.mkdirsSync(path.join(conf.paths.tmp, type))
            fs.writeFileSync(path.join(conf.paths.tmp, type, 'index.json'), JSON.stringify(index));
            return index;
        });
}

gulp.task('index', cb => {
    Observable.fromArray(['pages', 'posts', 'fav'])
        .map(buildIndex)
        .concatAll()
        .subscribe(
            () => {},
            e => cb(),
            () => cb()
        );
});

gulp.task('render', ['index'], cb => {
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
        // Check whether the given language is valid for highlight.js.
        const validLang = !!(language && hljs.getLanguage(language));
        // Highlight only if the language is valid.
        const highlighted = validLang ? hljs.highlight(language, code).value : code;
        // Render the highlighted code with `hljs` class.
        return `<pre class="hljs"><code class="${language}">${highlighted}</code></pre>`;
    };
    marked.setOptions({ renderer });
    rxfs.walk(conf.paths.data)
        .filter(f => f.endsWith('.md'))
        .filter(f => path.basename(path.dirname(f)) != 'drafts')
        .map(file => {
            const text = fs.readFileSync(file).toString();

            const header = parse.header(text);

            const layout = header.layout;
            const templateFile = path.join(conf.paths.src, 'templates', `${layout}.template.html`);
            const template = fs.readFileSync(templateFile).toString();

            var rendered;
            if (header.index) {
                const links = [];
                for (var i = 0; i < header.links.length; i++) {
                    links.push({name: header.links[i][0], link: header.links[i][1]});
                }
                const index = loadIndex(header.index).posts;
                rendered = mustache.render(template, {
                    pagetitle: header.title,
                    content: marked(parse.body(text)),
                    index: index,
                    xref: header.xref,
                    xrefname: header.xrefname,
                    links: links,
                });
            } else {
                rendered = mustache.render(template, {
                    title: header.title,
                    date: header.date,
                    content: marked(parse.body(text)),
                });
            }
            const dir = path.relative(conf.paths.data, path.dirname(file));
            fs.writeFileSync(path.join(conf.paths.tmp, dir, `${path.basename(file, '.md')}.html`), rendered);
        })
        .subscribe(
            () => {},
            e => { conf.onError(e); cb(); },
            () => cb()
        );
});

gulp.task('resources', () => {
   return gulp.src(path.join(conf.paths.data, 'resources', '/**/*.*'))
        .pipe(gulp.dest(path.join(conf.paths.dist)));
});

gulp.task('dist', ['content'], () => {
    return gulp.src([path.join(conf.paths.tmp, '/**/*.html')])
        .pipe($.htmlmin({
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('content', ['render', 'resources']);

gulp.task('build', ['content', 'dist']);
