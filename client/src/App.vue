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
        console.log(this.$store.state.role)
        console.log(this.$store.state.isLogin)
        console.log(this.$store.state.userName)
    },
    methods: {
        checkSession(){
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if (token) {
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
