<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索用户昵称" style="width: 320px;" class="filter-item"
        @keyup.enter.native="searchBlank" minlength="1" maxlength="32" show-word-limit />
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
    :default-sort="{prop: 'userId', order: 'ascending'}"
    style="width: 100%;">
      <el-table-column label="用户id" prop="userId" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="用户图片" min-width="120" width="150" style="display:flex;align-items: center;">
        <template slot-scope="{row}">
          <img :src="row.pictureList ? row.pictureList[0].url : ''" alt="" style="height:60px;width:auto">
        </template>
      </el-table-column> -->
      <el-table-column label="用户名称" align="center">
        <template slot-scope="{row}">
          <span style="margin-right:6px;">{{ row.nickName }}</span>
          <!-- <span>书籍ISBN号：{{ item.isbn }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status != '1'" size="mini" type="danger" @click="handleDelete(row, $index)">
            封禁
          </el-button>
          <span v-if="row.status == '1'" style="color:red;font-size:20px">该用户已被封禁！</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
      @pagination="pageChange" />
  </div>
</template>

<script>
import { deleteByBookSuitId, fetchList, searchBook  } from '@/api/finduser'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SearchUser',
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
      picList: []
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
      this.$confirm('此操作将永久封禁该用户，是否确认？', '提示', {
        confrimButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByBookSuitId(row.userId).then(response => {
          console.log(response)
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
            duration: 2000
          })
          row.status = 1
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消封禁'
        })
      })



    },
    searchBlank() {
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
