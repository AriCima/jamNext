
const generateJamCode = () => {
    // type: 4aG-89n --> 14.776.336 combinations

    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let codeArray = [];

    // if a random nr is even then letter is capital
    for (let l=0; l < 8; l++){
    const firstRandomNr = Math.round(Math.random()*10);
    const secondRandomNr = Math.round(Math.random()*10);

    const isNumber = Number.isInteger(firstRandomNr/2);
    const isCapitalLetter =  Number.isInteger(secondRandomNr/2);
    const letterIndex = Math.round(Math.random()*25);

    if (isNumber) {
        codeArray[l]=(firstRandomNr);
    } else if (isCapitalLetter){
            codeArray[l]=(letters[letterIndex]).toUpperCase();
        } else {
            codeArray[l]=letters[letterIndex];
    }
    };

    codeArray[3] = '-'
    let code = codeArray.join("");
     return code
};

const getJamRules = (type) => {
    let rules = [];
    switch (type) {
        case 'rooms-rental':
            rules = {
                smokingBalcony: false,
                pets: false,
                smoking: false,
                overnight: false,
                checkInProcess: '',
                checkOutProcess: '',
                checkInFrom: '2pm',
                checkInTo: '10pm',
                checkOutBefore: '10am'
            }
            break;
        default:

    }
   return rules;
};

const getJamAdminSections = (type) => {
    let sections = [];
    switch (type) {
        case 'accommodation':
          sections = ['Board', 'Jammers', 'MyJam', 'Settings']
          break;
        case 'rooms-rental':
            sections = ['Overview','Board', 'Tenants', 'Rooms', 'Settings']
            break;
        case 'chat': 
            sections = ['Chat']
            break;
        default:
          //console.log('no reconoce tipo')
    }

   console.log('sections: ', sections);
   return sections;
};

const getJamGuestSections = (type) => {
    //console.log('get Jam Sections launched')
    let sections = [];
    switch (type) {
        case 'accommodation':
          sections = ['Board', 'Jammers', 'MyJam', 'Settings']
          break;
        case 'rooms-rental':
            sections = ['Overview', 'Board', 'Flatmates']
            break;
        case 'chat': 
            sections = ['Chat']
            break;
        default:
          //console.log('no reconoce tipo')
    }
   return sections;
};

