<template>
  <!-- <div class="Home"> -->
  <el-container>
    <el-aside width="200px">
      <Navbar />
    </el-aside>
    <el-container>
      <el-header>
        <!-- <el-popconfirm
          confirmButtonText="确定"
          cancelButtonText="取消"
          icon="el-icon-info"
          iconColor="gray"
          title="退出登陆"
          @onConfirm="sure"
        >
          <el-button slot="reference">
            <i class="el-icon-s-custom"></i>
            {{ Header }}
          </el-button>
        </el-popconfirm> -->
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          icon-color="red"
          title="返回登陆"
          @confirm="sure"
        >
          <el-button slot="reference">
            <i class="el-icon-s-custom"></i>
            {{ Header }}
          </el-button>
        </el-popconfirm>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import Navbar from "../../components/Navbar/Navbar";
export default {
  components: {
    Navbar,
  },
  methods: {
    sure(){
      this.$router.push('/login');
    }
  },
  computed: {
    Header() {
      return this.$store.state.user.username;
    },
  },
};
</script>

<style scoped>
@import url("../../style/Home.css");
</style>
