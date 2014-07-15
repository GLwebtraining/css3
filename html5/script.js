
var App = {
	defaults: {
		width: 5,
		color: ['#39f', '#000', '#f00','#ff0','#0f0','#0ff','#f0f','#fff'],
		visibility: true,
		position: 'center'
	},
	initialize: function () {
		App.define();
	},
	define: function () {
		App.playerHolder = document.querySelector('.player');
		App.player = App.playerHolder.querySelector('video');
		App.playerStyles = App.playerHolder.querySelector('.styles');
		App.playerHandle = App.playerHolder.querySelector('.handle');

		App.playerStyles.borderWidth = App.playerStyles.querySelector('.border-width');
		App.playerStyles.borderColor = App.playerStyles.querySelector('.border-color');
		App.playerStyles.showHide = App.playerStyles.querySelector('.player-show-hide');
		App.playerStyles.pullLeft = App.playerStyles.querySelector('.player-pull-left');
		App.playerStyles.pullRight = App.playerStyles.querySelector('.player-pull-right');
		App.playerStyles.reset = App.playerStyles.querySelector('.reset');

		App.playerHandle.playStop = App.playerHandle.querySelector('.player-play-pause');
		App.playerHandle.stop = App.playerHandle.querySelector('.player-stop');
		App.playerHandle.jump = App.playerHandle.querySelector('.player-jump');

		App.playerStyles.borderWidth.onclick = function(){
			var w = App.defaults.width;
			return function(){
				w--;
				if(w <= 0) w = App.defaults.width;
				App.changeCss({borderWidth: w + 'px'});
			};
		}();

		App.playerStyles.borderColor.onclick = function(){
			var t = 0,
				c = App.defaults.color[t],
				l = App.defaults.color.length;

			return function(){
				t++;
				if(t >= l) t = 0;
				c = App.defaults.color[t];
				App.changeCss({borderColor: c});
			};
		}();

		App.playerStyles.showHide.onclick = function(){
			App.changeCss({display: (App.defaults.visibility ? 'none' : 'block')});
			App.defaults.visibility = !App.defaults.visibility;
			App.playerStyles.showHide.innerHTML = (App.defaults.visibility ? 'Hide' : 'Show');
		};

		App.playerStyles.pullLeft.onclick = function(){
			App.changeCss({float: 'left'});
		};

		App.playerStyles.pullRight.onclick = function(){
			App.changeCss({float: 'right'});
		};

		App.playerStyles.reset.onclick = function(){
			App.player.removeAttribute('style');
		};

		App.playerHandle.playStop.onclick = App.playing;
		App.playerHandle.jump.onclick = App.jumping;
		App.playerHandle.stop.onclick = App.stop;
	},
	changeCss: function(style){
		for(var key in style){
			App.player.style[key] = style[key];
		}
	},
	playing: function(){
		if(App.player.paused){
			App.player.play();
			App.playerHandle.playStop.innerHTML = 'Pause';
		}
		else{
			App.player.pause();
			App.playerHandle.playStop.innerHTML = 'Play';
		}
	},
	jumping: function(){
		App.player.currentTime += 5;
	},
	stop: function(){
		if(!App.player.paused) App.playing();
		App.player.currentTime = 0;
	}
};

document.addEventListener('DOMContentLoaded', App.initialize, false);