const getSelectOptions = (listType) => {

    let list;
    switch (listType) {
        case 'countries':
            list = [
                {id: "select", name: "Select . . ."},
                {id: "Afganistan",name: "Afghanistan"},
                {id: "Albania",name: "Albania"},
                {id: "Algeria",name: "Algeria"},
                {id: "American Samoa",name: "American Samoa"},
                {id: "Andorra",name: "Andorra"},
                {id: "Angola",name: "Angola"},
                {id: "Anguilla",name: "Anguilla"},
                {id: "Antigua & Barbuda",name: "Antigua & Barbuda"},
                {id: "Argentina",name: "Argentina"},
                {id: "Armenia",name: "Armenia"},
                {id: "Aruba",name: "Aruba"},
                {id: "Australia",name: "Australia"},
                {id: "Austria",name: "Austria"},
                {id: "Azerbaijan",name: "Azerbaijan"},
                {id: "Bahamas", name: "Bahamas"},
                {id: "Bahrain", name: "Bahrain"},
                {id: "Bangladesh", name: "Bangladesh"},
                {id: "Barbados", name: "Barbados"},
                {id: "Belarus", name: "Belarus"},
                {id: "Belgium", name: "Belgium"},
                {id: "Belize", name: "Belize"},
                {id: "Benin", name: "Benin"},
                {id: "Bermuda", name: "Bermuda"},
                {id: "Bhutan", name: "Bhutan"},
                {id: "Bolivia", name: "Bolivia"},
                {id: "Bonaire", name: "Bonaire"},
                {id: "BosniaHerzegovina", name: "Bosnia & Herzegovina"},
                {id: "Botswana", name: "Botswana"},
                {id: "Brazil", name: "Brazil"},
                {id: "British Indian Ocean Ter", name: "British Indian Ocean Ter"},
                {id: "Brunei", name: "Brunei"},
                {id: "Bulgaria", name: "Bulgaria"},
                {id: "BurkinaFaso", name: "Burkina Faso"},
                {id: "Burundi", name: "Burundi"},
                {id: "Cambodia", name: "Cambodia"},
                {id: "Cameroon", name: "Cameroon"},
                {id: "Canada", name: "Canada"},
                {id: "CapeVerde", name: "Cape Verde"},
                {id: "CaymanIslands", name: "Cayman Islands"},
                {id: "CentralAfricanRepublic", name: "Central African Republic"},
                {id: "Chad", name: "Chad"},
                {id: "ChannelIslands", name: "Channel Islands"},
                {id: "Chile", name: "Chile"},
                {id: "China", name: "China"},
                {id: "ChristmasIsland", name: "Christmas Island"},
                {id: "CocosIsland", name: "Cocos Island"},
                {id: "Colombia", name: "Colombia"},
                {id: "Comoros", name: "Comoros"},
                {id: "Congo", name: "Congo"},
                {id: "CookIslands", name: "Cook Islands"},
                {id: "CostaRica", name: "Costa Rica"},
                {id: "CoteDIvoire", name: "Cote DIvoire"},
                {id: "Croatia", name: "Croatia"},
                {id: "Cuba", name: "Cuba"},
                {id: "Curaco", name: "Curacao"},
                {id: "Cyprus", name: "Cyprus"},
                {id: "CzechRepublic", name: "Czech Republic"},
                {id: "Denmark", name: "Denmark"},
                {id: "Djibouti", name: "Djibouti"},
                {id: "Dominica", name: "Dominica"},
                {id: "DominicanRepublic", name: "Dominican Republic"},
                {id: "EastTimor", name: "East Timor"},
                {id: "Ecuador", name: "Ecuador"},
                {id: "Egypt", name: "Egypt"},
                {id: "ElSalvador", name: "El Salvador"},
                {id: "EquatorialGuinea", name: "Equatorial Guinea"},
                {id: "Eritrea", name: "Eritrea"},
                {id: "Estonia", name: "Estonia"},
                {id: "Ethiopia", name: "Ethiopia"},
                {id: "FalklandIslands", name: "Falkland Islands"},
                {id: "FaroeIslands", name: "Faroe Islands"},
                {id: "Fiji", name: "Fiji"},
                {id: "Finland", name: "Finland"},
                {id: "France", name: "France"},
                {id: "FrenchGuiana", name: "French Guiana"},
                {id: "FrenchPolynesia", name: "French Polynesia"},
                {id: "FrenchSouthern Ter", name: "French Southern Ter"},
                {id: "Gabon", name: "Gabon"},
                {id: "Gambia", name: "Gambia"},
                {id: "Georgia", name: "Georgia"},
                {id: "Germany", name: "Germany"},
                {id: "Ghana", name: "Ghana"},
                {id: "Gibraltar", name: "Gibraltar"},
                {id: "GreatBritain", name: "Great Britain"},
                {id: "Greece", name: "Greece"},
                {id: "Greenland", name: "Greenland"},
                {id: "Grenada", name: "Grenada"},
                {id: "Guadeloupe", name: "Guadeloupe"},
                {id: "Guam", name: "Guam"},
                {id: "Guatemala", name: "Guatemala"},
                {id: "Guinea", name: "Guinea"},
                {id: "Guyana", name: "Guyana"},
                {id: "Haiti", name: "Haiti"},
                {id: "Hawaii", name: "Hawaii"},
                {id: "Honduras", name: "Honduras"},
                {id: "Hong Kong", name: "Hong Kong"},
                {id: "Hungary", name: "Hungary"},
                {id: "Iceland", name: "Iceland"},
                {id: "Indonesia", name: "Indonesia"},
                {id: "India", name: "India"},
                {id: "Iran", name: "Iran"},
                {id: "Iraq", name: "Iraq"},
                {id: "Ireland", name: "Ireland"},
                {id: "IsleOfMan", name: "Isle of Man"},
                {id: "Israel", name: "Israel"},
                {id: "Italy", name: "Italy"},
                {id: "Jamaica", name: "Jamaica"},
                {id: "Japan", name: "Japan"},
                {id: "Jordan", name: "Jordan"},
                {id: "Kazakhstan", name: "Kazakhstan"},
                {id: "Kenya", name: "Kenya"},
                {id: "Kiribati", name: "Kiribati"},
                {id: "KoreaNorth", name: "Korea North"},
                {id: "KoreaSout", name: "Korea South"},
                {id: "Kuwait", name: "Kuwait"},
                {id: "Kyrgyzstan", name: "Kyrgyzstan"},
                {id: "Laos", name: "Laos"},
                {id: "Latvia", name: "Latvia"},
                {id: "Lebanon", name: "Lebanon"},
                {id: "Lesotho", name: "Lesotho"},
                {id: "Liberia", name: "Liberia"},
                {id: "Libya", name: "Libya"},
                {id: "Liechtenstein", name: "Liechtenstein"},
                {id: "Lithuania", name: "Lithuania"},
                {id: "Luxembourg", name: "Luxembourg"},
                {id: "Macau", name: "Macau"},
                {id: "Macedonia", name: "Macedonia"},
                {id: "Madagascar", name: "Madagascar"},
                {id: "Malaysia", name: "Malaysia"},
                {id: "Malawi", name: "Malawi"},
                {id: "Maldives", name: "Maldives"},
                {id: "Mali", name: "Mali"},
                {id: "Malta", name: "Malta"},
                {id: "MarshallIslands", name: "Marshall Islands"},
                {id: "Martinique", name: "Martinique"},
                {id: "Mauritania", name: "Mauritania"},
                {id: "Mauritius", name: "Mauritius"},
                {id: "Mayotte", name: "Mayotte"},
                {id: "Mexico", name: "Mexico"},
                {id: "Midway Islands", name: "Midway Islands"},
                {id: "Moldova", name: "Moldova"},
                {id: "Monaco", name: "Monaco"},
                {id: "Mongolia", name: "Mongolia"},
                {id: "Montserrat", name: "Montserrat"},
                {id: "Morocco", name: "Morocco"},
                {id: "Mozambique", name: "Mozambique"},
                {id: "Myanmar", name: "Myanmar"},
                {id: "Nambia", name: "Nambia"},
                {id: "Nauru", name: "Nauru"},
                {id: "Nepal", name: "Nepal"},
                {id: "NetherlandAntilles", name: "Netherland Antilles"},
                {id: "Netherlands", name: "Netherlands (Holland, Europe)"},
                {id: "Nevis", name: "Nevis"},
                {id: "NewCaledonia", name: "New Caledonia"},
                {id: "NewZealand", name: "New Zealand"},
                {id: "Nicaragua", name: "Nicaragua"},
                {id: "Niger", name: "Niger"},
                {id: "Nigeria", name: "Nigeria"},
                {id: "Niue", name: "Niue"},
                {id: "NorfolkIsland", name: "Norfolk Island"},
                {id: "Norway", name: "Norway"},
                {id: "Oman", name: "Oman"},
                {id: "Pakistan", name: "Pakistan"},
                {id: "PalauIsland", name: "Palau Island"},
                {id: "Palestine", name: "Palestine"},
                {id: "Panama", name: "Panama"},
                {id: "PapuaNewGuinea", name: "Papua New Guinea"},
                {id: "Paraguay", name: "Paraguay"},
                {id: "Peru", name: "Peru"},
                {id: "Phillipines", name: "Philippines"},
                {id: "PitcairnIsland", name: "Pitcairn Island"},
                {id: "Poland", name: "Poland"},
                {id: "Portugal", name: "Portugal"},
                {id: "PuertoRico", name: "Puerto Rico"},
                {id: "Qatar", name: "Qatar"},
                {id: "RepublicOfMontenegro", name: "Republic of Montenegro"},
                {id: "RepublicOfSerbia", name: "Republic of Serbia"},
                {id: "Reunion", name: "Reunion"},
                {id: "Romania", name: "Romania"},
                {id: "Russia", name: "Russia"},
                {id: "Rwanda", name: "Rwanda"},
                {id: "StBarthelemy", name: "St Barthelemy"},
                {id: "StEustatius", name: "St Eustatius"},
                {id: "StHelena", name: "St Helena"},
                {id: "StKitts-Nevis", name: "St Kitts-Nevis"},
                {id: "StLucia", name: "St Lucia"},
                {id: "StMaarten", name: "St Maarten"},
                {id: "StPierre & Miquelon", name: "St Pierre & Miquelon"},
                {id: "StVincent & Grenadines", name: "St Vincent & Grenadines"},
                {id: "Saipan", name: "Saipan"},
                {id: "Samoa", name: "Samoa"},
                {id: "SamoaAmerican", name: "Samoa American"},
                {id: "SanMarino", name: "San Marino"},
                {id: "SaoTomePrincipe", name: "Sao Tome & Principe"},
                {id: "Saudi Arabia", name: "Saudi Arabia"},
                {id: "Senegal", name: "Senegal"},
                {id: "Seychelles", name: "Seychelles"},
                {id: "SierraLeone", name: "Sierra Leone"},
                {id: "Singapore", name: "Singapore"},
                {id: "Slovakia", name: "Slovakia"},
                {id: "Slovenia", name: "Slovenia"},
                {id: "SolomonIslands", name: "Solomon Islands"},
                {id: "Somalia", name: "Somalia"},
                {id: "SouthAfrica", name: "South Africa"},
                {id: "Spain", name: "Spain"},
                {id: "SriLanka", name: "Sri Lanka"},
                {id: "Sudan", name: "Sudan"},
                {id: "Suriname: ", name: "Suriname: "},
                {id: "Swaziland", name: "Swaziland"},
                {id: "Sweden", name: "Sweden"},
                {id: "Switzerland", name: "Switzerland"},
                {id: "Syria", name: "Syria"},
                {id: "Tahiti", name: "Tahiti"},
                {id: "Taiwan", name: "Taiwan"},
                {id: "Tajikistan", name: "Tajikistan"},
                {id: "Tanzania", name: "Tanzania"},
                {id: "Thailand", name: "Thailand"},
                {id: "Togo", name: "Togo"},
                {id: "Tokelau", name: "Tokelau"},
                {id: "Tonga", name: "Tonga"},
                {id: "Trinidad Tobago", name: "Trinidad & Tobago"},
                {id: "Tunisia", name: "Tunisia"},
                {id: "Turkey", name: "Turkey"},
                {id: "Turkmenistan", name: "Turkmenistan"},
                {id: "TurksCaicosIs", name: "Turks & Caicos Is"},
                {id: "Tuvalu", name: "Tuvalu"},
                {id: "Uganda", name: "Uganda"},
                {id: "UnitedKingdom", name: "United Kingdom"},
                {id: "Ukraine", name: "Ukraine"},
                {id: "UAE", name: "United Arab Emirates"},
                {id: "USA", name: "United States of America"},
                {id: "Uruguay", name: "Uruguay"},
                {id: "Uzbekistan", name: "Uzbekistan"},
                {id: "Vanuatu", name: "Vanuatu"},
                {id: "Vatican", name: "Vatican City State"},
                {id: "Venezuela", name: "Venezuela"},
                {id: "Vietnam", name: "Vietnam"},
                {id: "VirginIslands(Brit)", name: "Virgin Islands (Brit)"},
                {id: "VirginIslands(USA)", name: "Virgin Islands (USA)"},
                {id: "WakeIsland", name: "Wake Island"},
                {id: "WallisFutana", name: "Wallis & Futana Is"},
                {id: "Yemen", name: "Yemen"},
                {id: "Zaire", name: "Zaire"},
                {id: "Zambia", name: "Zambia"},
                {id: "Zimbabwe", name: "Zimbabwe"},
            ]
        break;
        case 'nrOfRooms':
            list = [
                {id: 1, name: "1"},
                {id: 2, name: "2"},
                {id: 3, name: "3"},
                {id: 4, name: "4"},
                {id: 5, name: "5"},
                {id: 6, name: "6"},
                {id: 7, name: "7"},
                {id: 8, name: "8"},
                {id: 9, name: "9"},
                {id: 1, name: "10"},
            ]
        break;
        case 'jamTypes':
            list = [
                {id: 'select', name: "Select . . . "},
                {id: 'rooms-rental', name: "Rooms Rental"},
                {id: 'standard', name: "Just a jam"},               
            ];
        break;
        default:
    }


    return list;         
};



const Calculations = {
    generateJamCode,
    getJamAdminSections,
    getJamGuestSections,
    getSelectOptions,
    getJamRules,
};

export default Calculations;