<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" style="padding: 1% 8%;">
            <b-navbar-brand href="#">Orion-Store</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="role == 'user' || role == null">
                    <b-nav-item :to="{ name: 'Home' }" href="#">Catalog</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form v-if="role == 'user' || role == null" @submit.prevent="">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Banana"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-if="!isLogin" v-slot:button-content>
                            <em>User</em>
                        </template>
                        <template v-else v-slot:button-content>
                            <em>{{ userName }}</em>
                        </template>
                        <div v-if="!isLogin">
                            <b-dropdown-item :to="{ path: '/signin' }" href="#">Sign In</b-dropdown-item>
                        </div>
                        <div v-else>
                            <b-dropdown-item v-if="role == 'user'" href="#">My Cart</b-dropdown-item>
                            <b-dropdown-item @click.prevent="signout" href="#">Sign Out</b-dropdown-item>
                        </div>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        isLogin(){
            return this.$store.state.isLogin
        },
        userName(){
            return this.$store.state.userName
        },
        role(){
            return this.$store.state.role
        }
    },
    methods: {
        signout(){
            this.$store.dispatch('signout')
        }
    }
}
</script>