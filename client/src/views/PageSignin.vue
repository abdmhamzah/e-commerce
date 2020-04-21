<template>
    <div>
        <div class="align-self-center" style="margin-top: 3%">
            <div class="d-flex justify-content-around" style="margin-top: 3%">
                <h1>Signin Form</h1>
            </div>
            <br>
            <div class="d-flex justify-content-around">
                <form @submit.prevent="signin" style="width: 25%;">
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_email" type="email" class="form-control" placeholder="Enter Email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_password" type="password" class="form-control" placeholder="Enter Password" required>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="form-row">
                            <div class="col mb-3">
                                <button type="submit" class="btn btn-outline-primary my-2 my-sm-0" style="margin-right: 10px;">Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="form-row">
                            <div class="col mb-3">
                                <a @click.prevent="toSignup" href="#">Didn't have any account? Signup Here</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageSignin',
    data(){
        return {
            input_email: null,
            input_password: null,
        }
    },
    methods: {
        signin(){
            this.$router.push({ name: 'Home' })
        },
        toSignup(){
            this.$router.push({ path: 'signup' })
        }
    }
}
</script>