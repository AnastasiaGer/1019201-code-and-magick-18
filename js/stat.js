'use strict';

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

var renderScoreCard = function (ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, color, strokeColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = strokeColor;
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCongrats = function (ctx, text, x, y, color) {
  ctx.fillStyle = color || 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderScoreCard(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 1)');
  renderScoreCard(ctx, 100, 10, 420, 270, 'rgba(255, 255, 255, 1)');

  renderCongrats(ctx, 'Ура вы победили!', 120, 40);
  renderCongrats(ctx, 'Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';

    ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + GAP);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.floor(times[i]), TEXT_X + (BAR_WIDTH + BAR_GAP) * i, ((-BAR_MAX_HEIGHT * times[i]) / maxTime) + STATS_GAP);
    ctx.fillText(names[i], TEXT_X + (BAR_WIDTH + BAR_GAP) * i, TEXT_Y);
  }
};
