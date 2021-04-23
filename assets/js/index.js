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
                 //渲染头像
             updateData()
             $('.layui-logo').on('click', function() {
                 clickArticleList()
             })
         })

         function clickArticleList() {
             console.log(1);
             $('#remove-kArticle-list').attr('class', '')
             $('#clic-kArticle-list').attr('class', 'layui-this')
         }
         //渲染头像

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