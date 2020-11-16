<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/specs' }"
        >规格列表</el-breadcrumb-item
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
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in ruleForm.attrs"
        :label="'规格属性' + (index + 1)"
        :key="index"
        :rules="{
          message: '规格属性不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="item.value"></el-input
        ><el-button @click.prevent="removeDomain(item)" v-if="index != 0" class="add">删除</el-button>
        <el-button @click="addDomain" v-if="index == 0" class="add">新增域名</el-button>
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
    //   dynamicValidateForm: {
    //     domains: [
    //       {
    //         value: "",
    //       },
    //     ],
    //     email: "",
    //   },

      buttontitle: "", //底部名称
      toptitle: "", //面包屑名称
      id: "", //存储要修改的id
      menuList: [], //储存菜单列表的数据
      ruleForm: {
        specsname:'',
        attrs:[
            {
                value:''
            }
        ],
        status: false, //状态  1正常  2禁用  number类型
      },
      rules: {
        specsname: [{ required: true, message: "请输入规格名称", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // console.log(this)
    //调用获取菜单列表的方法
    // this.getMenuList();
    //获取传过来的id
    this.id = this.$route.query.id;

    if (this.id) {
      //如果有id,说明是通过编辑过来的
      this.toptitle = "规格编辑";
      this.buttontitle = "修改";

      //并且调用接口，做到回显功能
      this.$http.get("/specsinfo", { id: this.id }).then((res) => {
        let { status, attrs } = res.data.list[0];
        let attrs_new = [];
        for(let i = 0; i < attrs.length; i++){
            attrs_new.push({'value':attrs[i]})
        }
        // console.log(res)
        this.ruleForm = {
          ...res.data.list[0],
          status: status == 1 ? true : false,
          attrs:attrs_new
        };
      });
    } else {
      //反之，说明是通过添加过来的
      this.toptitle = "规格添加";
      this.buttontitle = "添加";
    }
  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: "",
      });
    },

    //定义获取菜单列表的方法
    // getMenuList() {
    //   this.$http.get("/menulist", { istree: true }).then((res) => {
    //     // console.log(res)
    //     this.menuList = res.data.list;
    //   });
    // },

    //添加事件中，传过来的是一个ruleForm字符串，所以this.$refs[formName]这里用中括号
    submitForm(formName) {
      // validate验证必传的项正不正确
      this.$refs[formName].validate((valid) => {
        //valid提交成功，
        if (valid) {
          // alert("submit!");
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;

        this.ruleForm.attrs = this.ruleForm.attrs.map(item => {
            return item.value
        }).join(',');
        // this.ruleForm.attrs = this.ruleForm.attrs.
        // console.log(this.ruleForm.attrs);

          if (this.id) {
            this.$http
              .post("/specsedit", { ...this.ruleForm, id: this.id })
              .then((res) => {
                // console.log(res)
                if (res.data.code == 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  setTimeout(() => {
                    this.$router.push("/home/specs");
                  }, 500);
                }
              });
          } else {
            //调用菜单添加接口
            this.$http.post("/specsadd", this.ruleForm).then((res) => {
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
@import "../../style/Specs.css";
</style>