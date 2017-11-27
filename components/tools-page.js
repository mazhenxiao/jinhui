/**
 *  <Page total={this.state.pageTotal} count={this.state.pageCount} callback={ this.Bind_Click_Page.bind(this) } />
 *  total:页数
 * count：总条数
 * callback：点击回调
 */
import React from 'react';
class Page extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            current: 1

        }
    }
    Bind_click_list(arg) {
        let callback = this.props.callback || (function () { });
        this.setState({
            current:arg
        },ev=>{
            callback(arg);
        })
    }


    render() {
        let arr = [], total = this.props["total"] || 0, count = this.props["count"] || 0
        for (var i = 1; i <= total; i++) {
            arr.push(<li key={i} className={i == this.state.current ? "active" : ""} onClick={this.Bind_click_list.bind(this, i)}><a href="javascript:;">{i}</a></li>)
        }
        return <nav aria-label="Page navigation">
            <span className="pageTotal">{count ? "共" + count + "条" : ""}</span>
            <ul className="pagination">
                {arr}
            </ul></nav>
    }
}

export default Page;