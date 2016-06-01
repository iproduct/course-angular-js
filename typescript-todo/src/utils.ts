// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
declare global {
    interface NodeList  {
        forEach : (callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any) => void
    }
}
NodeList.prototype.forEach = Array.prototype.forEach;


// Get element(s) by CSS selector:
export function qs(selector: string, scope?: Element) {
	return (scope || document).querySelector(selector);
}

export function qsa(selector: string, scope?: Element) {
	return (scope || document).querySelectorAll(selector);
}

// addEventListener wrapper:
export function $on(target: Element | Window, type: string, callback: EventListener, useCapture?: boolean) {
	target.addEventListener(type, callback, !!useCapture);
}

// Attach a handler to event for all elements that match the selector,
// now or in the future, based on a root element
export function $delegate(target: Element, selector: string, type: string, handler: EventListener) {
	const dispatchEvent = (event: Event) => {
		const targetElement = <Element> event.target;
		const potentialElements = qsa(selector, target);
		const hasMatch = Array.from(potentialElements).includes(targetElement);

		if (hasMatch) {
			handler.call(targetElement, event);
		}
	};

	// https://developer.mozilla.org/en-US/docs/Web/Events/blur
	const useCapture = type === 'blur' || type === 'focus';

	$on(target, type, dispatchEvent, useCapture);
}

// Find the element's parent with the given tag name:
// $parent(qs('a'), 'div')
export function $parent(element: Element, tagName: string) : Element {
	if (!element.parentNode || element.parentNode.nodeType !== 1) { //Element type
		return;
	}
    
    let parent = <Element> element.parentNode;

	if (parent.tagName.toLowerCase() === tagName.toLowerCase()) {
		return parent;
	}

	return $parent(parent, tagName);
}
