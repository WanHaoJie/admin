<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="编号" sortable width="250">
      </el-table-column>

      <el-table-column prop="title" label="轮播图标题" sortable width="250">
      </el-table-column>

      <el-table-column prop="img" label="图片" sortable width="250">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="250">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFormat }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="edit" size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <el-popconfirm title="确定要删除吗？" @onConfirm="del(scope.row.id)">
            <!-- <el-button slot="reference" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button
              size="mini"
              type="danger"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //储存菜单列表的数据
    };
  },
  mounted() {
    //调用获取菜单列表的方法
    this.getMenuList();
  },
  methods: {
    //定义获取菜单列表的方法
    getMenuList() {
      this.$http.get("/bannerlist").then((res) => {
        // console.log(res)
        this.tableData = res.data.list;
      });
    },
    //去菜单添加页面
    goAdd() {
      this.$router.push("banner/add");
    },
    //编辑方法
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("banner/edit?id=" + row.id);
    },
    //删除方法
    del(id) {
      this.$http.post('/bannerdelete', { id }).then((res) => {
        console.log(res)
        //调用获取菜单列表的方法
        this.getMenuList();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      })
    },
  },
};
</script>

<style scoped>
@import "../../style/Menu.css";
img {
  width: 200px;
  height: 100px;
}
</style>