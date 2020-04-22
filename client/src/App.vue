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
        
    },
    methods: {
        checkSession(){
            const token = localStorage.getItem('token')
            if (token) {
                if (this.$route.name == 'Home') {
                    this.$router.push({ name: 'Home' })
                }
            }
        }
    }
}
</script>
