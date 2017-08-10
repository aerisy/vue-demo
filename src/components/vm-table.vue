<template>
  <Row class="vm-table vm-panel">
    <div class="panel-heading">
      {{ title }}
    </div>
    <div class="panel-body">
      <Row type="flex" justify="space-between" class="control">
        <!--<div class="table-style">
          <h3>Stripe</h3>
          <i-switch v-model="showStripe" style="margin: 0 30px 0 10px"></i-switch>
          <h3>Size</h3>
          <Radio-group v-model="tableSize" type="button" style="margin-left: 10px">
            <Radio label="large">Large</Radio>
            <Radio label="default">Default</Radio>
            <Radio label="small">Small</Radio>
          </Radio-group>
        </div>-->
        <div class="search-bar">
          <Form :label-width="80" inline>
            <Form-item label="姓名：">
              <Input placeholder="请输入姓名" v-model="keyword" style="width: 100px" size="small"></Input>
            </Form-item>
            <Form-item label="单位：">
              <Input placeholder="请输入单位名称" v-model="depart" style="width: 100px" size="small"></Input>
            </Form-item>
            <Form-item label="角色：">
              <Select v-model="model1" style="width:100px" size="small">
                <Option v-for="opt in rolelist" :value="opt" :key="opt">{{ opt }}</Option>
              </Select>
            </Form-item>
            <Form-item label="创建日期：">
              <Date-picker :value="date_value" format="yyyy-MM-dd" type="daterange" placeholder="选择时间范围" :options="dateBanOpt"
                           style="width: 200px" size="small"></Date-picker>
            </Form-item>
            <Form-item label-width="10">
              <Button type="primary" @click="search" icon="" shape="" size="small">查询
              </Button>
              <Poptip v-model="visible" trigger="hover" placement="bottom">
                <Button size="small">CLICK</Button>
                <div slot="content">
                  <Button type="info" icon="person" size="small" shape="circle">张三</Button>
                  <Button type="info" icon="person" size="small" shape="circle">李四</Button>
                  <Button type="info" icon="person" size="small" shape="circle">王五</Button>
                  <Button type="info" icon="person" size="small" shape="circle">李丽虎</Button>
                  <Button type="info" icon="person" size="small" shape="circle">刘万金</Button>
                  <Button type="info" icon="person" size="small" shape="circle">姜国达</Button>
                  <Button type="info" icon="person" size="small" shape="circle">郭发林</Button>
                  <Button type="info" icon="person" size="small" shape="circle">杨德碧</Button>
                </div>
              </Poptip>
            </Form-item>
          </Form>
        </div>
      </Row>
      <div class="edit" v-if="type === 'edit'">
        <Button @click="modalAdd = true" type="primary" size="small">
          <Icon type="add"></Icon>
          新增
        </Button>
        <Button :disabled="deleteDisabled" @click="modalDelete = true" type="error" size="small">
          <Icon type="delete"></Icon>
          删除
        </Button>
        <Button @click="msgTest" size="small">ajax测试</Button>
      </div>
      <Table :stripe="showStripe" :size="tableSize" :columns="showColumns" :data="dataShow"
             @on-selection-change="selectChange"></Table>
      <Row type="flex" justify="space-between" class="footer">
        <!--<div class="info-bar">-->
          <!--每页显示-->
          <!--<Input-number class="input-number" v-model="showNum" :max="data.length" :min="1"-->
                        <!--@on-change=" updateDataShow ">{{ showNum }}-->
          <!--</Input-number>-->
          <!--条-->
        <!--</div>-->
        <div class="page">
          <!--<span class="total">总条数： {{ data.length }}</span>-->
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange" @on-page-size-change="updateDataShow" size="small" show-elevator show-sizer></Page>
        </div>
      </Row>
    </div>
    <Modal
      v-model="modalEdit"
      title="Edit"
      ok-text="OK"
      cancel-text="Cancel"
      v-on:on-ok="editOk">
      <Form :label-width="50">
        <Form-item v-for="(value, key) in dataEdit" :label="convertKey(key)" :key="dataEdit.id">
          <Input v-model="dataEdit[key]" :placeholder="'Please enter' + key"></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal
      v-model="modalAdd"
      title="新增"
      ok-text="确认"
      cancel-text="取消"
      v-on:on-ok="addOk">
      <Form :label-width="100">
        <Form-item v-for="item in columns" :label="item.title" :key="item.id">
          <Input v-model="dataAdd[item.key]" :placeholder="'Please enter' + item.title"></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal
      v-model="modalDelete"
      title="删除信息"
      ok-text="确认"
      cancel-text="取消"
      v-on:on-ok="deleteOk">
      确定要删除该条数据?
    </Modal>
  </Row>
</template>

<script>
  export default {
    name: 'VmTable',
    props: {
      title: {
        type: String,
        default: 'Basic Table'
      },
      type: String,
      columns: Array,
      data: Array
    },
    data () {
      return {
        deleteDisabled: true,
        dataShow: [],
        showNum: 10,
        showStripe: true,
        tableSize: 'small',
        currentPage: 1,
        keyword: '',
        modalEdit: false,
        modalAdd: false,
        modalDelete: false,
        dataEdit: {},
        dataDelete: [],
        dataAdd: {},
        formData: [],
        rolelist: ['所有', '分局主管', '市局主管', '分局联络员', '系统管理员'],
        dateBanOpt: {
          disabledDate (date) {
            return date && date.valueOf() < (Date.now() - 86400000 * 180)
          }
        }
      }
    },
    methods: {
      editOk: function () {
        this.$emit('edit-ok', this.dataEdit)
      },
      addOk: function () {
        this.$emit('add-ok', this.dataAdd)
      },
      deleteOk: function () {
        this.$emit('delete-ok', this.dataDelete)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      updateDataShow: function (pageSize) {
        this.showNum = pageSize
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        console.log(startPage)
        console.log(endPage)
        this.dataShow = this.data.slice(startPage, endPage)
      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      selectChange: function (data) {
        this.dataDelete = data
      },
      remove: function (index) {
        this.dataShow.splice(index, 1)
      },
      renderOperate: function (h, params) {
        return h('div', [
          h('Button', {
            props: {
              type: 'info',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                for (let i in params.row) {
                  this.dataEdit[i] = params.row[i]
                }
                delete this.dataEdit._index
                this.modalEdit = true
              }
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                this.dataDelete.push(params.row)
                this.modalDelete = true
              }
            }
          }, '删除')
        ])
      },
      convertKey: function (value) {
        let returnValue = value
        this.columns.forEach(function (elem) {
          for (let i in elem) {
            if (i === 'key' && elem[i] === value) {
              returnValue = elem.title
            }
          }
        })
        return returnValue
      },
      // test Function
      msgTest: function () {
        let _this = this
        _this.$http.request({
          method: 'get',
          url: '/hi/message',
          success: function (data) {
            _this.$Message.success('COUNT:  ' + data.message)
          }
        })
      }
    },
    computed: {
      showColumns: function () {
        let showColumn = this.columns.slice()
        showColumn.forEach(function (elem) {
          elem.sortable = true
        })
        if (this.type === 'edit') {
          showColumn.unshift({
            type: 'selection',
            width: 60,
            align: 'center'
          })
          showColumn.push({
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: this.renderOperate
          })
        }
        return showColumn
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum)
      },
      dataDelete: function () {
        if (this.dataDelete.length === 0) {
          this.deleteDisabled = true
        } else {
          this.deleteDisabled = false
        }
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>
