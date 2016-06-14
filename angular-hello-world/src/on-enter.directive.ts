'use strict';

const ENTER_KEY = 13;

/**
 * Directive that finishes editing if the user presses the Enter key.
 */
export function onEnter(): ng.IDirective {
	return {
		link: ($scope: ng.IScope, element: JQuery, attributes: any): void => {
			element.bind('keydown', (event: JQueryEventObject) => {
				if (event.keyCode === ENTER_KEY) {
					$scope.$apply(attributes.onEnter);
				}
			});

			$scope.$on('$destroy', () => { element.unbind('keydown'); });
		}
	};
}

