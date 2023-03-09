import {createStore} from 'vuex'
import Cars from "@/store/modules/Cars/Cars";
import Main from "@/store/modules/Main/Main";


const store_admin = createStore({
    modules: {
        main: Main,
        cars: Cars,
    }
})

export default store_admin