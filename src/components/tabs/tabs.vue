<script>
    import Content from './content'
   export default{
        name:'Tabs',
        data(){
            return {
                showContent:[]
            }
        },
        components:{
            Content
        },
        //注意 props 属性里的值不可以直接被改变
        props:{
            defaultActiveKey:{
                type:String,
                default:'1'
            },
        },
        //render 渲染的时候，插槽直接使用 this.$slots.default
        //插槽是读取嵌套规则的结构
        render(){
            return (
                <div>
                  <ul class="tabs-header">{ this.$slots.default }</ul>
                  <Content showContent={ this.showContent }></Content>
                </div>
            )               
        },
        methods:{
            updateDafaultActiveKey(index){
                this.$emit('callback', index)//子向父通过监听 callback 函数传递数据
                // this.$parent.updateKey(index)//也可以直接调用父级的属性
            }
        }
   } 
</script>

<style lange="less" scoped>
    .tabs-header {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        border-bottom: 2px solid #ededed;
    }
</style>