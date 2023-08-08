<script>
    export default{
        name:"Tab",
        props:{
            label:{
                type:String,
                default:'tab'
            },
            index:{
                type:String,
                default:'1'
            },
        },
        mounted(){
            // this.$parent.showContent.push(this.$slots.default)
            this.$parent.showContent.push(this)//push了整个组件，接受那边可以获取该组件的所有属性
        },
        computed:{
            isActive(){
                return this.$parent.defaultActiveKey === this.index
            }
        },
        render(){
            const classStyle = {
                tab: true,
                active:this.isActive
            }
            return (
                <li onClick={ this.clickTab } class={ classStyle }>{ this.label }</li>
            )
        },
        methods:{
            clickTab(){
                // this.$parent.defaultActiveKey = this.index//不可直接改变
                this.$parent.updateDafaultActiveKey(this.index)//子可以通过this.$parent调用父的所有属性

            }
        }
    }
</script>

<style scoped>
    .tab {
        flex: 1;
        list-style: none;
        line-height: 40px;
        margin-right: 30px;
        position: relative;
        text-align: center;
    }

    .tab.active {
        border-bottom: 2px solid blue;
    }
</style>