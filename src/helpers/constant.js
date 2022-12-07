export const BORDER_HEIGHT = 1;
export const MULTI_DAY_EVENT_HEIGHT = 26;
export const MONTH_NUMBER_HEIGHT = 32;
export const MULTI_DAY_GAP = 3;

export const TYPE = {
  ACTIVE: 'ACTIVE',
  END: 'END',

  NORMAL: 'NORMAL',
  HOVER: 'HOVER',
}

export const FONT_COLOR = {
  palette: {
    black: '#2E2E2E'
  }
}

export const COLORS = {
  [TYPE.ONGOING]: {
    [TYPE.NORMAL]: {
      green1: '#307D38',
      green2: '#47A241',
      green3: '#93BC4D',
      yellow: '#EFA933',
      orange: '#EE6F2E',
      red: '#DB1F35',
      pink: '#F6448D',
      violet1: '#BB3386',
      violet2: '#813C95',
      violet3: '#9469B9', //wrong color
      blue: '#4A43A5',
      blue2: '#2766B1',
      blue3: '#1994C1',
      blue4: '#08C0CD'
    },
    [TYPE.HOVER]: {
      green1: '#2F7036',
      green2: '#43903E',
      green3: '#83A648',
      yellow: '#D19632',
      orange: '#D0652E',
      red: '#C02133',
      pink: '#D23E7B',
      violet1: '#9D3173',
      violet2: '#743985',
      violet3: '#8460A3',
      blue: '#453F92',
      blue2: '#285D9D',
      blue3: '#1C84AA',
      blue4: '#27A19A'
    },
  },
  [TYPE.END]: {
    [TYPE.NORMAL]: {
      green1: '#E0ECE1',
      green2: '#E3F1E2',
      green3: '#EFF5E4',
      yellow: '#FDF2E0',
      orange: '#FDE9E0',
      red: '#FADDE1',
      pink: '#FDE2ED',
      violet1: '#F4E0EC',
      violet2: '#ECE2EF',
      violet3: '#EFE8F5',
      blue: '#E4E3F2',
      blue2: '#DEE8F3',
      blue3: '#DCEFF6',
      blue4: '#DEF4F3'
    },
    [TYPE.HOVER]: {
      green1: '#D8E1D8',
      green2: '#DBE6D9',
      green3: '#E5EADB',
      yellow: '#EFE7D8',
      orange: '#EEDFD7',
      red: '#E9D4D7',
      pink: '#EDD9E2',
      violet1: '#E6D7E0',
      violet2: '#DFD8E3',
      violet3: '#E3DDE9',
      blue: '#DAD9E6',
      blue2: '#D6DDE7',
      blue3: '#D5E3EA',
      blue4: '#D8E8E8'
    },
  },
}