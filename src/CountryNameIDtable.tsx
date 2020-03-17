export const countryNameIDtable = {
  'date': null,
  'Andorra': null,
  'Bahrain': null,
  'Saint Barthlemy': null,
  'Saint Vincent and the Grenadines': null,
  'Worldwide': null,
  'Gibraltar': null,
  'Guernsey': null,
  'French Guiana': null,
  'International': null,
  'Faeroe Islands': null,
  'Jersey': null,
  'Liechtenstein': null,
  'Maldives': null,
  'Malta': null,
  'San Marino': null,
  'Saint Martin (French part)': null,
  'Martinique': null,
  'Monaco': null,
  'French Polynesia': null,
  'Reunion': null,
  'Singapore': null,
  'Vatican': null,
  'Afghanistan': '004',
  'South Africa': '710',
  'Albania': '008',
  'Algeria': '012',
  'Bosnia and Herzegovina': '070',
  'United Arab Emirates': '784',
  'Saudi Arabia': '682',
  'Argentina': '032',
  'Armenia': '051',
  'Australia': '036',
  'Austria': '040',
  'Azerbaijan': '031',
  'Bangladesh': '050',
  'Belarus': '112',
  'Belgium': '056',
  'Bhutan': '064',
  'Bolivia': '068',
  'Brazil': '076',
  'Brunei': '096',
  'Bulgaria': '100',
  'Cambodia': '116',
  'Cameroon': '120',
  'Canada': '124',
  'Chile': '152',
  'China': '156',
  'Colombia': '170',
  'Croatia': '191',
  'Cuba': '192',
  'Cyprus': '196',
  'Cote d\'Ivoire': '384',
  'Denmark': '208',
  'Ecuador': '218',
  'Egypt': '818',
  'Estonia': '233',
  'Burkina Faso': '854',
  'Finland': '246',
  'France': '250',
  'Georgia': '268',
  'Germany': '276',
  'Greece': '300',
  'Guyana': '328',
  'Honduras': '340',
  'Hungary': '348',
  'Iceland': '352',
  'India': '356',
  'Indonesia': '360',
  'Iran': '364',
  'Iraq': '368',
  'Ireland': '372',
  'Israel': '376',
  'Italy': '380',
  'Jamaica': '388',
  'Japan': '392',
  'Jordan': '400',
  'United Kingdom': '826',
  'South Korea': '410',
  'Kuwait': '414',
  'Sri Lanka': '144',
  'Latvia': '428',
  'Lebanon': '422',
  'Lithuania': '440',
  'Luxembourg': '442',
  'Macedonia': '807',
  'Malaysia': '458',
  'Mexico': '484',
  'Moldova': '498',
  'Mongolia': '496',
  'Morocco': '504',
  'Nepal': '524',
  'Netherlands': '528',
  'Nigeria': '566',
  'Norway': '578',
  'Oman': '512',
  'Pakistan': '586',
  'Palestine': '275',
  'Panama': '591',
  'Paraguay': '600',
  'Peru': '604',
  'Philippines': '608',
  'Poland': '616',
  'Portugal': '620',
  'Qatar': '634',
  'Czech Republic': '203',
  'Democratic Republic of Congo': '180',
  'Dominican Republic': '214',
  'Costa Rica': '188',
  'Romania': '642',
  'Russia': '643',
  'Senegal': '686',
  'Serbia': '688',
  'Slovakia': '703',
  'Slovenia': '705',
  'Spain': '724',
  'United States': '840',
  'Sweden': '752',
  'Switzerland': '756',
  'Thailand': '764',
  'Togo': '768',
  'Tunisia': '788',
  'Turkey': '792',
  'Ukraine': '804',
  'Vietnam': '704',
  'New Zealand': '554',
};

export function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}