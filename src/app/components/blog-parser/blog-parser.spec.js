import parser from './index';
import { expect } from 'chai';

describe('controllers', () => {
  describe('extractHeader', () => {
    it('should return lines before 1st separator when only 1 separator', () => {
      const expected = ['key0: value0', 'key1: value1'];

      const actual = parser.extractHeader(['key0: value0', 'key1: value1', '---']);

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

    it('should parse 1 key-value pair', () => {
      const actual = parser.parseHeader(['"key0": "value0"']);

      expect(actual).to.be.deep.equal({ key0: 'value0' });
    });

    it('should parse 2 key-value pairs', () => {
      const actual = parser.parseHeader(['"key0": "value0"', '"key1": "value1"']);

      expect(actual).to.be.deep.equal({ key0: 'value0', key1: 'value1' });
    });
  });
});
