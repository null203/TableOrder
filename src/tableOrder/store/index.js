import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: '',
		arrowFlag: false,
		guestNum: 1,
	},
	mutations: {
		setTitle(state, title) {
			state.title = title;
		},
		setArrowFlag(state, flag) {
			state.arrowFlag = flag;
		},
		setGuestNum(state, guestNum) {
			state.guestNum = guestNum;
		},
	}
})
