<!-- <template>
    <div>
        <input type="text" v-model="phone">
        <input type="password" v-model="code">
        <button @click="sentcode">发送验证码</button>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        name: 'Mine',
        data(){
            return {
                phone: '',
                code: '',
            }
        },
        methods:{
            sentcode(){
                this.$api.sent({
                    phone:this.phone
                }).then(res => {
                    console.log(res)
                })
            },
            login(){
                this.$api.verify({
                    phone: this.phone,
                    captcha: this.code
               }).then(res => {
                    console.log(res)
               }) 
            }
        }
    }
</script>

<style lang="less" scoped>
    input{
        border: 1px solid #000;
    }    
</style> -->