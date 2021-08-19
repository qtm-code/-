<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>  
  </div>
</template>
<script>
import Loading from './../components/Loading'
  export default{
    name:'alipay',
    components:{
      Loading
    },
    data(){
      return{
        orderId:this.$route.query.orderId,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        this.axios.post('/pay',{//去后台拉接口需要提供的信息
          orderId:this.orderId,
          orderName:'Vue高仿小米商城',
          amount:0.01,
          payType:1
        }).then((res)=>{//拿到数据
          this.content=res.content;
          setTimeout(()=>{
            document.forms[0].submit();
          },100)//
        })
      }
    }
  }
</script>