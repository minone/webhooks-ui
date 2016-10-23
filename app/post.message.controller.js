(function() {
	
	'use strict';
	
	angular.module('webhooks').controller('PostMessageController', PostMessageController);
	
	PostMessageController.$inject = ['DataService' , 'destination', '$uibModalInstance'];
	
	function PostMessageController(DataService, destination, $uibModalInstance) {
		
		var self = this;
		
		self.contentType = '';
		
		self.messageBody = '';
		
		self.postMessage = function() {
			DataService.postMessage(destination.id, self.contentType, self.messageBody, destination.secret, function() {
				$uibModalInstance.close();
        	});
		};
		
		self.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
	}
	
})();