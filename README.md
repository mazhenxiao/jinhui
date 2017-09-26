# jinhui
金辉门户
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
|regExp| 验证|{type:"类型string number date",max:"最大值",min:"最小值" }|
| data | ｛label：”“，val：”“｝ | 如果select data数据key值为txt值 val值为实际值  |

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
    edit:"可写+w 只读+r 必填+m",
    regExp:{ 
        type:"string,number,date",
        max:"32 2.00 2017-09-06",
        min:"0 1.00 2017-09-05"    
    },
    data:[
        {label:"显示内容",val:"实际值"}
    ]
}
]
~~~
* 树控件

~~~json
[
    {
    "id":1,
    "text":"内容",
    "state":"节点状态，'open' 或 'closed'，默认是 'open'。当设置为 'closed' 时，该节点有子节点，并且将从远程站点加载它们",
    "attributes":"给一个节点添加的自定义属性",
    "children":[{
        "id":1,
		"text":"File1",
		"state":"close",
        "attributes":"给一个节点添加的自定义属性"
    }
]
~~~