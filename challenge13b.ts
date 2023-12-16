import { readFileSync } from 'fs';

const file = readFileSync('./input13', 'utf-8');
let temp = file.split(/\r?\n\r?\n/).map((pattern) => pattern.split(/\r?\n/).map((line) => line.split('')));
temp = temp.map((pattern) => pattern[0].map((val, index) => pattern.map((row) => row[index]).reverse()));
let verticalCheckPatterns = temp.map((pattern) => pattern.map((line) => line.join('')));

let horizontalCheckPatterns = file.split(/\r?\n\r?\n/).map((pattern) => pattern.split(/\r?\n/).map((line) => line));

let answer = 0;

const setCharAt = (str, index, char): string => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + char + str.substring(index + 1);
};

const parsePatternsIntoScore = (pattern, multiplier): void => {
    for (let i = 1; i < pattern.length; i++) {
        let str1 = pattern.filter((str, index) => index < i).join('');
        let str2 = pattern
            .filter((str, index) => index >= i && index < i * 2)
            .map((str) => str.split('').reverse().join(''))
            .join('')
            .split('')
            .reverse()
            .join('');
        if (str2.length < str1.length) {
            str1 = str1.slice(str1.length - str2.length);
        }
        for (let strIndex = 0; strIndex < str1.length; strIndex++) {
            const newStr1 = setCharAt(str1, strIndex, str1.charAt(strIndex) === '.' ? '#' : '.');
            if (newStr1 === str2) {
                answer += multiplier * i;
            }
        }
    }
};

horizontalCheckPatterns.forEach((pattern) => parsePatternsIntoScore(pattern, 100));
verticalCheckPatterns.forEach((pattern) => parsePatternsIntoScore(pattern, 1));

console.log(answer);
