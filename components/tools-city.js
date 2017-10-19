import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/city.less"); 
// 城市选择框显示 

let db = ['北京|beijing|bj', '上海|shanghai|sh', '重庆|chongqing|cq', '深圳|shenzhen|sz', '广州|guangzhou|gz', '杭州|hangzhou|hz',
    '南京|nanjing|nj', '苏州|shuzhou|sz', '天津|tianjin|tj', '成都|chengdu|cd', '南昌|nanchang|nc', '三亚|sanya|sy', '青岛|qingdao|qd',
    '厦门|xiamen|xm', '西安|xian|xa', '长沙|changsha|cs', '合肥|hefei|hf', '西藏|xizang|xz', '内蒙古|neimenggu|nmg', '安庆|anqing|aq', '阿泰勒|ataile|atl', '安康|ankang|ak',
    '阿克苏|akesu|aks', '包头|baotou|bt', '北海|beihai|bh', '百色|baise|bs', '保山|baoshan|bs', '长治|changzhi|cz', '长春|changchun|cc', '常州|changzhou|cz', '昌都|changdu|cd',
    '朝阳|chaoyang|cy', '常德|changde|cd', '长白山|changbaishan|cbs', '赤峰|chifeng|cf', '大同|datong|dt', '大连|dalian|dl', '达县|daxian|dx', '东营|dongying|dy', '大庆|daqing|dq', '丹东|dandong|dd',
    '大理|dali|dl', '敦煌|dunhuang|dh', '鄂尔多斯|eerduosi|eeds', '恩施|enshi|es', '福州|fuzhou|fz', '阜阳|fuyang|fy', '贵阳|guiyang|gy',
    '桂林|guilin|gl', '广元|guangyuan|gy', '格尔木|geermu|gem', '呼和浩特|huhehaote|hhht', '哈密|hami|hm',
    '黑河|heihe|hh', '海拉尔|hailaer|hle', '哈尔滨|haerbin|heb', '海口|haikou|hk', '黄山|huangshan|hs', '邯郸|handan|hd',
    '汉中|hanzhong|hz', '和田|hetian|ht', '晋江|jinjiang|jj', '锦州|jinzhou|jz', '景德镇|jingdezhen|jdz',
    '嘉峪关|jiayuguan|jyg', '井冈山|jinggangshan|jgs', '济宁|jining|jn', '九江|jiujiang|jj', '佳木斯|jiamusi|jms', '济南|jinan|jn',
    '喀什|kashi|ks', '昆明|kunming|km', '康定|kangding|kd', '克拉玛依|kelamayi|klmy', '库尔勒|kuerle|kel', '库车|kuche|kc', '兰州|lanzhou|lz',
    '洛阳|luoyang|ly', '丽江|lijiang|lj', '林芝|linzhi|lz', '柳州|liuzhou|lz', '泸州|luzhou|lz', '连云港|lianyungang|lyg', '黎平|liping|lp',
    '连成|liancheng|lc', '拉萨|lasa|ls', '临沧|lincang|lc', '临沂|linyi|ly', '芒市|mangshi|ms', '牡丹江|mudanjiang|mdj', '满洲里|manzhouli|mzl', '绵阳|mianyang|my',
    '梅县|meixian|mx', '漠河|mohe|mh', '南充|nanchong|nc', '南宁|nanning|nn', '南阳|nanyang|ny', '南通|nantong|nt', '那拉提|nalati|nlt',
    '宁波|ningbo|nb', '攀枝花|panzhihua|pzh', '衢州|quzhou|qz', '秦皇岛|qinhuangdao|qhd', '庆阳|qingyang|qy', '齐齐哈尔|qiqihaer|qqhe',
    '石家庄|shijiazhuang|sjz', '沈阳|shenyang|sy', '思茅|simao|sm', '铜仁|tongren|tr', '塔城|tacheng|tc', '腾冲|tengchong|tc', '台州|taizhou|tz',
    '通辽|tongliao|tl', '太原|taiyuan|ty', '威海|weihai|wh', '梧州|wuzhou|wz', '文山|wenshan|ws', '无锡|wuxi|wx', '潍坊|weifang|wf', '武夷山|wuyishan|wys', '乌兰浩特|wulanhaote|wlht',
    '温州|wenzhou|wz', '乌鲁木齐|wulumuqi|wlmq', '万州|wanzhou|wz', '乌海|wuhai|wh', '兴义|xingyi|xy', '西昌|xichang|xc', '襄樊|xiangfan|xf',
    '西宁|xining|xn', '锡林浩特|xilinhaote|xlht', '西双版纳|xishuangbanna|xsbn', '徐州|xuzhou|xz', '义乌|yiwu|yw', '永州|yongzhou|yz', '榆林|yulin|yl', '延安|yanan|ya', '运城|yuncheng|yc',
    '烟台|yantai|yt', '银川|yinchuan|yc', '宜昌|yichang|yc', '宜宾|yibin|yb', '盐城|yancheng|yc', '延吉|yanji|yj', '玉树|yushu|ys', '伊宁|yining|yn', '珠海|zhuhai|zh', '昭通|zhaotong|zt',
    '张家界|zhangjiajie|zjj', '舟山|zhoushan|zs', '郑州|zhengzhou|zz', '中卫|zhongwei|zw', '芷江|zhijiang|zj', '湛江|zhanjiang|zj'];

