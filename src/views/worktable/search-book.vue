<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索书籍标题、书籍简介" style="width: 320px;" class="filter-item" @keyup.enter.native="searchBlank" minlength="1" maxlength="32" show-word-limit/>
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
      style="width: 100%;"
    >
      <el-table-column label="书籍套装id" prop="id" sortable="custom" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.suitId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书籍图片" min-width="120" width="150" style="display:flex;align-items: center;">
        <template slot-scope="{row}">
          <img :src="row.pictures[0] ? row.pictures[0].url : ''" alt="" style="height:60px;width:auto">
        </template>
      </el-table-column>
      <el-table-column label="书籍套装各书籍" width="500" align="center">
        <template slot-scope="{row}">
          <el-row v-for="item in row.books" :key="item.bookId">
            <span style="margin-right:6px;">书籍名称：{{ item.bookName }}</span>
            <span>书籍ISBN号：{{ item.isbn }}</span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="书籍套装简介" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书籍套装上传者" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书籍套装价格区间" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lowPrice + '~' + row.highPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览数" align="center" width="65">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.pageView }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="收藏数" align="center" width="65">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.isCollection }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="235" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { deleteByBookSuitId, fetchList,searchBook } from '@/api/book'
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
      console.log(row.suitId);
      deleteByBookSuitId(row.suitId).then(response => {
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

  },
}
</script>
