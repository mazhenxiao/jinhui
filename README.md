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
| id | 控件id | 控件唯一id用来对应服务器字段 | 
| key | 显示名称 | 比如select的txt值 | 
| val | 值 | 比如select value值 |
|type| 类型|input 或 select|
| data | ｛key：”“，val：”“｝ | 如果select data数据key值为txt值 val值为实际值  |

~~~ json
[{
    pid:"",//父id
    id:"",//控件id
    label:"label",  //标题
    text:"显示内容，显示内容2",
    val:"实际值,实际值2",    //提交value值
    type:"input，select,selects，date",  //类型
    unit:"单位￥，km",
    exec:"{控件id}+{id}*{id}>={id}",
    data:[
        {label:"显示内容",val:"实际值"}
    ]
}
]
~~~