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
        const hasBirthYear =
            passport.find((entry) => entry[0] === BIRTH_YEAR) !== undefined &&
            +passport.find((entry) => entry[0] === BIRTH_YEAR)[1] >= 1920 &&
            +passport.find((entry) => entry[0] === BIRTH_YEAR)[1] <= 2002;
        const hasIssueYear =
            passport.find((entry) => entry[0] === ISSUE_YEAR) !== undefined &&
            +passport.find((entry) => entry[0] === ISSUE_YEAR)[1] >= 2010 &&
            +passport.find((entry) => entry[0] === ISSUE_YEAR)[1] <= 2020;
        const hasExpirationYear =
            passport.find((entry) => entry[0] === EXPIRATION_YEAR) !== undefined &&
            +passport.find((entry) => entry[0] === EXPIRATION_YEAR)[1] >= 2020 &&
            +passport.find((entry) => entry[0] === EXPIRATION_YEAR)[1] <= 2030;
        const hasHeight =
            passport.find((entry) => entry[0] === HEIGHT) !== undefined &&
            passport
                .find((entry) => entry[0] === HEIGHT)[1]
                .match(/^(59in|6[0-9]in|7[0-6]in|1[5-8][0-9]cm|19[0-3]cm)$/) !== null;
        const hasHairColor =
            passport.find((entry) => entry[0] === HAIR_COLOR) !== undefined &&
            passport.find((entry) => entry[0] === HAIR_COLOR)[1].match(/^#[a-fA-F0-9]{6}$/) !== null;
        const hasEyeColor =
            passport.find((entry) => entry[0] === EYE_COLOR) !== undefined &&
            passport.find((entry) => entry[0] === EYE_COLOR)[1].match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) !== null;
        const hasPassportId =
            passport.find((entry) => entry[0] === PASSPORT_ID) !== undefined &&
            passport.find((entry) => entry[0] === PASSPORT_ID)[1].match(/^\d{9}$/) !== null;
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
