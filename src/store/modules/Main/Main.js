const Main = ({
    namespaced: true,
    state: () => ({
        props: null,
    }),
    getters: {
        getProps(state) {
            return state.props
        }
    },
    mutations: {
        setProps(state, value) {
            state.props = value
        }
    },
    actions: {},
})

export default Main