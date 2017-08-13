<template>
  <div>
    <Tree ref="testTree" :data="baseData" show-checkbox></Tree>
    <Button @click="treeTest">Test</Button>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        baseData: [{
          expand: true,
          title: 'parent 1',
          id: '1',
          children: [{
            title: 'parent 1-0',
            expand: true,
            disabled: true,
            id: '10',
            children: [{
              title: '1-0-1',
              id: '101',
            }, {
              title: '1-0-2',
              id: '102',
            }]
          }, {
            title: 'parent 1-1',
            id: '11',
            expand: true,
            checked: true,
            children: [{
              title: '<span style="color: red">1-1-1</span>',
              id: '111',
            }]
          }]
        }]
      }
    },
    methods: {
      treeTest(){

          console.log("***");
        this.$refs['testTree'].getCheckedNodes().forEach(function (value, index, array) {
          /*console.log(value)
           console.log(index)
           console.log(array)*/
          //_this.markPoint(value.split(","));
          console.log(value.id);
        })
          console.log("***");

      }
    }
  }
</script>
