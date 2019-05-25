import React from 'react';
import fetchJSONP from 'fetch-jsonp';
import { Spin, Alert, Pagination } from 'antd';
import MovieItem from './MovieItem';

class MovieList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movie:[],//电影列表
            nowPage:parseInt(props.match.params.page) || 1, //当前页码值
            pageSize:12,   //每页显示多少条数据
            total:0,  //当前电影分类下,总共有多少条数据
            isLoading:true, 
            movieType:props.match.params.type   //保存一下要获取的电影的类型
        };
    };
    componentWillMount(){
        // console.log('ok'); 
        this.loadMovieListByTypeAndPage()
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        this.setState({
            isLoading:true,
            nowPage:nextProps.match.params.page,
            movieType:nextProps.match.params.type
        },function(){
            this.loadMovieListByTypeAndPage();
        })
    }
    loadMovieListByTypeAndPage = ()=>{
        // const start = this.state.pageSize * (this.state.nowPage - 1);
        // const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
        // fetchJSONP(url)//用fetch受同源策略的限制,所以用第三方的fetch-jsonp
        // .then(response => response.json())
        // .then(data => {
        //     // console.log(data)
        //     this.setState({
        //         isLoading:false,
        //         movie:data.subjects,    //为电影列表重新赋值
        //         total:data.total,      //电影总数量
        //     })
        // })

        // const data1 = require('../../test_data/url1.json');
        const data = require('../../coming_soon.json/' + this.state.movieType + '.json');
        // console.log(data1);
        console.log(data);
        this.setState({
            isLoading:false,
            movie:data.subjects,    //为电影列表重新赋值
            total:data.total,      //电影总数量
        })
    }
    renderList = () => {
        if(this.state.isLoading){
            return (
                <Spin tip="Loading...">
                    <Alert
                        message="正在请求电影列表"
                        description="精彩内容马上呈现..."
                        type="info"
                        />
                </Spin>
            );
        }else{
            return (
                <div>
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                    {this.state.movie.map(item => <MovieItem key={item.id} {...item} />)}
                </div>
                <Pagination defaultCurrent={parseInt(this.state.nowPage)} pageSize={this.state.pageSize} total={this.state.total} />
                </div>
            );
        }
    }
    render(){
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

export default MovieList;