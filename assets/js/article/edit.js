$(function() {
    //创建富文本
    initEditor()
    var form = layui.form
    var layer = layui.layer

    var  params  =  location.search.substr(1);  // uname=andy           
            // 2. 利用=把字符串分割为数组 split('=');        
    var  arr  =  params.split('=');        

    var id = arr[1]
        //文章分类
    $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            data: {},
            success: function(res) {

                if (res.status != 0) {
                    layer.msg(res.message)
                }
                var str = template('aaa', res)

                $('[name=cate_id]').html(str)
                form.render()
            }
        })
        //获取文章数据并渲染到表单
    $.ajax({
        method: 'GET',
        url: '/my/article/' + id,
        data: {},
        success: function(res) {
            console.log(res);
            if (res.status != 0) {
                layer.msg(res.message)
            }
            console.log(res.data.cate_id);
            $('[name=cate_id]').val(res.data.cate_id)
            form.val("release", {
                Id: res.data.Id,
                title: res.data.title,
                //cate_id: res.data.cate_id,
                content: res.data.content
            });
            //$('#image').attr('src', 'http://api-breakingnews-web.itheima.net' + res.data.cover_img)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', 'http://api-breakingnews-web.itheima.net' + res.data.cover_img) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        }
    })

    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#cover').on('click', function() {
            $('[type=file]').click()

        })
        //文件选择框
    $('[type=file]').on('change', function(e) {
            console.log(e);
            var file = e.target.files
            if (file.length <= 0) {
                return layer.msg('请选择图片上传')
            }
            var newImgURL = URL.createObjectURL(file[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

        })
        //通过按钮确定是否为发布
    var isState = '已发布'
    $('#draft').on('click', function() {
            isState = '草稿'
        })
        //更新文章
    $('#release-form').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])

        fd.append('state', isState)
        fd.append('Id', id)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                $.ajax({
                    method: 'POST',
                    url: '/my/article/edit',
                    data: fd,
                    // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(111);
                        console.log(res);
                        if (res.status != 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg(res.message)
                        location.href = '/article/list.html'

                    }
                })
            })
    })




























})