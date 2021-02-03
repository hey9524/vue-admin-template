<!--
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-03 21:10:31
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\index.vue
-->
<template>
  <div class="bullet">
    <el-button @click="bulletChat" type="primary">改为弹幕</el-button>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;margin-bottom: 20px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column v-for="(item, i) in tableHeader" :key="i" :label="item.label" :prop="item.props">
        <template slot-scope="props">

          <div v-if="item.props === 'state'">{{props.row[item.props] == 1 ? '显示' : '删除'}}</div>
          <div v-else-if="item.props === 'bulletChat'">{{props.row[item.props] == 1 ? '是' : '否'}}</div>
          <div v-else>{{props.row[item.props]}}</div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageIndex"
      :page-sizes="[10, 50, 100, 200]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="paginationTotal">
    </el-pagination>

  </div>
</template>

<script>
  import {
    getCommentList,
    changeBulletChat
  } from '@/api'
  import TablePagination from '@/components/TablePagination'
  import {
    tableHeader
  } from '@/utils/header'
  export default {
    name: 'BulletChat',
    components: {
      TablePagination
    },
    data() {
      return {
        tableData: [],
        tableHeader,
        multipleSelection: [],
        page: {
          pageIndex: 1,
          pageSize: 10
        },
        paginationTotal: 0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async bulletChat() {
        const {
          multipleSelection
        } = this
        if (multipleSelection.length < 1) return this.$message.warning('请勾选需要修改的评论')
        if (multipleSelection.length > 1) return this.$message.warning('请勾选一条数据进行修改')

        this.$alert('确认修改?', '改为弹幕', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async action => {
          const {
            success
          } = await changeBulletChat(multipleSelection[0].id)
          if (success) {
            this.$message.success('修改成功')
            this.init()
          }
        })
      },
      handleSizeChange(val) {
        this.page.pageSize = val
        this.init()
      },
      handleCurrentChange(val) {
        this.page.pageIndex = val
        this.init()
      },
      async init() {
        const {
          data,
          success
        } = await getCommentList(this.page)
        if (success) {
          this.tableData = data.records
          this.paginationTotal = data.total
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      }
    }
  }

</script>

<style lang="scss" scoped>
  .bullet {
    padding: 20px;
  }

</style>
