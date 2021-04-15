$(function() {

    console.log(111);
    $('#link-log').on('click', function() {
        console.log(111);
        $('.loginForm').hide()
        $('.registeredForm').show()
    })
    $('#link-reg').on('click', function() {
        $('.loginForm').show()
        $('.registeredForm').hide()
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repa: function(value) {
                var pa = $('#form_reg [name=password]').val()
                if (pa !== value) {
                    return '两次密码不一致！'
                }
            }

        })
        // 登录

    $('#form_login').on('submit', function(e) {
            console.log($("#form_login").serialize());
            // 1. 阻止默认的提交行为
            e.preventDefault()
            $.post(
                '/api/login',
                $("#form_login").serialize(),
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('登录成功！')
                        // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                        // 跳转到后台主页
                    location.href = '/index.html'
                })

        })
        //注册
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        $.post(
            '/api/reguser',
            $("#form_reg").serialize(),
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                $('#link-reg').click()
            })

    })

})