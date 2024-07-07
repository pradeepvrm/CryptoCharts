function getData(symbol, interval) {
  fetch(`/data/${symbol}/${interval}`)
    .then(response => response.json())
    .then(data => {
      mainSeries.setData(data);
    });
}

window.addEventListener('load', () => {
   getData("BTC", "1year");
});

// Chart setup and configuration
const chart = LightweightCharts.createChart(
document.getElementById('container'),
{
  layout: {
    background: { color: "#222" },
    textColor: "#C3BCDB",
  },
  grid: {
    vertLines: { color: "#444" },
    horzLines: { color: "#444" },
  },
}
);

// Create the Main Series (Candlesticks)
const mainSeries = chart.addCandlestickSeries();

// Changing the Candlestick colors
mainSeries.applyOptions({
  wickUpColor: 'rgb(54, 116, 217)',
  upColor: 'rgb(54, 116, 217)',
  wickDownColor: 'rgb(225, 50, 85)',
  downColor: 'rgb(225, 50, 85)',
  borderVisible: false,
});

chart.applyOptions({
  crosshair: {
    // Change mode from default 'magnet' to 'normal'.
    // Allows the crosshair to move freely without snapping to datapoints
    mode: LightweightCharts.CrosshairMode.Normal,

    // Vertical crosshair line (showing Date in Label)
    vertLine: {
      width: 8,
      color: "#C3BCDB44",
      style: LightweightCharts.LineStyle.Solid,
      labelBackgroundColor: "#9B7DFF",
    },

    // Horizontal crosshair line (showing Price in Label)
    horzLine: {
      color: "#9B7DFF",
      labelBackgroundColor: "#9B7DFF",
    },
  },
});