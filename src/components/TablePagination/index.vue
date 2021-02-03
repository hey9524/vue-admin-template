<template>
  <div class="sys-table">
    <slot></slot>
    <div class="box">
      <div class="sys-table-pagination">
        <template>
          <el-pagination
            :layout="pageLayout"
            @size-change="sizeChange"
            @current-change="pageChange"
            :total="paginationTotal"
            :class="align"
            :page-sizes="getPageSizes"
            :page-size="pageSize"
          ></el-pagination>
        </template>
      </div>
      <div class="sys-table-right">
        <!-- <div class="sys-table-right-page">共{{pageCount}}页</div> -->
        <div class="sys-table-right-count">当前显示{{showNum}}条/共{{paginationTotal}}条</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePagination",
  props: {
    pagination: Boolean,
    paginationAlign: String,
    pageSize: {
      type: Number,
      default: function() {
        return 10;
      }
    },
    paginationTotal: {
      type: Number,
      default: function() {
        return 10;
      }
    },
    sizeChange: {
      type: Function,
      default: function() {
        return null;
      }
    },
    pageChange: {
      type: Function,
      default: function() {
        return null;
      }
    },
    pageLayout: {
      default: function() {
        return "prev, pager, next"; // jumper  total sizes
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    align() {
      let res;
      switch (this.paginationAlign) {
        case "right":
          res = "textR";
          break;
        case "center":
          res = "textC";
          break;
        default:
          res = "";
      }
      return res;
    },
    getPageSizes() {
      if (this.paginationTotal <= 10) {
        return [10];
      }
      return [10, 20, 40, 50, 100];
    },
    showNum() {
      return this.paginationTotal > this.pageSize
        ? this.pageSize
        : this.paginationTotal;
    },
    pageCount() {
      const { paginationTotal, pageSize, getPageSizes } = this;
      let num = 0;
      if (paginationTotal === 0) {
        num = 0;
      } else if (paginationTotal / pageSize <= 1) {
        num = 1;
      } else {
        num = parseInt(paginationTotal / pageSize);
      }

      return num;
    }
  }
};
</script>
<style lang="scss" scoped>
.sys-table {
  padding-top: 10px;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .sys-table-right {
    &-count {
      color: #aaa;
      font-size: 16px;
    }
  }
}
</style>