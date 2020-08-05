layui.use(['layer'], function () {
    var layer = layui.layer;


    // console.log(APICartAdd);

    var gid = queryString('gid');

    $(document).on('click', '.uparrow', function () {
        // console.log(666)
        // console.log(this);
        // $(this).css('border-color', 'rgb(132, 95, 63)').siblings().css('border-color', 'rgb(236, 236, 236)')
        $('.main img').attr('src', $(this).find('img').attr('src'))
    });

    $(document).on('click', '#container', function () {
        // 拿uid
        var uid = getCookie('login_user');

        console.log($('.pricesss').html());

        if (!uid) {
            layer.confirm('您还未登录，是否去登录', {
                btn: ['是，现在就去', '别慌，稳住'] //按钮
            }, function () {
                // layer.msg('的确很重要', { icon: 1 });
                sessionStorage.login_back = location.href;
                location.href = './login.html';
            }, function () {
                layer.msg('好的');
            });
        } else {
            APICartAdd({
                uid,
                gid,
                img: $('#imgsss').attr('src'),
                name: $('.goods-name').html(),
                price: $('.pricesss').html(),
                count: 1
            }).then(({ code, msg }) => {
                if (code) {
                    layer.confirm('立即去购物车', {
                        btn: ['是，现在就去', '别慌，稳住'] //按钮
                    }, function () {
                        location.href = './cart.html';
                    }, function () {
                        layer.msg('好的');
                    });
                } else {
                    layer.msg(msg);
                }
            })
        }
    });

    APIGoodsDetail({
        gid: gid
    }).then(({ code, data: { desc, img, imgs, name, price, goods_id, detail } }) => {


        var prices = parseFloat(price)
        // console.log(price);


        // console.log(JSON.parse(imgs));

        var html = `
            <div style="margin:0px auto;">
            <div class="crumb" style="width:100%;height:20px;overflow:hidden;">
                <span><a href="../index.html" alt="" style="color: #615146;" title="">首页</a>&nbsp;&gt;</span>
                <em id="last_name">${name}</em>
            </div>
        </div>
        <div class="dp-main-fl clearfix" style="width:100%;">
            <div class="Product-Details " id="goods-viewer">

                <div id="main-info" class="main-info clearfix">
                    <div class="goods-leftbox clearfix">
                        <div style="position: relative;width:100%;">
                            <div style="width:100%;" class="clearfix;" >
                                <div class="goodspic sideborder" style="width:350px;height:350px;margin: 0px auto;position: relative;">
                                    <p style="width:500px; height:500px; position: absolute; top:0; left: 370px; overflow: hidden; display: block;" class="zoom-icon">
                                    <img src="${img}" title="点击查看大图" alt="查看大图" style="width:800px;height:800px;" class="bigimg">
                                    </p>
                                    <div class="goods-detail-pic spec-pic" data-pic-type="middle"
                                        style=" overflow:hidden; margin:0 auto;display:table-cell; width:350px;height:350px;"
                                        bigpicsrc="${img}">
                                            <img id='imgsss' src="${img}"style="color:#fff; width:350px;height:350px; overflow:hidden;font-family:Arial;display:block; text-align:center;"
                                                alt="棉麻褶皱毛巾被" style="width:350px;height:350px;overflow:hidden;">
                                    </div>
                                </div>
                            </div>
                            <div class="picscroll clearfix">
                                <div class="scrollarrow totop visible" title="向左"></div>
                              
                                <div class="goods-detail-pic-thumbnail goods-detail-x pics" style="position:relative">
                                    <ul class="goods-detail-pic-thumbnail pics-content"
                                        style="position: absolute; left: 0px; display: inline; width: 1690px;">
                                        <li class="" img_id="7a6178aef8f600361cd517acf9284735" style="float: left;">
                                            <div class="uparrow"></div>
                                            <a href="#" target="_blank"
                                                imginfo="{small:'${img}',big:'${img}'}">
                                                <img src="${img}"
                                                    id="select_pic" alt="棉麻褶皱毛巾被" width="40" height="40">
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="scrollarrow tobottom visible" title="向右"></div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="goods-leftbox clearfix" style="width:600px;font-family: '微软雅黑'">
                        <h1 class="goods-name">${name}</h1>
                        <div class="product-id clearfix">
                            <span>商品编码：</span>
                            <span id="goodsBn" updatespec="text_bn">${goods_id}</span>
                        </div>
                      
                        <div class="goods-price-box clearfix" style="font-size: 24px;color:#7F5B42;">
                                    <span class="goodsprice" >￥<i class='pricesss'>${prices}</i></span>
                        </div>
                        <div class="goods-price-box clearfix" style="margin-bottom:5px;">
                            <span
                                style="display:inline-block;width:50px;text-align:center;font-size: 12px;color:#ffffff;background:#7F5B42;padding:2px 5px;font-weight: bold;border-radius:3px 3px;">会员价</span>
                            <span class="mlvprice"
                                style="color:#7F5B42;padding-left:10px;">${price}</span>
                            <a style="color:#ff0000;text-decoration: none;" target="_blank"
                                href="#">如何成为会员？</a>
                        </div>

                        <div id="promotion_show" class="clearfix" style="margin-bottom: 5px;">
                            <span
                                style="display:inline-block;width:50px;text-align:center;font-size: 12px;color:#ffffff;background:#b1544f;padding:2px 5px;font-weight: bold;border-radius:3px 3px;">促销</span>
                            <span id="promotion_msg" style="padding-left:10px;">满88包邮</span>
                        </div>

                        <div class="score-wrap">
                            <ul>
                                <li>
                                    <p class="score-num">37</p>
                                    <p class="score-name">销量</p>
                                    <i class="score-tag-right"></i>
                                </li>
                                <li>
                                    <p class="score-num">0</p>
                                    <p class="score-name">用户评论数</p>
                                </li>
                                <li>
                                    <p class="score-num">598</p>
                                    <p class="score-name">评论送积分</p>
                                    <i class="score-tag-left"></i>
                                </li>
                            </ul>
                        </div>

                        <div class="tagline">${desc}。</div>

                        <div id="goods-spec" class="goods-spec">

                            <div class="spec-item specItem">
                                <label><span><em>颜色：</em></span></label>
                                <div class="rightdiv1">
                                    <ul>
                                        <li>
                                            <a href="#"
                                                specvid="15203939761" specid="10"> <span>
                                                    <nobr>本白</nobr>
                                                </span>
                                                <i title="点击取消选择">&nbsp;</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="buyinfo clearfix">
                            <label>数量：</label>
                            <div style="width:120px;" class="ctn Numinput">
                                <ul style="display:inline;">
                                    <li style="display:inline; height:20px; line-height:20px;">
                                    <input type="text"
                                            numtype="int" id="pro_count" name="goods[num]" value="1" size="5"
                                            ></li>

                                </ul>
                            </div>

                        </div>

                        <div class="hightline ">
                            <div
                                style="clear:both; height:10px; overflow:hidden; border-top:1px #e6e6e6 solid; margin-left:10px;margin-top:5px; margin-right:20px;">
                            </div>
                            <div class="btnBar clearfix" style="visibility: visible;">
                                <div class="clown flt btnwrap">
                                    <input class="actbtn btn-buy" id="container" value="加入购物车" type="submit"
                                     title="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
                <div class="product-info-box clearfix">
                    <div class="tab-left clearfix">
                        <div class="cat_list border-dcdcdc">
                            <h3>相关分类</h3>
                            <ul class="clearfix">
                                <li><a href="#" target="_blank">床品件套</a></li>
                                <li><a href="#" target="_blank">被子枕头</a></li>
                                <li><a href="#" target="_blank">夏凉床品</a></li>
                                <li><a href="#" target="_blank">智能家居</a></li>
                            </ul>
                        </div>

                        <div class="column_right border-dcdcdc" id="mainTab">
                            <h3>热销商品</h3>
                            <div class="box_c">
                                <a href="#" target="_blank"><img class="pic_c"
                                        src="${img}">
                                </a>
                                <h4><a href="#" target="_blank">${name}</a></h4>
                                <p class="p_text"><strong class="price" style="width:50px">￥${price}</strong></p>
                            </div>
                        </div>
                    </div>

                    <div class="tab-right product-desc clearfix" id="product_box">
                        <ul class="tab-nav float-nav-block" id="auto-float-nav"
                            style="background-color: white ; z-index: 100;">
                            <li onclick="product_tag(this,'pro_comment')" class="on"><span id="xiangqing">商品详情</span>
                            </li>
                            <li onclick="product_tag(this,'product_comment')" id="tag_3">
                                <span>用户评论
                                </span>
                            </li>
                        </ul>
                        <div style="width:700px;" >
                       ${detail}
                    </div>
                    </div>
                </div>
            </div>
        </div>
            `
        $('#mainl').html(html);


    })
})

$(document).on('mouseover', '#imgsss', function () {
    var img = $(this).find('img')[0];
    img = $(img).attr('src');
    $(this).parents('#mainl').find('.zoom-icon img').attr({'src':img});
    $(this).parents('#mainl').find('.zoom-icon img').css({"display":"block"});
});

$(document).on('mouseover', '#imgsss', function () {
    $(this).parents('#mainl').find('.zoom-icon img').css({"display":"block"});
});

$(document).on('mouseover', '#imgsss', function (e) {
    var X=e.offsetX;
    var Y=e.offsetY;
    $(this).parents('#mainl').find('.zoom-icon img').css({"top":-Y,"left":-X});
});










