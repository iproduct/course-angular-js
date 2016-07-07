'use strict';

const ENTER_KEY = 13;

angular.module('keyEvents',[]).directive('onEnter', ['$log', onEnterDirective]);

/**
 * Directive that finishes editing if the user presses the Enter key.
 */
function onEnterDirective($log: ng.ILogService): ng.IDirective {
	return {
		link: ($scope: ng.IScope, element: JQuery, attributes: any): void => {
			element.bind('keydown', (event: JQueryEventObject) => {
				if (event.keyCode === ENTER_KEY) {
					$log.info('ENTER key pressed');
					$scope.$apply(attributes.onEnter);
				}
			});

			$scope.$on('$destroy', () => { element.unbind('keydown'); });
		}
	};
}

