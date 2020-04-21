<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" style="padding: 1% 8%;">
            <b-navbar-brand href="#">Orion-Store</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'Home' }" href="#">Shop</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form @submit.prevent="">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Banana"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item :to="{ path: '/signin' }" href="#">Sign In</b-dropdown-item>
                        <b-dropdown-item href="#">My Cart</b-dropdown-item>
                        <b-dropdown-item @click.prevent="signout" href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        signout(){
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>