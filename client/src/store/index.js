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
        userName: null,
        role: null,
        isLogin: false,
        list_product: [],
        toEdit: {},
        toDetail: {},
        cart_list: []
    },
    mutations: {
        SET_NAME(state, name){
            state.userName = name
        },
        SET_LOGIN(state, login){
            state.isLogin = login
        },
        SET_ROLE(state, role){
            state.role = role
        },
        SET_LIST_PRODUCT(state, products){
            state.list_product = products
        },
        ADD_NEW_PRODUCT(state, newProduct){
            state.list_product.push(newProduct)
        },
        TO_EDIT_PRODUCT(state, dataToEdit){
            state.toEdit = dataToEdit
        },
        TO_DETAIL_PRODUCT(state, dataToDetail){
            state.toDetail = dataToDetail
        },
        ADD_TO_CART(state, product){
            state.cart_list.push(product)
        }
    },
    actions: {
        signup(contex, newUser){
            if (newUser.password != newUser.confirm_password) {
                console.log('Confirm Password must be the same with Password')
            } else {
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
        signin({commit}, user){
            // console.log(user);
            axios({
                url: `${url}/users/signin`,
                method: 'POST',
                data: user
            })
            .then(userSignin => {
                // console.log(userSignin.data.payload);
                localStorage.setItem('token', userSignin.data.payload.token)
                localStorage.setItem('name', userSignin.data.payload.name)
                localStorage.setItem('email', userSignin.data.payload.email)
                localStorage.setItem('role', userSignin.data.payload.role)
                commit('SET_NAME', userSignin.data.payload.name)
                commit('SET_ROLE', userSignin.data.payload.role)
                commit('SET_LOGIN', true)
                if (userSignin.data.payload.role == 'user') {
                    router.push({ name: 'Home' })
                } else {
                    router.push({ name: 'PageAdmin' })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        signout({commit}){
            localStorage.clear()
            commit('SET_NAME', null)
            commit('SET_LOGIN', false)
            commit('SET_ROLE', null)
            router.push({ name: 'Home' })
        },
        getProducts({commit}){
            axios({
                url: `${url}/products`,
                method: 'GET'
            })
            .then(products => {
                commit('SET_LIST_PRODUCT', products.data.payload)
            })
            .catch(err => {
                console.log(err)
            })
        },
        addProduct({commit}, newProduct){
            let token = localStorage.getItem('token')
            axios({
                url: `${url}/products`,
                method: 'POST',
                data: newProduct,
                headers: {
                    token: token
                }
            })
            .then(product => {
                commit('ADD_NEW_PRODUCT', product.data.payload)
                router.push('PageAdmin')
            })
            .catch(err => {
                console.log(err)
            })
        },
        editProduct({commit, state}, editedData){
            let id = editedData.id
            let token = localStorage.getItem('token')
            console.log(editedData);
            
            axios({
                url: `${url}/products/${id}`,
                methods: 'PUT',
                data: editedData,
                headers: {
                    token: token
                }
            })
            .then(() => {
                let updated_list = []
                state.list_product.forEach(el => {
                    if (el.id == id) {
                        el = editedData
                    }
                    updated_list.push(el)
                })
                console.log(updated_list);
                
                commit('SET_LIST_PRODUCT', updated_list)
                commit('TO_EDIT_PRODUCT', {})
                router.push({ name: 'PageAdmin' })
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteProduct({commit, state}, id){
            let token = localStorage.getItem('token')
            axios({
                url: `${url}/products/${id}`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            })
            .then(() => {
                let undeleted = []
                state.list_product.forEach(el => {
                    if (el.id != id) {
                        undeleted.push(el)
                    }
                })
                commit('SET_LIST_PRODUCT', undeleted)
            })
        },
        addToCart({commit}, product){
            let token = localStorage.getItem('token')
            if (token) {
                commit('ADD_TO_CART', product)
                router.push({ name: 'PageCart' })
            } else {
                console.log('Login dulu');
            }
        },
        getCart({commit}){
            
        }
    },
    modules: {
    }
})
