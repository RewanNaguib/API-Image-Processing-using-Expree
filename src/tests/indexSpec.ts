import newArr from '../index';

describe("should make a new array containg a number or a word at it's beginning",()=>{
    const wordArr = ['cat', 'dog', 'rabbit', 'bird'];

    it('should make a new array containing dog', () => {
        expect(newArr(3, wordArr)).toContain('dog');
    });
    it('make a new array containing 3', () => {
        expect(newArr(3, wordArr)).toContain(3);
    });
});
