<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'imgId', order: 'ascending'}"
      style="width: 100%;"
    >
      <el-table-column label="广告id" prop="imgId" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.imgId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告信息" align="center">
        <template slot-scope="{row}">
          <span>{{ row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告更新时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告截止时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告展示的图片" align="center" min-width="250">
        <template slot-scope="{row}">
          <!-- <span>{{ row.url }}</span> -->
          <img :src="row.url" alt="图片无法显示" style="width:100%;height:auto">
        </template>
      </el-table-column>
      <el-table-column label="广告跳转的地址（外链）" align="center">
        <template slot-scope="{row}">
          <span>{{ row.link }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!=1" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { deleteByBookimgId, fetchList } from '@/api/ad'
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
    console.log(this.list);
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

    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByBookimgId(row.imgId).then(response => {
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
