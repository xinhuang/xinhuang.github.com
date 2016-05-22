import parser from './index';
import { expect } from 'chai';

describe('controllers', () => {
  describe('extractHeader', () => {
    it('should return lines before 1st separator when only 1 separator', () => {
      const expected = ['key0: value0', 'key1: value1'];

      const actual = parser.extractHeader(['key0: value0', 'key1: value1', '---']);

      expect(actual).to.be.deep.equal(expected);
    });

    it('should return lines before 1st separator when only 1 separator and trim line breaks', () => {
      const expected = ['key0: value0', 'key1: value1'];

      const actual = parser.extractHeader(['key0: value0\n', 'key1: value1\n', '---\n']);

      expect(actual).to.be.deep.equal(expected);
    });

    it('should return all lines if no separator', () => {
      const expected = ['key0: value0', 'key1: value1'];

      const actual = parser.extractHeader(['key0: value0', 'key1: value1', '---']);

      expect(actual).to.be.deep.equal(expected);
    });

    it('should return lines before 1st separator when 2 separators', () => {
      const expected = ['key0: value0', 'key1: value1'];

      const actual = parser.extractHeader(['key0: value0', 'key1: value1', '---', 'key2: value2', '---']);

      expect(actual).to.be.deep.equal(expected);
    });
  });

  describe('parseHeader', () => {
    it('should return {} for 0 lines', () => {
      const actual = parser.parseHeader([]);

      expect(actual).to.be.deep.equal({});
    });

    it('should parse file name pair and get date', () => {
      const actual = parser.parseHeader(['"file": "2016-01-01-a-post"']);

      expect(actual).to.be.deep.equal({
        file: '2016-01-01-a-post',
        date: '2016-01-01' });
    });

    it('should parse 2 key-value pairs', () => {
      const actual = parser.parseHeader([
        '"file": "2016-01-01-a-post"',
        '"key0": "value0"',
        '"key1": "value1"']);

      expect(actual).to.be.deep.equal({
        file: '2016-01-01-a-post',
        date: '2016-01-01',
        key0: 'value0',
        key1: 'value1' });
    });
  });

  describe('parse', () => {
    it ('should parse a blog into header & data', () => {
      const lines = [
        '---',
        'post content',
        'remaining post content',
      ];

      const actual = parser.parse('2016-01-01-a-post', lines);

      expect(actual).to.be.deep.equal({
        header: {
          file: '2016-01-01-a-post',
          date: '2016-01-01',
        },
        content: [
          'post content',
          'remaining post content',
        ]
      });
    });
  });
});
