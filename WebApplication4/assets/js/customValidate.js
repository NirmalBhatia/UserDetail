if (typeof (jQuery.fn.bstooltip) == "undefined") {
    jQuery.fn.bstooltip = jQuery.fn.tooltip;
}

if (!!$.fn.dataTable) {
    $.extend($.fn.dataTable.defaults, {
        "dom": '<"datatable-header"ZfBl><"datatables-processing"r><"datatable-scroll-wrap"t><"datatable-footer"ip>',
        "colvis": { restore: "Restore", showAll: "Show all", showNone: "Show none" },
        buttons: [
            {
                extend: 'colvis',
                text: '<i class="icon-grid7"></i> <span class="caret"></span>',
                className: 'btn bg-teal-400 btn-icon'
            }
        ],
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' },
        },
        select: {
            info: false
        },
        "colResize": {
            "tableWidthFixed": false,
            "rtl": true,
            "bAddFixed": false
        },
        "bProcessing": false,
        "serverSide": true,
        "info": true,
        "stateSave": true,
        "searchable": false,
        "deferRender": true,
        "Filter": false,
        "scrollY": "60vh",
        "scrollCollapse": true,
        "fixedColumns": false,
        "lengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
        "fnDrawCallback": function () {
            var datHead = $(".dataTables_wrapper .dataTables_scrollHead");
            var datbody = $(".dataTables_wrapper .dataTables_scrollBody");
            var datfoot = $(".dataTables_wrapper .dataTables_scrollFoot");

            datbody.scroll(function () {
                datHead.scrollLeft($(this).scrollLeft());
                datfoot.scrollLeft($(this).scrollLeft());
            });
            $('tbody td.Price').priceFormat({ maxAllow: 20, decPlace: 0, minusAllow: true });
            $('tbody td.DecPrice').priceFormat({ maxAllow: 20, decPlace: 2, minusAllow: true });
        }
    });
}
function requiredPassword(cfld, cmsg, minSize) {
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('title');
            cfld.bstooltip('destroy');
        }
        else {
            cfld.addClass('error');
            cfld.attr('data-toggle', 'tooltip');
            cfld.attr('title', cmsg);
            //if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    var value = cfld.val().trim();
    cfld.val(value);
    if (value.length > 0) {
        if (minSize == 0 || value.length >= minSize) {
            if (checkPassword(value)) {
                cfld.removeClass('error');
                cfld.removeAttr('data-toggle');
                cfld.removeAttr('title');
                return true;
            }
            else {
                cfld.addClass('error');
                cfld.attr('data-toggle', 'tooltip');
                cfld.attr('title', 'At least one numeric character, one lowercase letter, one uppercase letter and one special character is required.');
                if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
                    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });
                }
                else {
                    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
                }
                return false;
            }
        }
        else {
            cfld.addClass('error');
            cfld.attr('data-toggle', 'tooltip');
            cfld.attr('title', 'Password length cannot be less than ' + minSize + ' char');
            if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
                $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            }
            else {
                $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            }
            return false;
        }
    }
    else {
        cfld.addClass('error');
        cfld.attr('data-toggle', 'tooltip');
        cfld.attr('title', cmsg);
        if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
            $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        }
        else {
            $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        }
        return false;
    }

}
function requiredEmailAddress_New($ctrl, msg, allowBlank) {
    var minSize = 1;
    $ctrl.off('click');
    $ctrl.on('click', function () { $ctrl.bstooltip('hide'); });
    $ctrl.off('keypress keyup');
    $ctrl.on('keypress keyup', function () {
        if (minSize == 0 || $ctrl.val().trim().length >= minSize) {
            $ctrl.removeClass('error');
            $ctrl.removeAttr('title');
            $ctrl.bstooltip('destroy');
        }
        else {
            $ctrl.addClass('error');
            $ctrl.attr('data-toggle', 'tooltip');
            $ctrl.attr('title', msg);
            if (parseInt($ctrl.offset().top) < (parseInt($(window).height()) / 2)) {
                $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            }
            else {
                $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            }
        }
    });
    var etext = $ctrl.val().trim();

    if (/^(([^<>()[\]\\.,;:\s\"]+(\.[^<>()[\]\\.,;:\s\"]+)*)|(\".+\"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(etext) || (allowBlank && etext == '')) {

        $ctrl.removeClass('error');
        $ctrl.bstooltip('destroy');
        return true;
    }
    else {
        $ctrl.addClass('error');
        $ctrl.attr('data-toggle', 'tooltip');
        $ctrl.attr('title', 'Please enter valid email');
        //if (parseInt($ctrl.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
}
 
function requiredFields(cfld, cmsg, minSize) {
    /********** to replace ************/
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup change', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('data-toggle');
            cfld.removeAttr('data-original-title');
            cfld.removeAttr('title');
        }
        else {
            cfld.addClass('error');
            cfld.attr('data-toggle', 'tooltip');
            cfld.attr('title', cmsg);
            PositionToolTip(cfld);
            //if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    /********** to replace ************/
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    if (typeof minSize === "undefined" || minSize == undefined) {
        minSize = 0;
    }
    var value = cfld.val().trim();
    cfld.val(value);
    if (value.length > 0) {
        if (minSize == 0 || value.length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('data-toggle');
            cfld.removeAttr('title');
            return true;
        }
        else {
            cfld.addClass('error');
            cfld.attr('data-toggle', 'tooltip');           
            cfld.attr('title', 'Data length cannot less than ' + minSize);
            PositionToolTip(cfld);
            //if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
            return false;
        }
    }
    else {
        cfld.addClass('error');
        cfld.attr('data-toggle', 'tooltip');
        cfld.attr('title', cmsg);
        cfld.attr('data-original-title', cmsg);
        PositionToolTip(cfld);
        //if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}

        return false;
    }

}
 

function PositionToolTip(cfld)
{
    if (typeof (jQuery.fn.bstooltip) == "undefined") {
        jQuery.fn.bstooltip = jQuery.fn.tooltip;
    }
    //if (parseInt($(cfld).offset().top) < (parseInt($(window).height()) / 2)) {
    //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });
    //}
    //else {
    //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
    //}

}
 