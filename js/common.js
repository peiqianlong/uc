(function (doc, win) {
    var dpr = window.devicePixelRatio || 1;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            // 设置data-dpr属性，留作的css hack之用
            docEl.setAttribute('data-dpr', dpr);
            var delObj = document.getElementById("loading");
            if (delObj) {
                $("#loading").remove();
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function () {

    $('input').attr({"autocomplete":"new-password"})
    $(".meun-btn").click(function (event) {
        $(".showMenu").animate({
            "right": "-200",
            "opacity": "0",
        },200);
        $(this).find(".showMenu").animate({
            "right": "0",
            "opacity": "1",
        },200);
        $(this).css("overflow", "unset")
        // debugger
        event.stopPropagation();
    });
    $("body").click(function () {
        $(".showMenu").animate({
            "right": "-200",
            "opacity": "0",
        },200);
        $(".meun-btn").css("overflow", "hidden")
    });
    $(".operation").click(function (event) {
    })
    var currentpage = 1  // 默认当前页为第一页
    ajaxTest(1);  // 默认加载第一页

    function ajaxTest(num) {
        $.ajax({
            url: "http://rap2api.taobao.org/app/mock/165046/pageing",
            type: "get",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                //分页
                $("#page").paging({
                    pageNo: num,
                    totalPage: Math.ceil(data.data.totalNumber / 10),// 根据每页显示10条记录计算总页数
                    totalSize: data.data.totalNumber, // 总共多少条记录
                    callback: function (num) {
                        if (isgetpage(this.totalPage, num)) {
                            currentpage = num
                            ajaxTest(num)
                        } else {
                            return false
                        }
                    }
                })
            }
        })
    }

    //总页数，当前页（返回为true的时候去执行ajax）
    function isgetpage(totalPage, num) {
        var a = true;
        if (currentpage == num) {
            if (num == 1) {
                alert("已经是第一页啦~")
            } else if (totalPage == num) {
                alert("已经是最后一页啦~")
            } else {
                alert("已经到当前页啦~")
            }
            a = false;
        }
        return a;
    }


//改变名字弹窗

    function uploadImg() {
        alert("上传失败 暂无接口")
    }

    $("#fabu").click(function () {
        $("#Modal").fadeIn(300)
    });
    $("#closeModal").click(function () {
        $("#Modal").fadeOut(300)
    })
    //拖拽




    $(".imgupload .del").click((e)=>{
        $("#delImg").fadeIn("300")
        e.stopPropagation()
    })
    // var sortable = Sortable.create(el);
    $(".operation .del").click((e)=>{
        $("#msgDel").fadeIn("300")
        e.stopPropagation()
    })
    $(".operation .copy").click((e)=>{
        $("#msgCopy").fadeIn("300")
        e.stopPropagation()
    })
    $(".closeModal").click((e)=>{
        $(".Modal").fadeOut("300")
        e.stopPropagation()
    })
});





