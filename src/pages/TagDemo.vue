<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col span="18">
      <Input v-model="tag_text" size="small" style="width: 500px;" placeholder="请输入号码，多个用逗号分隔">
      <Select v-model="tag_type" slot="prepend" style="width: 80px">
        <Option v-for="type in tag_types" :key="type" :name="type" :value="type.value">{{ type.text }}</Option>
        <!--<Option value="qq">QQ</Option>-->
      </Select>
      <Button icon="plus" slot="append" type="dashed" size="small" @click="handleAdd">添加</Button>
      </Input>
      </Col>
    </Row>
    <Row type="flex" justify="center" align="middle" v-for="item in tag_group" style="min-height: 30px;"
         :key="item">
      <!--<template v-for="item in tag_group">-->
      <Col span="1">
      <Icon type="pricetag"></Icon>
      <Label>{{item.text}}</Label>
      </Col>
      <Col span="17">
      <Tag v-for="ii in item.value" :key="item.key" :name="item.key+','+ii" closable @on-close="handleClose2">
        {{ ii }}
      </Tag>
      </Col>
      <!--</template>-->
    </Row>
  </div>
</template>
<script>
  export default {
    created: function () {
      let _this = this;
      let group = [];
      _this.$http.get('/getTagType')
        .then(function (response) {
          // success
          console.log(response.data.type);
          _this.tag_types = response.data.type;

          const tagtps = _this.tag_types;
          for (const i in _this.tag_types) {
            group.push({
              key: tagtps[i].value,
              text: tagtps[i].text,
              value: []
            });
          }
          _this.tag_group = group;
          console.log("tag group");
          console.log(_this.tag_group);
        }).catch(function (error) {
        //error
        console.log('ERROR axios get!');
        console.log(error);
      })
//            this.tag_types = [
//                {text: 'QQ', value: 'QQ'},
//                {text: '微信', value: 'WECHAT'},
//                {text: '手机', value: 'TEL'}
//            ];

    },
    data () {
      return {
        count: [0, 1, 2],
        tag_content: ['Hello', '标签'],
        tag_group: [],
        tag_text: '',
        tag_type: 'QQ',
        tag_types: []
      }
    },
    methods: {
      handleAdd () {
        this.tag_text = this.tag_text.replace("，", ",");
        const text_arr = this.tag_text.split(",");
        const text_type = this.tag_type;
        const group = this.tag_group;
        console.log(text_arr);
        console.log(group);

        for (const j in group) {
          if (text_type === group[j].key) {
            for (const i in text_arr) {
              const text = text_arr[i];
              console.log(text);
              console.log(text_type);
              if (text.length > 0 && text_type.length > 0) {
                const index = group[j].value.indexOf(text_arr[i]);
                console.log(index);
//                                console.log(this.tag_group.get(text_type));
//                                this.tag_group.get(text_type).push(text_arr[i]);
//                                console.log(this.tag_group.get(text_type));
                if (index < 0) {
                  group[j].value.push(text_arr[i]);
                } else {
                  this.$Notice.warning({
                    title: text + " 已存在！",
                    desc: ''
                  });
                }
              }
            }
          }
        }


        console.log("after" + text_type);
        if (text_type.length == 0) {

        } else {
          this.tag_text = '';
        }
        /*if (this.count.length) {
         this.count.push(this.count[this.count.length - 1] + 1);
         } else {
         this.count.push(0);
         }*/
      },
      handleClose2 (event, name) {
        //type value
        const arr = name.split(",");
        for (const i in this.tag_group) {
          const num_arr = this.tag_group[i].value;
          if (this.tag_group[i].key === arr[0]) {
            const index = num_arr.indexOf(arr[1]);
            num_arr.splice(index, 1);
          }
        }
        /*const index = this.count.indexOf(name);
         this.count.splice(index, 1);*/
      },
      saveArticle(){
        let _this = this;
        _this.$http.request({
          method: options.method || 'post',
          url: `${options.url}`,
          headers: {
            'Content-Type': options.contentType || 'application/json'
          },
          params: options.params,
          data: options.data || {},
          // transformRequest: [function(data) {
          //     // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
          //     data = qs.stringify(data);
          //     return data;
          // }],
          timeout: options.timeout || 30 * 1000
        }).then(function (response) {
          // success
          console.log(response.data.type);
          _this.tag_types = response.data.type;
        }).catch(function (error) {
          //error
          console.log('ERROR axios get!');
          console.log(error);
        })
      }
    }
  }
</script>
