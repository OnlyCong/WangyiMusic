<script>
    export default{
        name:"Content",
        data(){
            return {

            }
        },
        props:{
            showContent:{
                type:Array,
                default: function(){
                    return []
                }
            }
        },
        render(){
            return (
                <div>
                   {
                    this.showContent.map((item, index) => {
                        return item.isActive ? item.$slots.default : ""
                   })
                   } 
                </div>
            )
        }
    }
</script>

<style scoped></style>