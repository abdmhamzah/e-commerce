<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
    name: 'App',
    components: {
        Navbar
    },
    created(){
        this.checkSession()
    },
    methods: {
        checkSession(){
            const token = localStorage.getItem('token')
            const name = localStorage.getItem('name')
            const role = localStorage.getItem('role')
            // console.log(role);
            // console.log(name);
            if (token) {
                this.$store.commit('SET_LOGIN', true)
                this.$store.commit('SET_NAME', name)
                this.$store.commit('SET_ROLE', role)
                if (role == 'user' || role == null) {
                    if (this.$route.name != 'Home') {
                        this.$router.push({ name: 'Home' })
                    }
                } else if (role == 'admin') {
                    if (this.$route.name != 'PageAdmin') {
                        this.$router.push({ name: 'PageAdmin'})
                    }
                }
            } else {
                if (this.$route.name != 'Home') {
                    this.$router.push({ name: 'Home' })
                }
            }
        },
    }
}
</script>
