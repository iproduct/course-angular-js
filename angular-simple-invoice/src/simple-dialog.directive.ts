'use strict';

angular.module('dialogs',[])
.directive('dialog', ['$log', DialogDirective]);

/**
 * Directive that opens a popup dialog
 */
function DialogDirective($log: ng.ILogService): ng.IDirective {
	return {
		bindToController: true,
		controller: ['$log', DialogController],
		controllerAs: '$ctrl',
		replace: true,
		restrict: 'E',
		scope: {
			//dialogTitle: '@dialogTitle',             // the title uses the data-binding from the parent scope
			onOk: '&',              // create a delegate onOk function
			onCancel: '&',          // create a delegate onCancel function
			visible: '='            // set up visible to accept data-binding
		},
		template: `
			<div ng-show="$ctrl.visible" class="dialog">
			<div class="header">{{$ctrl.dialogTitle}}</div>
			<div class="body" ng-transclude></div>
			<div class="footer">
				<button ng-click="$ctrl.ok()">Confirm Payment</button>
				<button ng-click="$ctrl.cancel()">Cancel</button>
			</div>
			</div>`,
		transclude: true
	};
}

/**
 * Controller for dialog popup directive
 */
class DialogController {
	onOk: (...args: any[]) => any;
	onCancel: (...args: any[]) => any;
	dialogTitle: string = 'Payment Details';
	constructor(public $log: ng.ILogService) {
	}

	cancel(): void {
		this.$log.info('Payment canceled.');
		this.onCancel();
	}
	ok(): void {
		this.$log.info('Payment confirmed.');
		this.onOk();
	}
}

