<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索服务标题、服务简介" style="width: 320px;" class="filter-item" @keyup.enter.native="searchBlank" minlength="1" maxlength="32" show-word-limit/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="searchBlank">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'serviceId', order: 'ascending'}"
      style="width: 100%;"
    >
      <el-table-column label="服务id" prop="serviceId" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.serviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" align="center">
        <template slot-scope="{row}">
            <span style="margin-right:6px;">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务简介" align="center">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务上传者" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务价格区间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lowPrice + '~' + row.highPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览数" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.pageView }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.isOnTop!=1" size="mini" type="primary" @click="handleTop(row,$index)">
            置顶
          </el-button>
          <el-button v-if="row.isOnTop!=0" size="mini" type="info" @click="cancelTopBook(row,$index)">
            取消置顶
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
      @pagination="pageChange" />
  </div>
</template>

<script>
import { deleteByBookSuitId, fetchList,searchBook,topBook,cancelTopBook } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SearchService',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      allTotal: 0,
      listLoading: true,
      allList: null,
      searchList: null,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        title: '',
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
      const params = {
        currentPage: this.listQuery.currentPage,
        pageSize: this.listQuery.pageSize
      }
      fetchList(params).then(response => {
        const { list, total } = response.data
        this.list = list
        this.total = total
        this.allTotal = total
        this.allList = this.list
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByBookSuitId(row.serviceId).then(response => {
          console.log(response)
          // 确定OK再删除
          this.$message({
          type: 'success',
          message: response.msg
        });
          this.list.splice(index, 1)
        }).catch(err => {
          console.log(err);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    searchBlank() {
      // 进行搜索时,重新获取list,所以要将分页恢复默认
      let title = this.listQuery.title
      searchBook(title).then(response => {
        console.log(response)
        this.searchList = response.data
        this.total = this.searchList.length
        this.listQuery.currentPage = 1
        this.pageChange()
      }).catch(err => {
        this.list = this.allList
        console.log(err);
      })

    },

    handleTop(row, index) {
      topBook(row.serviceId).then(response => {
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
      console.log(row.serviceId);
      cancelTopBook(row.serviceId).then(response => {
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
    pageChange() {
      // 判断走后台接口的分页查询还是走前端自己的分页功能
      const total = this.total
      const allTotal = this.allTotal
      if (total < allTotal) {
        // 说明正在查询,走前端自己的分页功能
        const list = this.searchList
        const currentPage = this.listQuery.currentPage
        const pageSize = this.listQuery.pageSize
        // 改变pageList,取成当前list的部分内容,渲染到页面
        let pageList = []
        const listEnd = list.length - 1
        const queryEnd = currentPage * pageSize - 1
        const end = listEnd < queryEnd ? listEnd : queryEnd
        for (let start = (currentPage - 1) * pageSize; start <= end; start++) {
          pageList.push(list[start])
        }
        this.list = pageList
      } else {
        this.getList()
      }
    }
  },
}
</script>
