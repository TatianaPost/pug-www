import {readFileSync} from 'fs';
import {dirname, relative} from 'path';

import fm from 'front-matter';
import {renderFile} from 'pug';

import render, {previews} from '../markdown/';
import {md, tmpl} from '../utils/paths.js';

export default (lang, path) => {
  const src = readFileSync(md(lang, path), 'utf8');
  const {attributes, body} = fm(src);
  const {template, id} = attributes;

  const demos = previews[`${lang}-${id}`] = [];

  const rendered = render(body, {lang, id});

  return renderFile(tmpl(template), Object.assign({
    lang,
    rawHtml: rendered,
    demos,
    dirname,
    relative,
    _: require(`../../../pug-${lang}/strings.json`)
  }, attributes));
};
