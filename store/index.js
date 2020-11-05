export const state = () => ({
	title: "Scribeless"
})
export const mutations = {
	SET_TITLE(state, title) {
		title && title.length ? state.title = title : state.title = "Scribeless"
	}
}
export const actions = {
	setTitle({ commit }, title) {
		commit('SET_TITLE', title)
	}
}
export const getters = {
	getTitle: state => state.title
}