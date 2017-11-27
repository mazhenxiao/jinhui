import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../css/city.less"); 
// 城市选择框显示 

let db = ['北京|beijing|bj',
'天津|tianjin|tj',
'石家庄|shijiazhuang|sjz',
'唐山|tangshan|ts',
'秦皇岛|qinhuangdao|qhd',
'邯郸|handan|hd',
'邢台|xingtai|xt',
'保定|baoding|bd',
'张家口|zhangjiakou|zjk',
'承德|chengde|cd',
'沧州|cangzhou|cz',
'廊坊|langfang|lf',
'衡水|hengshui|hs',
'太原|taiyuan|ty',
'大同|datong|dt',
'阳泉|yangquan|yq',
'长治|changzhi|cz',
'晋城|jincheng|jc',
'朔州|shuozhou|sz',
'晋中|jinzhong|jz',
'运城|yuncheng|yc',
'忻州|xinzhou|xz',
'临汾|linfen|lf',
'吕梁|lvliang|ll',
'呼和浩特|huhehaote|hhht',
'包头|baotou|bt',
'乌海|wuhai|wh',
'赤峰|chifeng|cf',
'通辽|tongliao|tl',
'鄂尔多斯|eerduosi|eeds',
'呼伦贝尔|hulunbeier|hlbe',
'巴彦淖尔|bayannaoer|byne',
'乌兰察布|wulanchabu|wlcb',
'兴安|xinganmeng|xam',
'锡林郭勒|xilinguole|xlgl',
'阿拉善|alashan|als',
'沈阳|shenyang|sy',
'大连|dalian|dl',
'鞍山|anshan|as',
'抚顺|fushun|fs',
'本溪|benxi|bx',
'丹东|dandong|dd',
'锦州|jinzhou|jz',
'营口|yingkou|yk',
'阜新|fuxin|fx',
'辽阳|liaoyang|ly',
'盘锦|panjin|pj',
'铁岭|tieling|tl',
'朝阳|chaoyang|cy',
'葫芦岛|huludao|hld',
'长春|changchun|cc',
'吉林|jilin|jl',
'四平|siping|sp',
'辽源|liaoyuan|ly',
'通化|tonghua|th',
'白山|baishan|bs',
'松原|songyuan|sy',
'白城|baicheng|bc',
'延边朝鲜族自治州|yanbianchaoxianzuzizhizhou|ybcxzzzz',
'哈尔滨|haerbin|heb',
'齐齐哈尔|qiqihaer|qqhe',
'鸡西|jixi|jx',
'鹤岗|hegang|hg',
'双鸭山|shuangyashan|sys',
'大庆|daqing|dq',
'伊春|yichun|yc',
'佳木斯|jiamusi|jms',
'七台河|qitaihe|qth',
'牡丹江|mudanjiang|mdj',
'黑河|heihe|hh',
'绥化|suihua|sh',
'大兴安岭地区|daxinganlingdiqu|dxaldq',
'上海|shanghai|sh',
'南京|nanjing|nj',
'无锡|wuxi|wx',
'徐州|xuzhou|xz',
'常州|changzhou|cz',
'苏州|suzhou|sz',
'南通|nantong|nt',
'连云港|lianyungang|lyg',
'淮安|huaian|ha',
'盐城|yancheng|yc',
'扬州|yangzhou|yz',
'镇江|zhenjiang|zj',
'泰州|taizhou|tz',
'宿迁|suqian|sq',
'杭州|hangzhou|hz',
'宁波|ningbo|nb',
'温州|wenzhou|wz',
'嘉兴|jiaxing|jx',
'湖州|huzhou|hz',
'绍兴|shaoxing|sx',
'金华|jinhua|jh',
'衢州|quzhou|qz',
'舟山|zhoushan|zs',
'台州|taizhou|tz',
'丽水|lishui|ls',
'合肥|hefei|hf',
'芜湖|wuhu|wh',
'蚌埠|bengbu|bb',
'淮南|huainan|hn',
'马鞍山|maanshan|mas',
'淮北|huaibei|hb',
'铜陵|tongling|tl',
'安庆|anqing|aq',
'黄山|huangshan|hs',
'滁州|chuzhou|cz',
'阜阳|fuyang|fy',
'宿州|suzhou|sz',
'六安|liuanla|la',
'亳州|haozhou|hz',
'池州|chizhou|cz',
'宣城|xuancheng|xc',
'福州|fuzhou|fz',
'厦门|xiamen|xm',
'莆田|putian|pt',
'三明|sanming|sm',
'泉州|quanzhou|qz',
'漳州|zhangzhou|zz',
'南平|nanping|np',
'龙岩|longyan|ly',
'宁德|ningde|nd',
'南昌|nanchang|nc',
'景德镇|jingdezhen|jdz',
'萍乡|pingxiang|px',
'九江|jiujiang|jj',
'新余|xinyu|xy',
'鹰潭|yingtan|yt',
'赣州|zhangzhou|zz',
'吉安|jian|ja',
'宜春|yichun|yc',
'抚州|fuzhou|fz',
'上饶|shangrao|sr',
'济南|jinan|jn',
'青岛|qingdao|qd',
'淄博|zibo|zb',
'枣庄|zaozhuang|zz',
'东营|dongying|dy',
'烟台|yantai|yt',
'潍坊|weifang|wf',
'济宁|jining|jn',
'泰安|taian|ta',
'威海|weihai|wh',
'日照|rizhao|rz',
'莱芜|laiwu|lw',
'临沂|linyi|ly',
'德州|dezhou|dz',
'聊城|liaocheng|lc',
'滨州|binzhou|bz',
'菏泽|heze|hz',
'郑州|zhengzhou|zz',
'开封|kaifeng|kf',
'洛阳|luoyang|ly',
'平顶山|pingdingshan|pds',
'安阳|anyang|ay',
'鹤壁|hebi|hb',
'新乡|xinxiang|xx',
'焦作|jiaozuo|jz',
'濮阳|puyang|py',
'许昌|xuchang|xc',
'漯河|luohe|lh',
'三门峡|sanmenxia|smx',
'南阳|nanyang|ny',
'商丘|shangqiu|sq',
'信阳|xinyang|xy',
'周口|zhoukouo|zk',
'驻马店|zhumadian|zmd',
'武汉|wuhan|wh',
'黄石|huangshi|hs',
'十堰|shiyan|sy',
'宜昌|yichang|yc',
'襄樊|xiangfan|xf',
'鄂州|ezhou|ez',
'荆门|jingmen|jm',
'孝感|xiaogan|xg',
'荆州|jingzhou|jz',
'黄冈|huanggang|hg',
'咸宁|xianning|xn',
'随州|suizhou|sz',
'恩施土家族苗族自治州|enshitujiazumiaozuzizhizhou|estjzmzzzz',
'长沙|changsha|cs',
'株洲|zhuzhou|zz',
'湘潭|xiangtan|xt',
'衡阳|hengyang|hy',
'邵阳|shaoyang|sy',
'岳阳|yueyang|yy',
'常德|changde|cd',
'张家界|zhangjiajie|zjj',
'益阳|yiyang|yy',
'郴州|chenzhou|cz',
'永州|yongzhou|yz',
'怀化|huaihua|hh',
'娄底|loudi|ld',
'湘西土家族苗族自治州|xiangxitujiazumiaozuzizhizhou|xxtjzmzzzz',
'广州|guangzhou|gz',
'韶关|shaoguan|sg',
'深圳|shenzhen|sz',
'珠海|zhuhai|zh',
'汕头|shantou|st',
'佛山|foshan|fs',
'江门|jiangmen|jm',
'湛江|zhanjiang|zj',
'茂名|maoming|mm',
'肇庆|zhaoqing|zq',
'惠州|huizhou|hz',
'梅州|meizhou|mz',
'汕尾|shanwei|sw',
'河源|heyuan|hy',
'阳江|yangjiang|yj',
'清远|qingyuan|qy',
'东莞|dongguan|dg',
'中山|zhongshan|zs',
'潮州|chaozhou|cz',
'揭阳|jieyang|jy',
'云浮|yunfu|yf',
'南宁|nanning|nn',
'柳州|liuzhou|lz',
'桂林|guilin|gl',
'梧州|wuzhou|wz',
'北海|beihai|bh',
'防城港|fangchenggang|fcg',
'钦州|qinzhou|qz',
'贵港|guigang|gg',
'玉林|yulin|yl',
'百色|baise|bs',
'贺州|hezhou|hz',
'河池|hechi|hc',
'来宾|laibin|lb',
'崇左|chongzuo|cz',
'海口|haikou|hk',
'三亚|sanya|sy',
'重庆|chongqing|cq',
'成都|chengdu|cd',
'自贡|zigong|zg',
'攀枝花|panzhihua|pzh',
'泸州|luzhou|lz',
'德阳|deyang|dy',
'绵阳|mianyang|my',
'广元|guangyuan|gy',
'遂宁|suining|sn',
'内江|neijiang|nj',
'乐山|leshan|ls',
'南充|nanchong|nc',
'眉山|meishan|ms',
'宜宾|yibin|yb',
'广安|guangan|ga',
'达州|dazhou|dz',
'雅安|yaan|ya',
'巴中|bazhong|bz',
'资阳|ziyang|zy',
'阿坝藏族羌族自治州|abazangzuqiangzuzizhizhou|abzzqzzzz',
'甘孜藏族自治州|ganzizangzuzizhizhou|gzzzzzz',
'凉山彝族自治州|liangshanyizuzizhihou|lsyzzzz',
'贵阳|guiyang|gy',
'六盘水|liupanshui|lps',
'遵义|zunyi|zy',
'安顺|anshun|as',
'毕节|bijie|bj',
'铜仁|tongren|tr',
'黔西南布依族苗族自治州|qianxinanbuyizumiaozuzizhizhou|qxnbyzmzzzz',
'黔东南苗族侗族自治州|qiandongnanmiaozudongzuzizhizhou|qdnmzdzzzz',
'黔南布依族苗族自治州|qiannanbuyizumiaozuzizhizhou|qnbyzmzzzz',
'昆明|kunming|km',
'曲靖|qujing|qj',
'玉溪|yuxi|yx',
'保山|baoshan|bs',
'昭通|zhaotong|zt',
'丽江|lijiang|lj',
'普洱|puer|pe',
'临沧|lincang|lc',
'楚雄彝族自治州|chuxiongyizuzizhizhou|cxyzzzz',
'红河哈尼族彝族自治州|honghehanizuyizuzizhizhou|hhhnzyzzzz',
'文山壮族苗族自治州|wenshanzhuangzumiaozuzizhizhou|wszzmzzzz',
'西双版纳傣族自治州|xishuangbannadaizuzizhizhou|xsbndzzzz',
'大理白族自治州|dalibaizuzizhizhou|dlbzzzz',
'德宏傣族景颇族自治州|dehongdaizujingpozuzizhizhou|dhdzjpzzzz',
'怒江傈僳族自治州|nujianglisuzuzizhizhou|njlszzzz',
'迪庆藏族自治州|diqingzangzuzizhizhou|dqzzzzz',
'拉萨|lasa|ls',
'昌都地区|changdudiqu|cddq',
'山南地区|shannandiqu|sndq',
'日喀则地区|rikazediqu|rkzdq',
'那曲地区|naqudiqu|nqdq',
'阿里地区|alidiqu|aldq',
'林芝地区|linzhidiqu|lzdq',
'西安|xian|xa',
'铜川|tongchuan|tc',
'宝鸡|baoji|bj',
'咸阳|xianyang|xy',
'渭南|weinan|wn',
'延安|yanan|ya',
'汉中|hanzhong|hz',
'榆林|yulin|yl',
'安康|ankang|ak',
'商洛|shangluo|sl',
'兰州|lanzhou|lz',
'嘉峪关|jiayuguan|jyg',
'金昌|jinchang|jc',
'白银|baiyin|by',
'天水|tianshui|ts',
'武威|wuwei|ww',
'张掖|zhangye|zy',
'平凉|pingliang|pl',
'酒泉|jiuquan|jq',
'庆阳|qingyang|qy',
'定西|dingxi|dx',
'陇南|longnan|ln',
'临夏回族自治州|linxiahuizuzizhizhou|lxhzzzz',
'甘南藏族自治州|gannanzangzuzizhizhou|gnzzzzz',
'西宁|xining|xn',
'海东地区|haidongdiqu|hddq',
'海北藏族自治州|haibeizangzuzizhizhou|hbzzzzz',
'黄南藏族自治州|huangnanzangzuzizhizhou|hnzzzzz',
'海南藏族自治州|hainanzangzuzizhizhou|hnzzzzz',
'果洛藏族自治州|guoluozangzuzizhizhou|glzzzzz',
'玉树藏族自治州|yushuzangzuzizhizhou|yszzzzz',
'海西蒙古族藏族自治州|haiximengguzuzangzuzizhizhou|hxmgzzzzzz',
'银川|yinchuan|yc',
'石嘴山|shizuishan|szs',
'吴忠|wuzhong|wz',
'固原|guyuan|gy',
'中卫|zhongwei|zw',
'乌鲁木齐|wulumuqi|wlmq',
'克拉玛依|kelamayi|klmy',
'吐鲁番地区|tulufandiqu|tlfdq',
'哈密地区|hamidiqu|hmdq',
'昌吉回族自治州|changjihuizuzizhizhou|cjhzzzz',
'博尔塔拉蒙古自治州|boertalamengguzizhizhou|betlmgzzz',
'巴音郭楞蒙古自治州|bayinguolengmengguzizhizhou|byglmgzzz',
'阿克苏地区|akesudiqu|aksdq',
'克孜勒苏柯尔克孜自治州|kezilesukeerkezizizhizhou|kzlskekzzzz',
'喀什地区|kashidiqu|kskq',
'和田地区|hetiandiqu|htdq',
'伊犁哈萨克自治州|yilihasakezizhizhou|ylhskzzz',
'塔城地区|tachengdiqu|tcdq',
'阿勒泰地区|aletaidiqu|altdq']; 

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
    	var th=this;
       $(function(){
       		th.EVENT_JQUERY_WINDOW();
       });
        
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
