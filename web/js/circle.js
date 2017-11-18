
var totalPercent = 0.0;
var bar = undefined;

function circle(percent)
{
  totalPercent += (percent / 100);
  if (totalPercent > 1.0)
    totalPercent = 1.0;
  if (!bar)
    bar = new ProgressBar.Circle(container, {
  color: '#aaa',
  
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#008800', width: 1 },
  to: { color: '#BB0000', width: 4 },
  
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('0 %');
    } else {
      circle.setText(value + ' %');
    }

  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(totalPercent);  // Number from 0.0 to 1.0
}
