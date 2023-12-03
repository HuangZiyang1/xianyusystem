<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="广告id" prop="id" sortable="custom" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.imgId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" prop="id" sortable="custom" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告信息" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告更新时间" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告截止时间" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告展示的图片" width="400" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.url }}</span> -->
          <img :src="row.url" alt="" style="width:300px;height:auto">
        </template>
      </el-table-column>
      <el-table-column label="广告跳转的地址（外链）" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.link }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="235" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!=1" size="mini" type="primary" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { deleteByBookimgId, fetchList,searchBook,topBook,cancelTopBook } from '@/api/ad'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SearchBook',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      allList: null,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      downloadLoading: false,
      picList:[]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data
        this.allList = this.list
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },

    handleDelete(row, index) {
      console.log(typeof(row.imgId));
      console.log(row.imgId);
      deleteByBookimgId(row.imgId).then(response => {
        console.log(response)
        this.$notify({
        title: '成功',
        message: response.msg,
        type: 'success',
        duration: 2000
      })
      // 确定OK再删除
      this.list.splice(index, 1)
      }).catch(err => {
        console.log(err);
      })


    },
    searchBlank() {
      let title = this.listQuery.title
      searchBook(title).then(response => {
        console.log(response)
        this.list = response.data
      }).catch(err => {
        this.list = this.allList
        console.log(err);
      })

    },

    handleTop(row, index) {
      console.log(row.imgId);
      topBook(row.imgId).then(response => {
        console.log(response)
        this.$notify({
        title: '成功',
        message: response.msg,
        type: 'success',
        duration: 2000
      })
      row.isOnTop = 1
      }).catch(err => {
        console.log(err);
      })


    },
    cancelTopBook(row, index) {
      console.log(row.imgId);
      cancelTopBook(row.imgId).then(response => {
        console.log(response)
        this.$notify({
        title: '成功',
        message: response.msg,
        type: 'success',
        duration: 2000
      })
      row.isOnTop = 0
      }).catch(err => {
        console.log(err);
      })


    },

  },
}
</script>
