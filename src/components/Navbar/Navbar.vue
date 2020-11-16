<template>

    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <h3>后台管理系统</h3>

        <!-- 首页 -->
        <el-menu-item>
          <i class="el-icon-s-home"></i>
          <span slot="title" @click="goIndex">首页</span>
        </el-menu-item>

        <!-- 系统设置 -->
        <el-submenu :index="index.toString()" v-for="(item, index) in getMenus" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
            <el-menu-item v-for="(val) in getMenus[index].children" :key="val.id" :index="val.url">{{ val.title }}</el-menu-item>
        </el-submenu>

        <!-- 商城管理
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商城管理</span>
          </template>
            <el-menu-item index="2-1">商品分类</el-menu-item>
            <el-menu-item index="2-2">商品规格</el-menu-item>
            <el-menu-item index="2-3">商品管理</el-menu-item>
            <el-menu-item index="2-4">会员管理</el-menu-item>
            <el-menu-item index="2-5">轮播图管理</el-menu-item>
            <el-menu-item index="2-6">秒杀活动</el-menu-item>
        </el-submenu> -->

      </el-menu>
    </el-col>

</template>

<script>
export default {
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    //去到首页
    goIndex(){
        this.$router.push('/home/index');
    }
  },
  computed: {
    getMenus() {
      return this.$store.state.user.menus;
    }
  },

};
</script>

<style scoped>
@import '../../style/Navbar.css';
</style>