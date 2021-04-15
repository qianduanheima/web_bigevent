         $(function() {
             var layer = layui.layer
             $('#exit').on('click', function() {
                 console.log(1);
                 layer.confirm('是否退出', { icon: 3, title: '提示' }, function(index) {
                     //清除token
                     localStorage.removeItem('token')
                         // 2. 重新跳转到登录页面
                     location.href = '/login.html'
                         //跳转到登录页
                     layer.close(index);
                 });
             })
         })
         updateData()

         function updateData() {
             $.ajax({
                 url: "/my/userinfo",
                 type: 'GET',
                 data: {},
                 success: function (res)  {
                     if (res.status !== 0) {
                         return layer.msg('获取信息失败');
                     }
                     var username = res.data.nickname || res.data.username
                     $('.side-avatar i').html(username)
                     if (res.data.user_pic == null) {
                         $('.layui-nav-img').hide()
                         $('.side-avatar span').show().html(username[0].toUpperCase())
                         $('#z').show().html(username[0].toUpperCase())
                     } else if (res.data.user_pic) {
                         $('.layui-nav-img').show().attr('src', res.data.user_pic)
                         $('.side-avatar span').hide()
                         $('#z').hide()
                     }
                 }
             })
         }
         //      // 全局统一挂载 complete 回调函数
         //  options.complete = function(res) {
         //      // console.log('执行了 complete 回调：')
         //      // console.log(res)
         //      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
         //      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
         //          // 1. 强制清空 token
         //          localStorage.removeItem('token')
         //              // 2. 强制跳转到登录页面
         //          location.href = '/login.html'
         //      }
         //  }