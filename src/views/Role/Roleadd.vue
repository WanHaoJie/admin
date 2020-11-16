<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/role' }"
        >角色管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ toptitle }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[]"
          :default-checked-keys="checkAll"
          :props="defaultProps"
          check-strictly
          ref="mystree"
        >
        </el-tree>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          buttontitle
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll:[],//储存回显显示的节点的id
      defaultProps: {
        children: "children",
        label: "title",
      },
      data: [],
      buttontitle: "", //底部名称
      toptitle: "", //面包屑名称
      id: "", //存储要修改的id
      //   menuList: [], //储存菜单列表的数据
      ruleForm: {
        rolename: "", //角色名称
        menus: [], //角色权限
        status: false, //状态  1 正常   2 禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this)
    //调用获取菜单列表的方法
    this.getMenuList();
    //获取传过来的id
    this.id = this.$route.query.id;

    if (this.id) {
      //如果有id,说明是通过编辑过来的
      this.toptitle = "角色编辑";
      this.buttontitle = "修改";

      //并且调用接口，做到回显功能
      this.$http.get("/roleinfo", { id: this.id }).then((res) => {
        // console.log(res)
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
        };
        this.checkAll = this.ruleForm.menus.split(',');
      });
    } else {
      //反之，说明是通过添加过来的
      this.toptitle = "角色添加";
      this.buttontitle = "添加";
    }
  },
  methods: {
    // 定义获取菜单列表的方法
    getMenuList() {
      this.$http.get("/menulist", { istree: true }).then((res) => {
        // console.log(res)
        this.data = res.data.list;
      });
    },

    //添加事件中，传过来的是一个ruleForm字符串，所以this.$refs[formName]这里用中括号
    submitForm(formName) {
      // validate验证必传的项正不正确
      this.$refs[formName].validate((valid) => {
        //valid提交成功，
        if (valid) {
          // alert("submit!");
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          // 调用getCheckedKeys方法，获取选中的节点的key的值组成的数组，赋值给ruleForm里的menus。
          this.ruleForm.menus = this.$refs.mystree.getCheckedKeys();

          if (this.id) {
            this.$http
              .post("/roleedit", { ...this.ruleForm, id:this.id })
              .then((res) => {
                // console.log(res)
                if (res.data.code == 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  setTimeout(() => {
                    this.$router.push("/home/role");
                  }, 500);
                }
              });
          } else {
            
            // console.log(this.ruleForm.menus)
            //调用菜单添加接口
            this.$http.post("/roleadd", this.ruleForm).then((res) => {
              //如果添加成功，就跳转到菜单列表页
              if (res.data.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.back();
                }, 500);
              }
              // console.log(res)
            });
          }
        } else {
          //否则失败
          // console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
@import "../../style/Role.css";
</style>