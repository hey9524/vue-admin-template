<!--
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-03 11:55:24
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\winning\index.vue
-->
<template>
  <div class="bullet">
    <div style="margin-bottom: 15px;">
      <el-input placeholder="请输入视频id" v-model="page.videoId" class="input-with-select">
        <el-button @click="init" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

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
    getWinningList
  } from '@/api'
  import TablePagination from '@/components/TablePagination'
  import {tableHeader} from '@/utils/header' 
  export default {
    name: 'Winning',
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
          pageSize: 10,
          videoId: ''
        },
        paginationTotal: 0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
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
        } = await getWinningList(this.page)
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

    .input-with-select {
      width: 300px;
    }
  }

</style>
