import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'
import router from '../router'
const url = 'https://aqueous-mesa-53283.herokuapp.com'
// const url = 'http://localhost:3000'

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
        SET_LIST_CART(state, carts){
            state.cart_list = carts
        },
        ADD_NEW_PRODUCT(state, newProduct){
            state.list_product.push(newProduct)
        },
        ADD_TO_CART(state, product){
            state.cart_list.push(product)
        },
        TO_EDIT_PRODUCT(state, dataToEdit){
            state.toEdit = dataToEdit
        },
        TO_DETAIL_PRODUCT(state, dataToDetail){
            state.toDetail = dataToDetail
        },
    },
    actions: {
        signup(contex, newUser){
            if (newUser.password != newUser.confirm_password) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Confirm Password must be the same with Password',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                axios({
                    url: `${url}/users/signup`,
                    method: 'POST',
                    data: newUser
                })
                .then(() => {
                    console.log('berhasil signup');
                    router.push({ path: 'signin' })
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Signed Up Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Signed Up Failed, Input Your Data Carefully',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
                console.log(userSignin);
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
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Signed In Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Invalid Email / Password!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        signout({commit}){
            localStorage.clear()
            commit('SET_NAME', null)
            commit('SET_LOGIN', false)
            commit('SET_ROLE', null)
            router.push({ name: 'Home' })
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Signout Successfully!',
                showConfirmButton: false,
                timer: 1500
            })
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
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Product added Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
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
                method: 'PUT',
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
                // console.log(updated_list);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Product Edited Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
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
        addToCart({commit}, id){
            let token = localStorage.getItem('token')
            if (token) {
                axios({
                    url: `${url}/carts/${id}`,
                    method: 'POST',
                    data: { qty: 1 },
                    headers: {
                        token: token
                    }
                })
                    .then(toAddCart => {
                        console.log(toAddCart.data.newCart)
                        commit('ADD_TO_CART', toAddCart.data.newCart)
                        // router.push({ name: 'PageCart' })
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Your Cart has been added!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You must be Signin First!'
                })
            }
        },
        getCarts({commit}){
            let token = localStorage.getItem('token')
            axios({
                url: `${url}/carts`,
                method: 'GET',
                headers: {
                    token: token
                }
            })
                .then(carts => {
                    console.log(carts.data);
                    commit('SET_LIST_CART', carts.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteFromCart({state, commit}, id){
            console.log(id)
            let token = localStorage.getItem('token')
            axios({
                url: `${url}/carts/${id}`,
                methods: 'DELETE',
                headers: {
                    token: token
                }
            })
                .then(deleted => {
                    let undeleted = []
                    state.cart_list.forEach(el => {
                        if (el.id != id) {
                            undeleted.push(el)
                        }
                    })
                    commit('SET_LIST_CART', undeleted)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        toCheckout({state, commit}){
            let token = localStorage.getItem('token')
            axios({
                url: `${url}/carts`,
                method: 'DELETE',
                headers: {
                    token: token
                }
            })
                .then(checkedOut => {
                    commit('SET_LIST_CART', [])
                    router.push({ name: 'Home' })
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Thank You for your Purchase',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    modules: {
    }
})
