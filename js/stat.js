'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_X = 140;
var TEXT_Y = 260;
var BAR_Y = 240;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var STATS_GAP = 235;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderScoreCard = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCongrats = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + 5 * GAP);
};

var renderChart = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';

    ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + GAP);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.floor(times[i]), TEXT_X + (BAR_WIDTH + BAR_GAP) * i, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + STATS_GAP);
    ctx.fillText(names[i], TEXT_X + (BAR_WIDTH + BAR_GAP) * i, TEXT_Y);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderScoreCard(ctx);
  renderScoreCard(ctx);

  renderCongrats(ctx);

  renderChart(ctx, names, times);
};
