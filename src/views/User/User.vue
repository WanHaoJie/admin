<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="用户编号" sortable width="250">
      </el-table-column>

      <el-table-column prop="username" label="用户名" sortable width="250">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色" sortable width="250">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.rolename }}</el-tag>
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
      this.$http.get("/userlist", { size:10, page:1 }).then((res) => {
        // console.log(res)
        this.tableData = res.data.list;
        // console.log(this.tableData)
      });
    },
    //去菜单添加页面
    goAdd() {
      this.$router.push("user/add");
    },
    //编辑方法
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("user/edit?id=" + row.uid);
    },
    //删除方法
    del(id) {
        // console.log(id)
      this.$http.post('/userdelete', { uid:id }).then((res) => {
        console.log(res)
        // console.log(row)
        //调用获取菜单列表的方法
        if(res.data.code == 200){
            this.getMenuList();
            this.$message({
                message: "删除成功",
                type: "success",
            });
        }
      })
    },
  },
};
</script>

<style scoped>
@import "../../style/Menu.css";
</style>