<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/home/goods' }"
        >商品列表</el-breadcrumb-item
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

    <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择" @change="getfirstId">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in firstdata"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in seconddata"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="arr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="请选择" @change="getSpecsId">
          <el-option
            :label="item.specsname"
            :value="item.id"
            v-for="item in specsData"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in specssecondData"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
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
      arr:[],
      buttontitle: "", //底部名称
      toptitle: "", //面包屑名称
      id: "", //存储要修改的id
      firstdata: [], //储存菜单列表的数据
      seconddata:[],
      specsData:[],
      specssecondData:[],
      img:'',
      ruleForm: {
        first_cateid:'',//一级分类
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        description:'',
        specsid:'',
        specsattr:'',
        isnew:'',
        ishot:'',
        status: false, //状态  1正常  2禁用  number类型
      },
      rules: {
        first_cateid: [{ required: true, message: "请选择一级分类", trigger: "change" }],
        second_cateid: [{ required: true, message: "请选择二级分类", trigger: "change" }],
        goodsname: [{ required: true, message: "请输入商品名称", trigger: "change" }],
      },
    };
  },
  mounted() {

      this.$http.get('specslist').then((res) => {
        //   console.log(res)
        this.specsData = res.data.list;
      })
    // console.log(this)
    //调用获取一级分类的方法
    this.getfirstdata();
    //获取传过来的id
    this.id = this.$route.query.id;

    if (this.id) {
      //如果有id,说明是通过编辑过来的
      this.toptitle = "商品编辑";
      this.buttontitle = "修改";

      //并且调用接口，做到回显功能
      this.$http.get("/goodsinfo", { id: this.id }).then((res) => {
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
        };
        this.arr.push({
            url:'http://localhost:3000' + res.data.list.img
        })
        this.getfirstId(res.data.list.first_cateid)
      });
    } else {
      //反之，说明是通过添加过来的
      this.toptitle = "商品添加";
      this.buttontitle = "添加";
    }
  },
  methods: {
      getSpecsId(id){
          this.$http.get('specsinfo', { id }).then((res) => {
            //   console.log(res)
                this.specssecondData = res.data.list[0].attrs;
          })
      },

    getfirstId(id){
        // console.log(id)
        this.$http.get("/catelist", { pid:id }).then((res) => {
            // console.log(res)
            this.seconddata = res.data.list;
        });
    },
    change(file){
      // console.log(file);
      // console.log(fileList);
      this.img = file.raw;
    },
    //定义获取一级分类的方法
    getfirstdata() {
      this.$http.get("/catelist", { pid:0 }).then((res) => {
        // console.log(res)
        this.firstdata = res.data.list;
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
            let form = new FormData();
            for(let key in this.ruleForm){
                form.append(key, this.ruleForm[key])
            }
            if(this.img){
                form.append('img', this.img);
            }

          if (this.id) {
              form.append('id', this.id);
            this.$http.post('/goodsedit', form).then((res) => {
              // console.log(res)
              if(res.data.code == 200){
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.push('/home/goods');
                }, 500);
              }
            })
          } else {
            //调用菜单添加接口
            this.$http.post("/goodsadd", form).then((res) => {
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
@import "../../style/Menu.css";
</style>