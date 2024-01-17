import {Duration, formatISO, sub, add} from 'date-fns';

import {dateUtils} from '../dateUtils';

const MOCKE_NOW = 1702730191481;

function mockDateISO(duration: Duration): string {
  const time = sub(Date.now(), duration);
  const timeISO = formatISO(time);
  return dateUtils.formatRelative(timeISO);
}

describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKE_NOW);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be displayed in seconds if less than 1 minute ago', () => {
      expect(mockDateISO({seconds: 30})).toBe('30 s');
    });

    it('should be displayed in minutes if less than 1 hour ago', () => {
      expect(mockDateISO({minutes: 20})).toBe('20 m');
    });

    it('should be displayed in hours if less than 1 day ago', () => {
      expect(mockDateISO({hours: 15})).toBe('15 h');
    });

    it('should be displayed in days if less than 7 day ago', () => {
      expect(mockDateISO({days: 5})).toBe('5 d');
    });

    it('should be displayed in weeks if less than 4 weeks ago', () => {
      expect(mockDateISO({weeks: 3, hours: 2})).toBe('3 sem');
    });

    it('should be displayed in months if less than 12 months ago', () => {
      expect(mockDateISO({months: 10})).toBe('10 mes');
    });

    it('should be displayed in dd/MM/yyyy if more than 12 months ago', () => {
      expect(mockDateISO({months: 13})).toBe('16/11/2022');
    });

    it('should be displayed in dd/MM/yyyy if future date', () => {
      const time = add(Date.now(), {days: 2});
      const timeISO = formatISO(time);
      expect(dateUtils.formatRelative(timeISO)).toBe('18/12/2023');
    });
  });
});
