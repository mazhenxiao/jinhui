# jinhui
门户
============
* dataguid数据绑定格式
1. page=当前页数
2. rows=条数
3. GET 拉取服务端数据http://www.jeasyui.net/demo/datagrid_data1.json?page=2&rows=10
~~~ json
{
total: 20,  //总条目
rows: [
{ type: "field对应列字段", content: "field对应列字段", people: "field对应列字段", time:"field对应列字段" }
],
message:"错误信息",
errorcode:"错误码"
}
~~~
* 动态表格生成
----
url:Project/ILandInfo
----
                        
| 名称 | 值 | 说明 |
|:-------------:|:-------------|-----:|
| pid | 父级id | 控件父级id比如“项目总图” |
| id | 控件id | 控件唯一id用来对应服务器字段 | 
| label | 显示名称 | 标题 | 
| text | 显示内容 | 与val值对应的显示txt内容 | 
| val | 值 | 比如select value值 |
|type| 类型|input 或 select，selects，date|
|unit| 单位|平米等|
|edit| 是否只读|+w,+r,+m,只读与可写互斥以最后出现值为准|
|exec| 公式|{id}*{id}|
|regExp| 验证|{type:"类型string number date regExp,到字典表里找相应正则",max:"最大值或{id}",min:"最小值||{id}",regExp:"^[A-Za-z]{1}$" }|
| data | ｛label：”“，val：”“｝ | 如果select data数据key值为txt值 val值为实际值  |
（正则校验如果需要\比如\d 使用#替换 #d）
~~~ json
[{
    pid:"",//父id
    id:"",//控件id
    label:"label",  //标题
    text:"显示内容，显示内容2",
    val:"实际值,实际值2",    //提交value值
    type:"input，select,selects，date",  //类型
    unit:"单位￥，km",
    exec:"{控件id}+{id}*{id}",
    colspan:"4",//合并单元格默认为4，显示为3列，8显示为两列  按总块数为12，
    edit:"可写+w 只读+r 必填+m",
    regExp:{ 
        type:"string,number,date字典表里找",
        max:"32 2.00 2017-09-06或{id}",
        min:"0 1.00 2017-09-05或{id}"    
    },
    data:[
        {label:"显示内容",val:"实际值"}
    ]
}
]
~~~
* 树控件
---
url: Home/GetTreeInfo
---
~~~json
[
    {
    "id":1,
    "text":"内容",
    "state":"节点状态，'open' 或 'closed'，默认是 'open'。当设置为 'closed' 时，该节点有子节点，并且将从远程站点加载它们",
    "attributes":"给一个节点添加的自定义属性",
    "level_id":"1 级别",
    "children":[{
        "id":1,
		"text":"File1",
		"state":"close",
        "attributes":"给一个节点添加的自定义属性"
    }
]
~~~

* 上传控件
---
~~~ javascript
iss.upload({
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                server: 'http://2betop.net/fileupload.php',
                fileNumLimit: 300,
                fileSizeLimit: 5 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 1 * 1024 * 1024    // 50 M
})
~~~
* 选人控件
选人完成后接听选中人员
$(window).on("chooseTo",function(ev,da){ //ev为event //da为选中人员  })
~~~ javascript
iss.chooseTo({
      url:"/Home/GetTreeInfo",
            title:"选择人员",
            pepole:{}  //已选人员名单
})
~~~
* 发起审批和在发起审批取消的时候参考
------
~~~ 
 
  status  当前【状态】是编辑还是升级具体咨询 成委
  areaId  【区域id 】 只有项目和分期会用--项目列表下  其余页面赋空值
  areaName  【区域名称】   只有项目和分期会用--项目列表下 其余页面赋空值
  dataKey 【项目id】【分期版本id】列表下是左侧树  在信息填报下首次进入是左侧树然后替换为版本id
  current  ProcessApproval提交 取消 ProcessApprover 同意 驳回
  businessId 信息填报下所需，因为不依赖左侧树需要的是版本所以此值为【版本id】
  isProOrStage 【项目1 分期2】信息填报所需
 
~~~

knife.AntdTable_ScrollLock(to,pk)
---
* 双向绑定滚动锁定控件（针对antd控件原生DOM层滚动监听）

|参数|说明|例子|
|----|----|----|
|to  |原生DOM|document.querySelector(".toTable .ant-table-body")|
|pk  |原生DOM|document.querySelector(".toTable .ant-table-body")|
~~~ javascript
let toTable = document.querySelector(".toTable .ant-table-body"),
    pkTable = document.querySelector(".pkTable .ant-table-body");
    knife.AntdTable_ScrollLock(toTable,pkTable);
~~~