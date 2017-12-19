import "babel-polyfill";  //兼容ie
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from "react-router";
import iss from "./iss.js";//公共类
import rootRout from "./router";//路由
import ToolsList from "../components/tools-list.js";//头部
import ToolsTree from "../components/tools-leftTree.js";//左侧树形
import appConfig from '../app.config';
import { setTimeout } from "timers";

iss.use({Router, Route, hashHistory});

console.log("appConfig", appConfig);

/* 公共页面js */
class Main extends Component {
    constructor(arg) {
        super(arg);
        var th = this;
        this.state = {
            path: "index"  //默认
        }

    }

    componentDidMount() {
        (!iss.userInfo) && this.getUser(); //如果用户从没登陆过则ajax获取用户信息
        this.TransHeight();
        this.bindScroll();
        this.bingBar();
        window.onresize = this.TransHeight;
    }

    getUser() {  //获取登陆信息

        iss.ajax({
            url: "/Account/IGetUserInfo",
            success(da) {
                iss.userInfo = da; //获取数据
                sessionStorage.setItem("userInfo", JSON.stringify(da));//存入session
            }
        })
    }

    TransHeight() {
        let JH_Nav = document.querySelector(".JH-Nav"), JH_Content = document.querySelector(".JH-Content"), h = 640;
        let rh = JH_Content.offsetHeight, lh = JH_Nav.offsetHeight,
            $wh = Math.max(document.body.clientHeight, document.documentElement.clientHeight) - 60;
        let $h = Math.max(rh, lh, $wh, 640);
        JH_Nav.style.minHeight = $h + "px";
        JH_Content.style.minHeight = $h - 10 + "px";
    }

    bindScroll() {
        let JHNav = $(".JH-Nav"), win = $(window), bs = $(".icon-bar");
        window.onscroll = ev => {
            let top = win.scrollTop(), left = win.scrollLeft(), icons = $(".icon-bar");

            setTimeout(arg=>{
                if (top >= 60) {
                    /*如果左侧树，处于隐藏状态，则不固定*/
                    //  if(JHNav.hasClass("active")) return false;
                    JHNav.addClass("fixed");
                } else {
                    JHNav.removeClass("fixed");
                }
            })

        }
    }

    bingBar() {
        var cont = $(".JH-RightBox"), icons = $(".icon-bar");
        icons.bind("click.bar", e => {
            let el = $(e.currentTarget),
                pa = $(el.attr("target"));
            //if(pa.hasClass("fixed")) return false;

            if (pa.hasClass("active")) {
                pa.removeClass("active");
                cont.removeClass("active");
            } else {
                pa.addClass("active");
                cont.addClass("active");
            }

            icons.trigger("EVENT_TOGGLEBAR");
        });
    }

    /**
     * 菜单点击回掉
     * arg   string   需要跳转url地址
     */
    ToolsListCallback = arg => { //头部点击回掉
        window.location = arg;
        this.setState({
            path: arg.split("#")[1]
        })


    }

    render() {
        return <article>
            <header className="JH-Header w1200" id="JH-Header">
                {/*  <!-- 头部导航 tools-list.js --> */}
                <ToolsList callback={this.ToolsListCallback}/>
            </header>
            <section className="w1200 container JH-Content">
                <nav className="JH-Nav Left" id="JH-Nav">
                    <ToolsTree path={this.state.path}/>
                </nav>
                {/*   <!-- 路由 --> */}
                <article className="JH-RightBox">
                    <section className="JH-Content">
                        <article id="JH-Router">
                            <Router history={hashHistory} routes={rootRout}></Router>
                        </article>
                    </section>
                </article>
                {/*   <!-- 路由结束 --> */}
            </section>
        </article>
    }
}

ReactDOM.render(<Main/>, document.querySelector("#jinhuiMain"))
//new main();
