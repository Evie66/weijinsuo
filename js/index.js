$(function () {
    banner();
    initMobileTab();
    $('.red').tooltip();
    $('.green').tooltip();
});
var banner = function () {
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                datatype: 'json',
                data: '',
                success: function (data) {
                    window.data = data;
                    localStorage.setItem('data', JSON.stringify(data));
                    callback && callback(window.data);
                }
            });
        }
    }
    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768 ? true : false;
            console.log(isMobile);
            var pointHtml = template('pointTemplate', {list: data});
            var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
            console.log(pointHtml);
            console.log(imageHtml);
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    }
    $(window).on('resize', function () {
        render();
    }).trigger('resize');
    // 移动端手势切换
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
        // console.log(e);
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            // 左滑
            if (distanceX < 0) {
                console.log('左滑');
                $('.carousel').carousel('next');
            // 右滑
            } else {
                console.log('右滑');
                $('.carousel').carousel('prev');
            }
        }
    });
}

var initMobileTab=function () {
    // 1.解决换行问题
    var $nabTabs=$('.wjs_product .nav-tabs');
    var width=0;
    $nabTabs.find('li').each(function (i,item) {
       var $currentLi=$(this);
       var liWidth=$currentLi.outerWidth(true);
       /*
       * width()    内容
       * innerWidth()   内容+内边距
       * outerWidth()   内容+内边距+边框
       * outerWidth(true)   内容+内边距+边框+外边距
       * */
       width+=liWidth;
    });
    console.log(width);
    $nabTabs.width(width);
    // 2.修改结构使之区域滑动结构
    // 3.实现滑动效果
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
    });
}
