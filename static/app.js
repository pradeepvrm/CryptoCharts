const addCoinEventListener = (symbol, period='1year') => {
   document.getElementById(symbol).addEventListener('click', () => {
      getData(symbol, period);
      const addPeriodClickListener = (symbol, period) => {
         document.getElementById(period).addEventListener('click', () => {
            getData(symbol, period);
         });
      };
      // Add event listeners to the buttons
      addPeriodClickListener(symbol, '1day');
      addPeriodClickListener(symbol, '1week');
      addPeriodClickListener(symbol, '1month');
      addPeriodClickListener(symbol, '6month');
      addPeriodClickListener(symbol, '1year');
      addPeriodClickListener(symbol, '2year');
   });
};

// Add event listeners to the coins
addCoinEventListener('BTC');
addCoinEventListener('ETH');
addCoinEventListener('LTC');
addCoinEventListener('XRP');
addCoinEventListener('ADA');
addCoinEventListener('SOL');
addCoinEventListener('AVAX');
addCoinEventListener('DOT');
addCoinEventListener('MATIC');
addCoinEventListener('LINK');
addCoinEventListener('UNI');
addCoinEventListener('USDT');
addCoinEventListener('DOGE');
