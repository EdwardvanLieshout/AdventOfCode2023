import { readFileSync } from 'fs';

const file = readFileSync('./input04.input', 'utf-8');

const BIRTH_YEAR = 'byr';
const ISSUE_YEAR = 'iyr';
const EXPIRATION_YEAR = 'eyr';
const HEIGHT = 'hgt';
const HAIR_COLOR = 'hcl';
const EYE_COLOR = 'ecl';
const PASSPORT_ID = 'pid';
const COUNTRY_ID = 'cid';

interface Passport {
    hasBirthYear: boolean;
    hasIssueYear: boolean;
    hasExpirationYear: boolean;
    hasHeight: boolean;
    hasHairColor: boolean;
    hasEyeColor: boolean;
    hasPassportId: boolean;
    hasCountryId: boolean;
}

let passports: Passport[] = file
    .split(/\r?\n\r?\n/)
    .map((pp) =>
        pp
            .split(/\s/)
            .filter((entry) => entry !== '')
            .map((entry) => entry.split(':'))
    )
    .map((passport) => {
        const hasBirthYear = passport.find((entry) => entry[0] === BIRTH_YEAR) !== undefined;
        const hasIssueYear = passport.find((entry) => entry[0] === ISSUE_YEAR) !== undefined;
        const hasExpirationYear = passport.find((entry) => entry[0] === EXPIRATION_YEAR) !== undefined;
        const hasHeight = passport.find((entry) => entry[0] === HEIGHT) !== undefined;
        const hasHairColor = passport.find((entry) => entry[0] === HAIR_COLOR) !== undefined;
        const hasEyeColor = passport.find((entry) => entry[0] === EYE_COLOR) !== undefined;
        const hasPassportId = passport.find((entry) => entry[0] === PASSPORT_ID) !== undefined;
        const hasCountryId = passport.find((entry) => entry[0] === COUNTRY_ID) !== undefined;
        return {
            hasBirthYear,
            hasIssueYear,
            hasExpirationYear,
            hasHeight,
            hasHairColor,
            hasEyeColor,
            hasPassportId,
            hasCountryId,
        };
    });

console.log(
    passports.filter(
        (passport) =>
            passport.hasBirthYear &&
            passport.hasIssueYear &&
            passport.hasExpirationYear &&
            passport.hasHeight &&
            passport.hasHairColor &&
            passport.hasEyeColor &&
            passport.hasPassportId
    ).length
);
