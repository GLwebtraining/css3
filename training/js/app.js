(function(){

	'use strict';
	
	angular
		.module('js-lessons', ['ngRoute', 'controller.main'])
		.config(routeCfg);
		
	routeCfg.$inject = ['$routeProvider'];
	
	function routeCfg($routeProvider){
		$routeProvider
			.when('/:folder/:file', {
				templateUrl: function(template){
					return 'view/'+template.folder+'/'+template.file+'.html';
				}
			}).otherwise({
				redirectTo: '/'
			});                                       
	}
	
})();