class ToolsCity extends React.Component {
    constructor(str) {
        super(str);
        this.state = {
            current: "ABCDEFG"
        }
        this.db = {} //数据
        this.createCity();//城市初始化
        this.open=this.BIND_OPEN;//
    }
    createCity() {  //初始化分组
        /* 正则表达式 筛选中文城市名、拼音、首字母 */

        let regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
        let regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;
        var citys = db, match, letter,
            reg2 = /^[a-g]$/i, reg3 = /^[h-l]$/i, reg4 = /^[m-t]$/i, reg5 = /^[w-z]$/i,
            arr = {}

        arr = { hot: {}, ABCDEFG: {}, HIJKL: {}, MNOPQRST: {}, WXYZ: {} };
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]); //exec
            letter = match[3].toUpperCase(); //转换字母为大写

            if (reg2.test(letter)) { //test检测一个字符串是否匹配某个模式
                if (!arr.ABCDEFG[letter]) arr.ABCDEFG[letter] = [];
                arr.ABCDEFG[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!arr.HIJKL[letter]) arr.HIJKL[letter] = [];
                arr.HIJKL[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!arr.MNOPQRST[letter]) arr.MNOPQRST[letter] = [];
                arr.MNOPQRST[letter].push(match[1]);
            } else if (reg5.test(letter)) {
                if (!arr.WXYZ[letter]) arr.WXYZ[letter] = [];
                arr.WXYZ[letter].push(match[1]);
            }
            /* 热门城市 前16条 */
            if (i < 16) {
                if (!arr.hot['hot']) arr.hot['hot'] = [];
                arr.hot['hot'].push(match[1]);
            }
        }

        this.db = arr;
        this.target="";

    }
    
    componentDidMount() {
      
            this.EVENT_JQUERY_WINDOW();
    }
    BIND_OPEN(ev){ //外界通讯
        this.target=ev;
        this.refs.ToolsCity.className=this.refs.ToolsCity.className.replace("hide","");
    }
    EVENT_JQUERY_WINDOW(){ //全局监控
        $(".tc-body").scrollUnique();
    }
    EVENT_CLICK_OLLI(da,ev){  //点击
        var th = this,
        ToolsCity= th.refs.ToolsCity;
        ToolsCity.className+=" hide";
        let data=da;
      /*   db.forEach((el,ind)=>{
            if(el.indexOf(da)>=0){
                data=el;
                return 
            }
        }) */
       if(th.props.callback){
           th.props.callback(data,th.target);
       }
    }
    EVENT_HEADER_CLICK(da,ev){ //头部切换
        var th = this,
            self = $(ev.target),
            pa = self.parent();
            pa.find("li").removeClass("active");
            self.addClass("active");
            this.setState({
                current:da
            });

    }
    setCity() {
        let sd = this.db[this.state.current];
        let list = Object.keys(sd).sort();
        let arr=[];
         for (var i=0;i<list.length;i++) {
            arr.push(<li key={i}>
                <span>{list[i]}</span><ol>
                 {
                     sd[[list[i]]].map((el,ind)=>{
                          return <li onClick={this.EVENT_CLICK_OLLI.bind(this,el)} key={ind}>{el}</li>
                     })
                 }
                 </ol>
            </li>)
        } 
       return arr;
    }
    render() {
        return <div className="ToolsCity hide" ref="ToolsCity">
            <ul className="tc-header">
                <li className="active" onClick={this.EVENT_HEADER_CLICK.bind(this,"ABCDEFG")}>ABCDEFG</li>
                <li className=""  onClick={this.EVENT_HEADER_CLICK.bind(this,"HIJKL")}>HIJKL</li>
                <li className=""  onClick={this.EVENT_HEADER_CLICK.bind(this,"MNOPQRST")}>MNOPQRST</li>
                <li className=""  onClick={this.EVENT_HEADER_CLICK.bind(this,"WXYZ")}>WXYZ</li>
            </ul>
            <div className="tc-body" ref="tcBody">
                <ul>
                    {this.setCity()}
                </ul>
            </div>
        </div>



    }


}

export default ToolsCity;
