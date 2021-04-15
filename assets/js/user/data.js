$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pass: [
                /^[\S]{3,12}$/, '密码必须6到12位，且不能出现空格'
            ],
        })
        // 初始化表单
    receiveInformation()
        //重置按钮
    $('#reset-data').on('click', function(e) {
            console.log(111);
            e.preventDefault()
            receiveInformation()
        })
        //提交信息
    $('.layui-form').on('submit', function(e) {
            e.preventDefault()
            UpdateInformation()

        })
        //获取信息
    function receiveInformation() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            data: {},
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                var username = res.data.username
                var nickname = res.data.nickname
                var email = res.data.email
                var id = res.data.id
                $('.layui-form-item [name=username]').val(username)
                $('.layui-form-item [name=nickname]').val(nickname)
                $('.layui-form-item [name=email]').val(email)
                $('.layui-input-block [name=id]').val(id)
            }
        })
    }
    //更新信息
    function UpdateInformation() {
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新成功能')
                receiveInformation()
            }
        })
    }


})