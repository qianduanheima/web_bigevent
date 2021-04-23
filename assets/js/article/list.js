$(function() {
    var form = layui.form
    var layer = layui.layer
        //获取文章列表初始参数
    var o = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: '',
        }
        //美化时间
    template.defaults.imports.dates = function(date) {
        var dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth()
        m = m < 10 ? '0' + m : m
        var d = dt.getDate() + 1
        d = d < 10 ? '0' + d : d
        var hh = dt.getHours()
        hh = hh < 10 ? '0' + hh : hh
        var mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        var ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //渲染列表
    textList()
    getCates()
    $('#cate-form').on('submit', function(e) {
            e.preventDefault()
            o.cate_id = $('[name=name]').val()
            o.state = $('[name=state]').val()
            textList()
        })
        //获取分类下拉
    function getCates() {
        $.get('/my/article/cates', function(res) {
            var catesStr = template('classify', res)
            $('[name=name]').html(catesStr)
            form.render()
        })
    }
    //删除
    $('tbody').on('click', '.btn-del', function() {
            var id = $(this).attr('data-id')
                //eg1
            layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        if (res.status != 0) {
                            layer.msg(res.message)
                        }
                        layer.msg(res.message)
                    }
                })
                layer.close(index);
                textList()
                getCates()
            });


        })
        //跳转编辑文章页面
    $('tbody').on('click', '.btn-edit', function() {
        location.href = '/article/edit.html' + '?' + 'id' + '=' + $(this).attr('data-id')
    })

    //渲染列表函数
    function textList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: o,
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                var listStr = template('list', res)
                $('tbody').html(listStr)
                    // 分页
                layui.use('laypage', function() {
                    var laypage = layui.laypage;

                    //执行一个laypage实例
                    laypage.render({
                        elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
                        count: res.total, //数据总数，从服务端得到
                        limit: o.pagesize, //每页显示的条数curr
                        curr: o.pagenum, //初始显示的页码
                        //[显示数据总数，开启页数下拉栏，上一页按钮，分页按钮，下一页按钮，跳转页数组件]
                        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                        limits: [2, 5, 10, 20],
                        // 回调行数：点击分页按钮或者运行laypage.render触发
                        jump: function(obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            // first 如果通过laypage.render触发则为true
                            o.pagenum = obj.curr
                                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                            o.pagesize = obj.limit
                                // 根据最新的 q 获取对应的   
                                //页面首次不执行
                            if (!first) {
                                //do something
                                textList()
                            }
                        }
                    });
                });
            }
        })
    }

























})