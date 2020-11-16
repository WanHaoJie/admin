<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加 /修改按钮 -->
    <el-button type="primary" class="btn" @click="goAdd">添加</el-button>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="150">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" sortable width="150">
      </el-table-column>

      <el-table-column prop="price" label="商品价格" sortable width="150">
      </el-table-column>

      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        width="150"
      >
      </el-table-column>

      <el-table-column prop="img" label="图片" sortable width="300">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品" sortable width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.isnew | isNewHot }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" sortable width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.ishot | isNewHot }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFormat }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <el-popconfirm title="确定要删除吗？" @onConfirm="del(scope.row.id)">
            <!-- <el-button slot="reference" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" :page-size="3" :current-page="page" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //储存菜单列表的数据
      total:0,
      page:1,
    };
  },
  filters: {
    isNewHot(status) {
      switch (status) {
        case 1:
          return "是";
        //   break;
        case 2:
          return "否";
        //   break;
      }
    },
  },
  mounted() {
    this.$http.get('/goodscount').then((res) => {
        // console.log(res)
        this.total = res.data.list[0].total
    })
      
    //调用获取菜单列表的方法
    this.getMenuList();
  },
  methods: {
      currentChange(page){
        //   console.log(page)
          this.page = page;
          this.getMenuList();
      },
    //定义获取菜单列表的方法
    getMenuList() {
      this.$http.get("/goodslist", { size: 3, page: this.page }).then((res) => {
        // console.log(res)
        this.tableData = res.data.list;
      });
    },
    //去菜单添加页面
    goAdd() {
      this.$router.push("goods/add");
    },
    //编辑方法
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("goods/edit?id=" + row.id);
    },
    //删除方法
    del(id) {
      this.$http.post("/goodsdelete", { id }).then((res) => {
        console.log(res);
        //调用获取菜单列表的方法
        this.getMenuList();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
    },
  },
};
</script>

<style scoped>
@import "../../style/Goods.css";
</style>