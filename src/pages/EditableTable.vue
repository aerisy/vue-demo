<template>
  <VmTable title="Editable Table"
           type="edit"
           :columns="dataColumns"
           :data="dataTable"
           v-on:add-ok="add"
           v-on:edit-ok="edit"
           v-on:delete-ok="deletefn"
           class="vm-margin">
  </VmTable>
</template>

<script>
  import VmTable from '@/components/vm-table'
  export default {
    name: 'EditableTable',
    components: {
      VmTable
    },
    methods: {
      add: function (data) {
        this.dataTable.unshift(data)
      },
      edit: function (data) {
        this.dataTable.forEach(function (elem) {
          if (elem.id === data.id) {
            for (let i in data) {
              elem[i] = data[i]
            }
          }
        })
      },
      deletefn: function (data) {
        for (let i = 0; i < this.dataTable.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (this.dataTable[i].id === data[j].id) {
              this.dataTable.splice(i, 1)
            }
          }
        }
      }
    },
    data () {
      return {
        dataColumns: [
          {
            id: '20156541',
            title: 'POLICE_ID',
            key: 'id'
          },
          {
            id: '20156542',
            title: '用户名',
            key: 'name'
          },
          {
            id: '20156540',
            title: '部门用户',
            key: 'name',
            render: function (h, params) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  placement: 'right',
                }
              }, [
                h('Button', {
                  props: {
                    shape: 'circle',
                    size: 'small',
                    type: 'warning'
                  }
                }, '小组成员'),
                h('div', {
                  slot: 'content',
                }, [
                  h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '张三'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '李四'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '王五'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '李丽虎'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '刘万金'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '姜国达'),h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '郭发林'),
                  h('Button', {
                    props: {
                      type: 'info',
                      icon: 'person',
                      size: 'small',
                      shape: 'circle'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '杨德碧')
                ])
              ]);
            }
          },
          {
            id: '20156543',
            title: '联系方式',
            key: 'age'
          },
          {
            id: '20156544',
            title: '部门',
            key: 'depart'
          },
          {
            id: '20156545',
            title: '角色',
            key: 'role'
          },
          {
            id: '20156546',
            title: '地址',
            key: 'address'
          }
        ],
        dataTable: [
          {
            id: '65416s843154',
            name: '王小明',
            age: 18,
            depart: '雁塔分局',
            role: '系统管理员',
            address: '北京市朝阳区芍药居'
          },
          {
            id: '6541684q6534',
            name: '张小刚',
            age: 25,
            depart: '高新分局',
            role: '分局主管',
            address: '北京市海淀区西二旗'
          },
          {
            id: '65416843f194',
            name: '李小红',
            age: 30,
            depart: '雁塔分局',
            role: '分局主管',
            address: '上海市浦东新区世纪大道'
          },
          {
            id: '6541g6843150',
            name: '周小伟',
            age: 26,
            depart: '碑林分局',
            role: '分局联络员',
            address: '深圳市南山区深南大道'
          },
          {
            id: '6541h6843150',
            name: '张小刚',
            age: 25,
            depart: '雁塔分局',
            role: '分局主管',
            address: '北京市海淀区西二旗'
          },
          {
            id: '65416v843114',
            name: '李小红',
            age: 30,
            depart: '莲湖分局',
            role: '分局主管',
            address: '上海市浦东新区世纪大道'
          },
          {
            id: '65416843g114',
            name: '周小伟',
            age: 26,
            depart: '新城分局',
            role: '分局主管',
            address: '深圳市南山区深南大道'
          },
          {
            id: '254168431d54',
            name: '李小红',
            age: 30,
            depart: '莲湖分局',
            role: '分局联络员',
            address: '上海市浦东新区世纪大道'
          },
          {
            id: '65456843d154',
            name: '周小伟',
            age: 26,
            depart: '雁塔分局',
            role: '分局联络员',
            address: '深圳市南山区深南大道'
          },
          {
            id: '654168431d14',
            name: '张小刚',
            age: 25,
            depart: '未央分局',
            role: '分局主管',
            address: '北京市海淀区西二旗'
          },
          {
            id: '65416343s154',
            name: '李小红',
            age: 30,
            depart: '雁塔分局',
            role: '市局主管',
            address: '上海市浦东新区世纪大道'
          },
          {
            id: '65419843f154',
            name: '周小伟',
            age: 26,
            depart: '碑林分局',
            role: '分局主管',
            address: '深圳市南山区深南大道'
          }
        ]
      }
    }
  }
</script>
