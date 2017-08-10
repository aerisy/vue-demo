<style scoped>
  .layout-copy p {
    text-align: center;
    padding: 50px 0 30px;
    color: #9ea7b4;
  }
</style>
<template>
  <div class="home">
    <Row class="header" type="flex" align="middle">
      <div class="logo">
        <img src="../assets/img/logo.png" height="30" alt="">
        <span>文件档案</span>受理平台
        <Tag>V1.0</Tag>
      </div>
      <!--<VmMsgPush style="margin-left:20px" :data="msgPushData"></VmMsgPush>-->
      <Menu mode="horizontal" theme="light" active-name="1">
        <Menu-item name="Dashboard">
          <router-link to="/">
            <Icon type="ios-paper"></Icon>
            首页
          </router-link>
        </Menu-item>
        <Menu-item name="Widget">
          <router-link to="/widget">
            <Icon type="ios-people"></Icon>
            插件页面
          </router-link>
        </Menu-item>
        <Menu-item name="ImageList">
          <router-link to="/imagelist">
            <Icon type="stats-bars"></Icon>
            图片查看
          </router-link>
        </Menu-item>
        <Menu-item name="Charts">
          <router-link to="/charts">
            <Icon type="ios-paper"></Icon>
            图标统计
          </router-link>
        </Menu-item>
        <Submenu name="DataTable">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            表格
          </template>
          <Menu-item name="BasicTable">
            <router-link to="/basic-table">
              用户列表
            </router-link>
          </Menu-item>
          <Menu-item name="EditableTable">
            <router-link to="/editable-table">
              用户管理
            </router-link>
          </Menu-item>
          <Menu-item name="DataDemo">
            <router-link to="/datademo">
              GoodTable组件
            </router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="DataTable">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            组件测试
          </template>
          <Menu-item name="MapDemo">
            <router-link to="/mapdemo">
              LeafletMap
            </router-link>
          </Menu-item>
          <Menu-item name="TagDemo">
            <router-link to="/tagdemo">
              TagDemo
            </router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="Pages">
          <template slot="title">
            <Icon type="settings"></Icon>
            系统设置
          </template>
          <Menu-item name="Login">
            <router-link to="/login">
              登陆
            </router-link>
          </Menu-item>
          <Menu-item name="Lockscreen">
            <router-link to="/lockscreen">
              注销
            </router-link>
          </Menu-item>
        </Submenu>
      </Menu>

      <Dropdown class="login-info" placement="bottom-end" style="top:10px">
        <Button type="ghost" icon="person" shape="circle" size="large">
          <!-- <Icon type="person" size="30"></Icon>
           &lt;!&ndash;<img src="../assets/img/photo.jpg" height="30" alt="">&ndash;&gt;
           管理员
           <Icon type="arrow-down-b"></Icon>-->
        </Button>
        <Dropdown-menu slot="list">
          <Dropdown-item divided><!--<i class="fa fa-key"></i>-->个人信息</Dropdown-item>
          <Dropdown-item divided><!--<i class="fa fa-cog"></i>-->注销</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </Row>

    <div class="main-content">
      <router-view></router-view>
      <Row type="flex" justify="center" align="middle">
        <Col span="8">
        <div class="layout-copy">
          <p>
            2017~ &copy; 西安九索数据<br>
            西华门
          </p>
        </div>
        </Col>
      </Row>
    </div>
  </div>
  </div>
</template>
<script>
  import VmMsgPush from '@/components/vm-msg-push.vue'
  export default {
    name: 'home',
    components: {
      VmMsgPush
    },
    mounted: function () {
      this.activeName = this.$route.name
    },
    data () {
      return {
        activeName: 'Dashboard',
        msgPushData: [
          {
            image: require('@/assets/img/photo.jpg'),
            from: 'JesseLuo',
            time: '2017-1-8',
            message: 'I like your website very much!'
          },
          {
            image: require('@/assets/img/photo.jpg'),
            from: 'JesseLuo',
            time: '2017-1-8',
            message: 'I like your website very much!'
          },
          {
            image: require('@/assets/img/photo.jpg'),
            from: 'JesseLuo',
            time: '2017-1-8',
            message: 'I like your website very much!'
          },
          {
            image: require('@/assets/img/photo.jpg'),
            from: 'JesseLuo',
            time: '2017-1-8',
            message: 'I like your website very much!'
          },
          {
            image: require('@/assets/img/photo.jpg'),
            from: 'JesseLuo',
            time: '2017-1-8',
            message: 'I like your website very much!'
          }
        ]
      }
    }
  }
</script>
