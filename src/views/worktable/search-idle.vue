<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索闲置标题、闲置简介" style="width: 320px;" class="filter-item"
        @keyup.enter.native="searchBlank" minlength="1" maxlength="32" show-word-limit />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="searchBlank">
        搜索
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
      :default-sort="{ prop: 'businessId', order: 'ascending' }" style="width: 100%;">
      <el-table-column label="闲置id" prop="businessId" sortable align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.businessId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="闲置图片" min-width="120" width="150" style="display:flex;align-items: center;">
        <template slot-scope="{row}">
          <img :src="row.pictureList !== null ? row.pictureList[0] ? row.pictureList[0].url : '' : ''" alt="图片无法显示"
            style="height:60px;width:auto">
        </template>
      </el-table-column>
      <el-table-column label="闲置名称" width="500" align="center">
        <template slot-scope="{row}">
          <span style="margin-right:6px;">{{ row.title }}</span>
          <!-- <span>书籍ISBN号：{{ item.isbn }}</span> -->

        </template>
      </el-table-column>
      <el-table-column label="闲置简介" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="闲置上传者" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="闲置价格区间" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lowPrice + '~' + row.highPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览数" align="center" width="65">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.pageView }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="235" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.isOnTop != 1" size="mini" type="primary" @click="handleTop(row, $index)">
            置顶
          </el-button>
          <el-button v-if="row.isOnTop != 0" size="mini" type="info" @click="cancelTopBook(row, $index)">
            取消置顶
          </el-button>
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row, $index)">
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
import { deleteByBookSuitId, fetchList, searchBook, topBook, cancelTopBook } from '@/api/idle'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SearchIdle',
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
        pageSize: 15,
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
      // 二次确认
      this.$confirm('此操作将永久删除该闲置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByBookSuitId(row.businessId).then(response => {
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
      console.log(row.businessId);
      topBook(row.businessId).then(response => {
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
      console.log(row.businessId);
      cancelTopBook(row.businessId).then(response => {
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
