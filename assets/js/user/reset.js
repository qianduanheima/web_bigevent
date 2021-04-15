$(function() {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            if ($('.layui-form [name=newPwd]').val() !== value) {
                return '两次输入密码不一样';
            }

        }
    })
    $('.layui-form').on('submit', function(e) {
        console.log(11);
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功');
                form.val("formTest", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    "oldPwd": "" // "name": "value"
                        ,
                    "newPwd": "",
                    "rePwd": ""
                });
            }
        })
    })
})