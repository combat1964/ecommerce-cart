/**
 * Just to make sure that add to cart handler is attached
 */
$(function() {
    $(document).on('click', 'a.tcart-add[data-pid]', function(e) {
        e.preventDefault();
        var gotocart = $(this).data('gotocart') === "no" ? true : false,
            pid  = $(this).data('pid'),
            qty = 1,
            checkoutUrl =  $('#website_url').val() + 'plugin/cart/run/checkout';
        if($('input[name="productquantity-' + pid + '"]').length > 0){
            qty = parseInt($('input[name="productquantity-' + pid + '"]').val());
            if(isNaN(qty)){
                qty = 1;
            }
        }
        $.ajax({
            url: $('#website_url').val()+'plugin/cart/run/cart/',
            type: 'POST',
            dataType: 'json',
            data: {
                pid     : pid,
                options : $('div[data-productid=' + pid + '] *').serialize(),
                qty     : qty
            },
            success: function(response){
                if (!response.error){
                    if (gotocart) {
                        showConfirm("Go to the cart?", function () {
                            window.location.href = checkoutUrl;
                        }, function () {
                            window.location.reload();
                        })
                    } else {
                        window.location.href = checkoutUrl;
                    }
                } else {
                    showMessage(response.responseText.msg, 1);
                }
            }
        });
    })
});