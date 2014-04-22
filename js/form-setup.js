$.getJSON('data/locs.json', function(locs) {
  locs.forEach(function(loc) {
    var newOption = $('<option>').text(loc.name).val(loc.node);
    $('select.loc').append(newOption);
  });
}).then(function() {
  $('select').chosen();
});

var algoPicked = false;
var startPicked = false;
var goalPicked = false;

function enableStartButton() {  
  $('button#start-btn').removeAttr('disabled');
}

function enableStopButton() {
  $('button#stop-btn').removeAttr('disabled');
}

function disableStopButton() {  
  $('button#stop-btn').attr('disabled', true);
}

function checkStartButton() {
  if (algoPicked && startPicked && goalPicked) {
    enableStartButton();
  }
}

$('select#algo-sel').change(function() {
  algoPicked = true;
  checkStartButton();
});

$('select#start-sel').change(function() {
  startPicked = true;
  checkStartButton();
  clearMap();
  var node = $('select#start-sel').val();
  addStartFlag(nodeCoords(node));
  zoomMapToFlags();
});

$('select#goal-sel').change(function() {
  goalPicked = true;
  checkStartButton();
  clearMap();
  var node = $('select#goal-sel').val();
  addGoalFlag(nodeCoords(node));
  zoomMapToFlags();
});

$('button#start-btn').click(function() {
  enableStopButton();
  clearMap();
  var algo = $('select#algo-sel').val();
  var startNode = $('select#start-sel').val();
  var goalNode = $('select#goal-sel').val();
  worker.postMessage({
    task: 'search',
    type: algo,
    start: startNode,
    goal: goalNode
  });
});

$('button#stop-btn').click(function() {
  disableStopButton();
  restartWorker();
});

$('button#clear-btn').click(function() {
  clearMap();
});
