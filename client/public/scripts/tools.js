import { htmlSelectors } from './Dom/selectors.js'

export const regionInformation = {
    'BG': { nameEng: 'Bulgaria', nameBG: 'България', population: 6951482 },
    'BLG': { nameEng: 'Blagoevgrad', nameBG: 'Благоевград', population: 302694 },
    'BGS': { nameEng: 'Burgas', nameBG: 'Бургас', population: 409265 },
    'VAR': { nameEng: 'Varna', nameBG: 'Варна', population: 469885 },
    'VTR': { nameEng: 'Veliko Tarnovo', nameBG: 'Велико Търново', population: 232568 },
    'VID': { nameEng: 'Vidin', nameBG: 'Видин', population: 82835 },
    'VRC': { nameEng: 'Vratsa', nameBG: 'Враца', population: 159470 },
    'GAB': { nameEng: 'Gabrovo', nameBG: 'Габрово', population: 106598 },
    'DOB': { nameEng: 'Dobrich', nameBG: 'Добрич', population: 171809 },
    'KRZ': { nameEng: 'Kardzhali', nameBG: 'Кърджали', population: 158204 },
    'KNL': { nameEng: 'Kyustendil', nameBG: 'Кюстендил', population: 116915 },
    'LOV': { nameEng: 'Lovech', nameBG: 'Ловеч', population: 122546 },
    'MON': { nameEng: 'Montana', nameBG: 'Монтана', population: 127001 },
    'PAZ': { nameEng: 'Pazardzhik', nameBG: 'Пазарджик', population: 252776 },
    'PER': { nameEng: 'Pernik', nameBG: 'Перник', population: 119190 },
    'PVN': { nameEng: 'Pleven', nameBG: 'Плевен', population: 236305 },
    'PDV': { nameEng: 'Plovdiv', nameBG: 'Пловдив', population: 666801 },
    'RAZ': { nameEng: 'Razgrad', nameBG: 'Разград', population: 110789 },
    'RSE': { nameEng: 'Ruse', nameBG: 'Русе', population: 215477 },
    'SLS': { nameEng: 'Silistra', nameBG: 'Силистра', population: 108018 },
    'SLV': { nameEng: 'Sliven', nameBG: 'Сливен', population: 184119 },
    'SML': { nameEng: 'Smolyan', nameBG: 'Смолян', population: 103532 },
    'SFO': { nameEng: 'Sofia region', nameBG: 'София област', population: 226671 },
    'SOF': { nameEng: 'Sofia', nameBG: 'София град', population: 1328790 },
    'SZR': { nameEng: 'Stara Zagora', nameBG: 'Стара Загора', population: 313396 },
    'TGV': { nameEng: 'Targoviste', nameBG: 'Търговище', population: 110914 },
    'HKV': { nameEng: 'Haskovo', nameBG: 'Хасково', population: 225317 },
    'SHU': { nameEng: 'Shumen', nameBG: 'Шумен', population: 172262 },
    'JAM': { nameEng: 'Yambol', nameBG: 'Ямбол', population: 117335 },
};

export const regionObjMapping = {
    'BG': { regionName: 'България', regionPopulation: 6951482 },
    'BLG': { regionName: 'Благоевград', regionPopulation: 302694 },
    'BGS': { regionName: 'Бургас', regionPopulation: 409265 },
    'VAR': { regionName: 'Варна', regionPopulation: 469885 },
    'VTR': { regionName: 'Велико Търново', regionPopulation: 232568 },
    'VID': { regionName: 'Видин', regionPopulation: 82835 },
    'VRC': { regionName: 'Враца', regionPopulation: 159470 },
    'GAB': { regionName: 'Габрово', regionPopulation: 106598 },
    'DOB': { regionName: 'Добрич', regionPopulation: 171809 },
    'KRZ': { regionName: 'Кърджали', regionPopulation: 158204 },
    'KNL': { regionName: 'Кюстендил', regionPopulation: 116915 },
    'LOV': { regionName: 'Ловеч', regionPopulation: 122546 },
    'MON': { regionName: 'Монтана', regionPopulation: 127001 },
    'PAZ': { regionName: 'Пазарджик', regionPopulation: 252776 },
    'PER': { regionName: 'Перник', regionPopulation: 119190 },
    'PVN': { regionName: 'Плевен', regionPopulation: 236305 },
    'PDV': { regionName: 'Пловдив', regionPopulation: 666801 },
    'RAZ': { regionName: 'Разград', regionPopulation: 110789 },
    'RSE': { regionName: 'Русе', regionPopulation: 215477 },
    'SLS': { regionName: 'Силистра', regionPopulation: 108018 },
    'SLV': { regionName: 'Сливен', regionPopulation: 184119 },
    'SML': { regionName: 'Смолян', regionPopulation: 103532 },
    'SFO': { regionName: 'София област', regionPopulation: 226671 },
    'SOF': { regionName: 'София град', regionPopulation: 1328790 },
    'SZR': { regionName: 'Стара Загора', regionPopulation: 313396 },
    'TGV': { regionName: 'Търговище', regionPopulation: 110914 },
    'HKV': { regionName: 'Хасково', regionPopulation: 225317 },
    'SHU': { regionName: 'Шумен', regionPopulation: 172262 },
    'JAM': { regionName: 'Ямбол', regionPopulation: 117335 },
}

function handleError(err) {
    htmlSelectors.notifyDiv().innerText = notifications.fetchFromOpenDBError;
}

export function isRegion(value) {
    return value.split('_')[1];
}

export function calculate100k(value, reg) {
    // ( number / population ) = (return Val / 100k)

    return Math.round(value * 100000 / regionObjMapping[regionKey(reg)].regionPopulation)
}

export const isInRange = (date) => {
    return new Date(htmlSelectors.displayValueOneDOM().innerText) <= date && new Date(htmlSelectors.displayValueTwoDOM().innerText) >= date;
}
