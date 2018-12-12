<template>
    <div class="form-body without-side">
        <div class="website-logo">
                <div class="logo">
                    <img class="logo-size" src="" alt="">
                </div>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="images/graphic3.svg" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <form>
                            <input class="form-control" type="text" name="username" placeholder="E-mail Address" required v-model="user.email">
                            <input class="form-control" type="password" name="password" placeholder="Password" required v-model="user.password">
                            <div class="form-button">
                                <a href="#" class="ibtn" @click="login()">LOGIN</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
          email: "",
          password: ""
      }
    }
  },

  methods: {
      login() {
         //this.$eventBus.$emit("loadingStatus",true);

         this.$axios.post("http://localhost:8000/api/users/login", this.user)
            .then(res=> {
               // this.$eventBus.$emit("loadingStatus",false);

                if(res.data.error){
                    this.$iziToast.error({
                        title: 'Error!',
                        message: res.data.message
                    });
                }else{
                    localStorage.setItem("token", res.data.token);
                    this.$router.push({name: "dashboard"})
                }
            })
      }
  }
}
</script>

<style>
</style>
