import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
const url = 'http://localhost:3000'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
    },
    actions: {
        signup(contex, newUser){
            if (newUser.password != newUser.confirm_password) {
                console.log('Confirm Password must be the same with Password')
            } else {
                console.log(newUser)
                axios({
                    url: `${url}/users/signup`,
                    method: 'POST',
                    data: newUser
                })
                .then(() => {
                    console.log('berhasil signup');
                    router.push({ path: 'signin' })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        signin(contex, user){
            console.log(user);
            axios({
                url: `${url}/users/signin`,
                method: 'POST',
                data: user
            })
            .then(userSignin => {
                localStorage.setItem('token', userSignin.data.payload.token)
                localStorage.setItem('email', userSignin.data.payload.email)
                localStorage.setItem('role', userSignin.data.payload.role)
                router.push({ name: 'Home' })
            })
            .catch(err => {
                comsole.log(err)
            })
        },
    },
    modules: {
    }
})
