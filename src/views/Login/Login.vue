<template>
	<div id="Login">
		<!-- 登陆按钮 -->
		<div class="btn" @click="change">登陆</div>
		
		<!-- 登陆表单界面 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="Input animated" v-show="flag" >
				<!-- 用户名输入框 -->
				<el-input v-model="nameinput" placeholder="请输入用户名" class="name"></el-input>
				<!-- 密码输入框 -->
				<el-input placeholder="请输入密码" v-model="psdinput" show-password class="psd"></el-input>
				<!-- 登陆按钮 -->
				<el-button type="primary" class="btnn" @click="Login">登陆</el-button>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				flag:false,//控制登陆界面出现和隐藏的变量
				nameinput:'',//用户名输入框
				psdinput:'',//密码输入框
			}
		},
		methods:{
			//控制登陆界面出现和隐藏
			change(){
				this.flag = !this.flag;
			},
			//登陆
			Login(){
				this.$http.post('/userlogin', { username:this.nameinput, password:this.psdinput }).then((res) => {
					// console.log(res)
					if(res.data.code == 200){
						//把登陆信息持久的储存在vuex中
						this.$store.commit('getUser', res.data.list);
						this.$message({
							message: "登陆成功",
							type: "success",
						});
						setTimeout(() => {
							this.$router.push('/');
						},1000)
					} else {
						this.$message.error('用户名或密码错误');
					}
				})
			}
		}
	}
</script>

<style scoped>
@import url("../../style/Login.css");
</style>
