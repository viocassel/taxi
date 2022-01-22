import { Transition } from '../../src'

export default class OverrideTransition extends Transition {
	onLeave({ from, trigger, done }) {
		console.log('override transition leave')

		done()
	}

	onEnter({ from, to, trigger, done }) {
		console.log('override transition enter')

		done()
	}
}
