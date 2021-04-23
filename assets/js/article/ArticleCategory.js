$(function() {
    var layer = layui.layer
    var form = layui.form
    articleList()

    function articleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            data: {},
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('失败')
                }
                var str = template('articleIist', res)
                $('tbody').html(str)
            }
        })

    }
    var popup;
    $('#addCategory').on('click', function() {
            popup = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $('#categoryForm').html(),
                area: ['500px', '230px']
            });
        })
        //添加分类
    $('body').on('submit', '#add', function(e) {
            e.preventDefault()
            console.log($(this).serialize())
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(popup)
                    articleList()
                }
            })
        })
        //绑定编辑按钮事件
    var edit;
    $('tbody').on('click', '.btn-edit', function(e) {
        edit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#editCategory').html(),
            area: ['500px', '230px']
        });
        //渲染编辑表单
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            data: {},
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取失败')
                }
                form.val("formTest", res.data);

            }
        })

        $('body').on('submit', '#edit', function(e) {
            e.preventDefault()
            console.log($(this).serialize())
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(edit)
                    articleList()
                }
            })
        })
    })
    $('tbody').on('click', '.btn-del', function() {
        var id = $(this).attr('data-id')
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                data: {},
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg('获取失败')
                    }
                    layer.msg('删除成功')
                }
            })

            layer.close(index);
        });
    })
})