import {stringUtils} from '../stringUtils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of each word', () => {
      expect(stringUtils.capitalizeFirstLetter('Ana maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('Ana Maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ANa Maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ANA MariA')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ANA MARIA')).toBe('Ana Maria');
    });

    it('should remove leading/trailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' Ana maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('Ana Maria ')).toBe('Ana Maria');
    });
  });
});
