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
function insertNewRowWithFields(row) {
    $('.selected').removeClass('selected');
    if ($('.AddedTR').length > 0) {
        $('.AddedTR').remove();
    }
    if (!!row && row.is('tr')) {
        $('#EditFields').clone().addClass('AddedTR').insertAfter(row);
    } else {
        $('#EditFields').clone().addClass('AddedTR').insertBefore($('tbody tr:first'));
    }

    $('.heading-elements [data-action=close], a[data-action=close]').unbind();
    $('.heading-elements [data-action=close], a[data-action=close]').click(function (e) {
        e.preventDefault();
        if ($('.AddedTR').length > 0) {
            $('.AddedTR').remove();
        }
    });
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
function requiredCheckBox(cfld, cmsg, minSize) {
    /********** to replace ************/
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    //cfld.off('keypress keyup');
    cfld.on('change', function () {
        if (cfld.is(':checked')) {
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
    if (cfld.is(':checked')) {
            cfld.removeClass('error');
            cfld.removeAttr('data-toggle');
            cfld.removeAttr('title');
            return true;      
    }
    else {
        cfld.addClass('error');
        cfld.attr('data-toggle', 'tooltip');
        cfld.attr('title', cmsg);
        cfld.attr('data-original-title', cmsg);
        PositionToolTip(cfld);        
        return false;
    }
}
function requiredFileUpload(cfld, cmsg, minSize) {
    /********** to replace ************/
    if (cfld.val() == '') {
        
        cfld.parents('label.uploadbtn').addClass('error');
        cfld.parents('label.uploadbtn').attr('data-toggle', 'tooltip');
        cfld.parents('label.uploadbtn').attr('title', cmsg);
        PositionToolTip(cfld);
        return false;
    }
    else {
        cfld.parents('label.uploadbtn').removeClass('error');
        cfld.parents('label.uploadbtn').removeAttr('data-toggle');
        cfld.parents('label.uploadbtn').removeAttr('data-original-title');
        cfld.parents('label.uploadbtn').removeAttr('title');
        return true;
    }    
    cfld.on('change', function () {
        if (cfld.val().trim() != '') {
            cfld.parents('label.uploadbtn').removeClass('error');
            cfld.parents('label.uploadbtn').removeAttr('data-toggle');
            cfld.parents('label.uploadbtn').removeAttr('data-original-title');
            cfld.parents('label.uploadbtn').removeAttr('title');
        }
        else {
            cfld.parents('label.uploadbtn').addClass('error');
            cfld.parents('label.uploadbtn').attr('data-toggle', 'tooltip');
            cfld.parents('label.uploadbtn').attr('title', cmsg);
            PositionToolTip(cfld);            
        }
    });
    if (typeof minSize === "undefined" || minSize == undefined) {
        minSize = 0;
    } 
}
function removeValidation(ctrl) {
    $(ctrl).removeClass('error');
    $(ctrl).removeAttr('data-toggle');
    $(ctrl).removeAttr('data-original-title');
    $(ctrl).removeAttr('title');
}
function ValidateNumberRange(ctrl1, ctrl2, cmsg) {
    var minSize = 1;
    ctrl1.off('click');
    ctrl1.on('click', function () { ctrl1.bstooltip('hide'); });
    ctrl1.off('keypress keyup');
    ctrl1.on('keypress keyup', function () {
        if (minSize == 0 || ctrl1.val().trim().length >= minSize) {
            ctrl1.removeClass('error');
            ctrl1.removeAttr('title');
            cfld.removeAttr('data-toggle');
        }
        else {
            ctrl1.addClass('error');
            ctrl1.attr('data-toggle', 'tooltip');
            ctrl1.attr('title', cmsg);
            PositionToolTip(ctrl1);
            //if (parseInt(ctrl1.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    ctrl2.off('click');
    ctrl2.on('click', function () { ctrl2.bstooltip('hide'); });
    ctrl2.off('keypress keyup');
    ctrl2.on('keypress keyup', function () {
        if (minSize == 0 || ctrl2.val().trim().length >= minSize) {
            ctrl2.removeClass('error');
            ctrl2.removeAttr('title');
            cfld.removeAttr('data-toggle');
        }
        else {
            ctrl2.addClass('error');
            ctrl2.attr('data-toggle', 'tooltip');
            ctrl2.attr('title', cmsg);
            PositionToolTip(ctrl2);
            //if (parseInt(ctrl2.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    var val1 = Number(ctrl1.val());
    var val2 = Number(ctrl2.val());
    if (val1 == 0 || val2 == 0 || val1 > val2) {
        ctrl1.addClass('error');
        ctrl1.attr('data-toggle', 'tooltip');
        ctrl1.attr('title', cmsg);
        ctrl2.addClass('error');
        ctrl2.attr('data-toggle', 'tooltip');
        ctrl2.attr('title', cmsg);
        return false;

    } else {
        ctrl1.removeClass('error');
        ctrl1.removeAttr('data-toggle');
        ctrl1.removeAttr('title');
        ctrl2.removeClass('error');
        ctrl2.removeAttr('data-toggle');
        ctrl2.removeAttr('title');
        return true;
    }
}
function ValidateDecimalRange(ctrl1, ctrl2, cmsg) {
    var val1 = (ctrl1.unmask());
    var val2 = (ctrl2.unmask());
    if (parseFloat(val1) > parseFloat(val2)) {
        ctrl1.addClass('error');
        ctrl1.attr('data-toggle', 'tooltip');
        ctrl1.attr('title', cmsg);
        ctrl2.addClass('error');
        ctrl2.attr('data-toggle', 'tooltip');
        ctrl2.attr('title', cmsg);
        return false;

    } else {
        ctrl1.removeClass('error');
        ctrl1.removeAttr('data-toggle');
        ctrl1.removeAttr('title');
        ctrl2.removeClass('error');
        ctrl2.removeAttr('data-toggle');
        ctrl2.removeAttr('title');
        return true;
    }
}
function requiredFieldsWithZero(cfld, cmsg, minSize) {
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('data-toggle'); cfld.removeAttr('title');
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
            return false;
        }
    });
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    if (typeof minSize === "undefined" || minSize == undefined) {
        minSize = 0;
    }
    var value = cfld.val();
    if (value.length > 0 && value != '0') {
        if (minSize == 0 || value.length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('data-toggle');
            cfld.removeAttr('title');
            cfld.removeAttr('data-original-title');
            return true;
        }
        else {
            cfld.addClass('error');
            cfld.attr('data-toggle', 'tooltip');
            cfld.attr('title', 'data length cannot less than ' + minSize);
            $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
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
function requiredFieldsForvalue(cfld, cmsg) {
    var minSize = 1;
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('title');
            cfld.removeAttr('data-toggle');
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
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    var value = cfld.unmask();
    if (parseFloat(value) != 0) {
        cfld.removeClass('error');
        cfld.removeAttr('data-toggle');
        cfld.removeAttr('title');
        return true;
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
        return false;
    }
}
function requiredAutoCompleteWithCharVal(ctext, cValue, cmsg) {
    var minSize = 1;
    ctext.off('click');
    ctext.on('click', function () { ctext.bstooltip('hide'); });
    ctext.off('keypress keyup');
    ctext.on('keypress keyup', function () {
        if (minSize == 0 || ctext.val().trim().length >= minSize) {
            ctext.removeClass('error');
            ctext.removeAttr('title'); ctext.removeAttr('data-toggle');
        }
        else {
            ctext.addClass('error');
            ctext.attr('data-toggle', 'tooltip');
            ctext.attr('title', cmsg);
            PositionToolTip(ctext);
            //if (parseInt(ctext.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    var value = cValue.val();
    if (value.length > 0 && value != 0) {
        ctext.removeClass('error');
        ctext.removeAttr('data-toggle');
        ctext.removeAttr('title');
        return true;
    }
    else {
        ctext.val('');
        ctext.addClass('error');
        ctext.attr('data-toggle', 'tooltip');
        ctext.attr('title', cmsg);
        PositionToolTip(ctext);
        //if (parseInt(ctext.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
}
function requiredAutoComplete(ctext, cValue, cmsg) {
    ctext.off('click');
    ctext.off('change');
    ctext.on('click', function () { ctext.bstooltip('hide'); });
    ctext.off('keypress keyup');
    ctext.on('keypress keyup change', function () {
        if (ctext.val().trim().length >= 1 && ctext.val() != '') {
            ctext.removeClass('error');
            ctext.removeAttr('data-toggle');
            //ctext.removeAttr('data-toggle');
            ctext.removeAttr('data-original-title');
        }
        else {
            ctext.addClass('error');
            ctext.attr('data-toggle', 'tooltip');
            ctext.attr('title', cmsg);
            PositionToolTip(ctext);
            //if (parseInt(ctext.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    var value = cValue.val();
    if (value.length > 0 && value > 0) {
        ctext.removeClass('error');
        ctext.removeAttr('data-toggle');
        ctext.removeAttr('data-original-title');
        //ctext.removeAttr('title');
        return true;
    }
    else {
        ctext.val('');
        ctext.addClass('error');
        ctext.attr('data-toggle', 'tooltip');
        ctext.attr('title', cmsg);
        PositionToolTip(ctext);
        //if (parseInt(ctext.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
}
function requiredDropdownWithCharValue(cfld, cmsg) {
    var minSize = 1;
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('title'); cfld.removeAttr('data-toggle');
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
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    var value = cfld.find('option:selected').val();
    if (value.length >= 0) {
        cfld.removeClass('error');
        cfld.removeAttr('tooltip');
        cfld.removeAttr('data-toggle');
        return true;

    }
    else {
        cfld.addClass('error');
        cfld.attr('tooltip', cmsg);
        cfld.attr('data-toggle', 'tooltip');
        return false;
    }
}
function requiredDropdownForCheckout(cfld, cmsg) {
    var minSize = 1;
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    cfld.on('keypress keyup change', function () {
        if (cfld.find('option:selected').length > 0) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.removeClass('error');
        }
        else {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.addClass('error');
            cfld.attr('tooltip', cmsg);
            ddlctrl.attr('title', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
        if (cfld.find('option:selected').index() > 0) {
            cfld.removeClass('error');
            cfld.removeAttr('title');
        }
        else {
            cfld.addClass('error');
            cfld.attr('tooltip', cmsg);
            cfld.attr('title', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
    });
    var value = cfld.find('option:selected').val();
    if ((!!value && value.length >= 0)) {

        if (cfld.hasClass('bootstrap-select')) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.removeClass('error');
        } else {
            cfld.removeClass('error');
            cfld.removeAttr('tooltip');
            cfld.removeAttr('data-toggle');
        }
        return true;
    }
    else {
        if (cfld.hasClass('bootstrap-select')) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.addClass('error');
        } else {
            cfld.addClass('error');
            cfld.attr('tooltip', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
        return false;
    }
}
function requiredDropdown(cfld, cmsg) {
    var minSize = 1;
    if (cfld === "undefined") {
        alert('field is not defined');
        return false;
    }
    //alert(cfld.find('option:selected').index());
    cfld.on('keypress keyup change', function () {
        if (cfld.find('option:selected').length > 0) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.removeClass('error');
        }
        else {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.addClass('error');
            cfld.attr('tooltip', cmsg);
            ddlctrl.attr('title', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
        if (cfld.find('option:selected').index() > 0) {
            cfld.removeClass('error');
            cfld.removeAttr('title');
        }
        else {
            cfld.addClass('error');
            cfld.attr('tooltip', cmsg);
            cfld.attr('title', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
    });
    var value = cfld.find('option:selected').val();

    if ((!!value && value.length >= 0 && value > 0) || cfld.find('option:selected').text() != "--Select--") {

        if (cfld.hasClass('bootstrap-select')) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.removeClass('error');
            //ddlctrl.removeAttr('tooltip');
            //ddlctrl.removeAttr('data-toggle');
        } else {
            cfld.removeClass('error');
            cfld.removeAttr('tooltip');
            cfld.removeAttr('data-toggle');
        }
        return true;

    }
    else {
        if (cfld.hasClass('bootstrap-select')) {
            var ddlctrl = $('button[data-id="' + cfld.attr('id') + '"]');
            ddlctrl.addClass('error');
            //ddlctrl.attr('tooltip', cmsg);
            //ddlctrl.attr('data-toggle', 'tooltip');
        } else {
            cfld.addClass('error');
            cfld.attr('tooltip', cmsg);
            cfld.attr('data-toggle', 'tooltip');
        }
        return false;
    }
}
function requiredEmailAddress($ctrl, msg, allowBlank) {
    var minSize = 1;
    $ctrl.off('click');
    $ctrl.on('click', function () { $ctrl.bstooltip('hide'); });
    $ctrl.off('keypress keyup');
    $ctrl.on('keypress keyup', function () {
        if ((minSize == 0 || $ctrl.val().trim().length >= minSize)) {
            $ctrl.removeClass('error');
            $ctrl.removeAttr('title'); $ctrl.removeAttr('data-toggle');
        }
        else {
            $ctrl.addClass('error');
            $ctrl.attr('data-toggle', 'tooltip');
            $ctrl.attr('title', msg);
            PositionToolTip($ctrl);
            //if (parseInt($ctrl.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });
    var etext = $ctrl.val().trim();
    if (/^(([^<>()[\]\\.,;:\s\"]+(\.[^<>()[\]\\.,;:\s\"]+)*)|(\".+\"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(etext) || (allowBlank && etext == '')) {
        $ctrl.removeClass('error');
        $ctrl.removeAttr('data-toggle');
        $ctrl.removeAttr('title');
        return true;
    }
    else {
        $ctrl.addClass('error');
        $ctrl.attr('data-toggle', 'tooltip');
        $ctrl.attr('title', msg);
        PositionToolTip($ctrl);
        //if (parseInt($ctrl.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
}
function ValidatevalidWebURL(cfld, cmsg) {
    var minSize = 1;
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('title');
            cfld.removeAttr('data-original-title'); cfld.removeAttr('data-toggle');
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
    var txt = cfld.val();
    var re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (re.test(txt) || txt == '') {
        cfld.removeClass('error');
        cfld.removeAttr('data-toggle');
        cfld.removeAttr('data-original-title');
        cfld.removeAttr('title');
        return true;
    }
    else {
        cfld.val('');
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
function ValidateMultiselect(cfld, CFVal, cmsg) {
    var minSize = 1;
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.removeAttr('title'); cfld.removeAttr('data-toggle');
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
    if (cfld.val().toString() == "") {
        cfld.val('');
        CFVal.addClass('error');
        CFVal.attr('title', cmsg);
        PositionToolTip(cfld);
        //if (parseInt(cfld.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
    else {
        CFVal.removeClass('error');
        CFVal.removeAttr('title');
        return true;
    }
}
function ValidateBootMultiselect(cfld, CFVal) {
    var minSize = 1;
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');
    cfld.on('keypress keyup', function () {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
        }
        else {
            cfld.addClass('error');
        }
    });
    var value = CFVal.val();
    if (!!value && value.length > 0) {
        cfld.closest('div.bootstrap-select').find('button.dropdown-toggle').removeClass('error');
        return true;
    }
    else {
        CFVal.val('');
        cfld.closest('div.bootstrap-select').find('button.dropdown-toggle').addClass('error');
        return false;
    }
}
function requiredNoIDDropdown(cfld, msg) {
    var value = cfld.find('option:selected').val();
    cfld.on('change', function () {
        if (cfld.find('option:selected').length > 0) {
            cfld.clearCustomError();
            return true;
        }
        else {
            cfld.setCustomError(msg);
            return false;
        }
    });
    if (!!value && value.length > 0) {
        cfld.clearCustomError();

        //if (cfld.hasClass('bootstrap-select')) {
        //    cfld.parent().clearCustomError();
        //} else {
        //    cfld.clearCustomError();
        //}
        return true;
    }
    else {
        cfld.setCustomError(msg);
        //if (cfld.hasClass('bootstrap-select')) {
        //    cfld.parent().setCustomError(msg);
        //} else {
        //    cfld.setCustomError(msg);
        //}
        return false;
    }
}
function ValidateTime(cfld, msg) {
    var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/;
    var correct = regexp.test($(cfld).val());
    if (!correct) {
        $(cfld).addClass('error');
        $(cfld).attr('data-toggle', 'tooltip');
        $(cfld).attr('title', msg);
        return false;
    }
    else {
        $(cfld).removeClass('error');
        $(cfld).attr('data-toggle', '');
        $(cfld).attr('title', '');
        return true;
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

function ValidateMobile(cfld, value) {
    if ($(cfld).val().trim().length) {
        var ObjReq = {PhoneNumber: value + $(cfld).val().trim()};
        var vv = true, vvm = '';
        $.ajax({
            type: 'POST',
            url: '../Login/ValidateMobile',
            dataType: 'json',
            data: { JsonString: JSON.stringify(ObjReq) },
            async: false,
            success: function (data) {
                vv = data.IsValid;
                vvm = data.Message;               
            },
            error: function (ex) {
                vv = false;
                vvm = 'Invalid Phone Number';               
            },
            complete: function (data) {

            }
        });
        if (vv == true) {
            $(cfld).removeClass('error');
            $(cfld).attr('data-toggle', '');
            $(cfld).attr('title', '');
            $(cfld).attr('data-original-title', '');
            return true;
        }
        else {
            $(cfld).addClass('error');
            $(cfld).attr('data-toggle', 'tooltip');
            $(cfld).attr('title', vvm);
            $(cfld).attr('data-original-title', vvm);
            PositionToolTip(cfld);
            //if (parseInt($(cfld).offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });
            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
            return false;
        }
    }
    else {
        $(cfld).addClass('error');
        $(cfld).attr('data-toggle', 'tooltip');
        $(cfld).attr('title', 'Mobile cannot left blank');
        $(cfld).attr('data-original-title', 'Mobile cannot left blank');
        PositionToolTip(cfld);

        //if (parseInt($(cfld).offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });
        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false
    }
}
function CurrentNewPasswordNotMatch(ctrl1, ctrl2, cmsg) {
    ctrl2.off('click');
    ctrl2.on('click', function () { ctrl2.bstooltip('hide'); });
    ctrl2.off('keypress keyup');
    ctrl2.on('keypress keyup change', function () {
        if ((ctrl1.val().trim() === ctrl2.val().trim()) && ctrl1.val().length > 0) {
            //ctrl1.addClass('error');
            ctrl1.attr('data-toggle', 'tooltip');
            ctrl1.attr('title', cmsg);
            PositionToolTip(ctrl1);
            ctrl2.addClass('error');
            ctrl2.attr('data-toggle', 'tooltip');
            ctrl2.attr('title', cmsg);
            PositionToolTip(ctrl2);
        }
        else {
            //ctrl1.removeClass('error');
            ctrl1.removeAttr('data-toggle');
            ctrl1.removeAttr('data-original-title');
            ctrl1.removeAttr('title');

            ctrl2.removeClass('error');
            ctrl2.removeAttr('data-toggle');
            ctrl2.removeAttr('data-original-title');
            ctrl2.removeAttr('title');
        }
    });

    if ((ctrl1.val().trim() === ctrl2.val().trim()) && ctrl1.val().length > 0) {
        //ctrl1.addClass('error');
        ctrl1.attr('data-toggle', 'tooltip');
        ctrl1.attr('title', cmsg);

        ctrl2.addClass('error');
        ctrl2.attr('data-toggle', 'tooltip');
        ctrl2.attr('title', cmsg);

        PositionToolTip(ctrl2);
        PositionToolTip(ctrl1);
        return false;
        
    }
    else {

        //ctrl1.removeClass('error');
        ctrl1.removeAttr('title');
        ctrl1.removeAttr('data-toggle');

        ctrl2.removeClass('error');
        ctrl2.removeAttr('title');
        ctrl2.removeAttr('data-toggle');

        return true;
    }
}
function PasswordMatch(ctrl1, ctrl2, cmsg) {



    ctrl2.off('click');
    ctrl2.on('click', function () { ctrl2.bstooltip('hide'); });
    ctrl2.off('keypress keyup');
    ctrl2.on('keypress keyup change', function () {
        if ((ctrl1.val().trim() === ctrl2.val().trim()) && ctrl1.val().length > 0) {

            ctrl1.removeClass('error');
            ctrl1.removeAttr('data-toggle');
            ctrl1.removeAttr('data-original-title');
            ctrl1.removeAttr('title');

            ctrl2.removeClass('error');
            ctrl2.removeAttr('data-toggle');
            ctrl2.removeAttr('data-original-title');
            ctrl2.removeAttr('title');
        }
        else {
            ctrl1.addClass('error');
            ctrl1.attr('data-toggle', 'tooltip');
            ctrl1.attr('title', cmsg);
            PositionToolTip(ctrl1);
            //if (parseInt(ctrl1.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}


            ctrl2.addClass('error');
            ctrl2.attr('data-toggle', 'tooltip');
            ctrl2.attr('title', cmsg);
            PositionToolTip(ctrl2);
            //if (parseInt(ctrl2.offset().top) < (parseInt($(window).height()) / 2)) {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

            //}
            //else {
            //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
            //}
        }
    });





    if ((ctrl1.val().trim() === ctrl2.val().trim()) && ctrl1.val().length > 0) {

        ctrl1.removeClass('error');
        ctrl1.removeAttr('title');
        ctrl1.removeAttr('data-toggle');

        ctrl2.removeClass('error');
        ctrl2.removeAttr('title');
        ctrl2.removeAttr('data-toggle');

        return true;
    }
    else {

        ctrl1.addClass('error');
        ctrl1.attr('data-toggle', 'tooltip');
        ctrl1.attr('title', cmsg);

        ctrl2.addClass('error');
        ctrl2.attr('data-toggle', 'tooltip');
        ctrl2.attr('title', cmsg);

        PositionToolTip(ctrl2);
        PositionToolTip(ctrl1);

        //if (parseInt(ctrl2.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}

        //if (parseInt(ctrl1.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });

        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return false;
    }
}


var RegularExpobj = [];
RegularExpobj['REG001'] = { InputKey: "^[0-9\b]+$", InputPaste: /[^0-9]/g, RegexFor: 'Only Number.' }
RegularExpobj['REG002'] = { InputKey: "^[a-zA-Z0-9\b@ ._-]+$", InputPaste: /[^a-zA-Z0-9\b@ ._-]/g, RegexFor: 'Special Char with @ space _- . allowed' }
RegularExpobj['REG003'] = { InputKey: "^[a-zA-Z0-9\b]+$", InputPaste: /[^a-zA-Z0-9\b]/g, RegexFor: 'Special Char not allowed' }
RegularExpobj['REG004'] = { InputKey: "^[a-zA-Z\b .]+$", InputPaste: /[^a-zA-Z0-9\b .]/g, RegexFor: 'Special Char with space . allowed' }
RegularExpobj['REG005'] = { InputKey: "^[a-zA-Z\b ]+$", InputPaste: /[^a-zA-Z\b ]/g, RegexFor: 'Alphanumeric with space allowed' }
RegularExpobj['REG006'] = { InputKey: "^[0-9\b+,.-]+$", InputPaste: /[^0-9\b+,.-]/g, RegexFor: 'Only Number and +-,. allowed' }
RegularExpobj['REG007'] = { InputKey: "^[0-9\b:]+$", InputPaste: /[^0-9\b:]/g, RegexFor: 'Only Number and +-,. allowed' }
RegularExpobj['REG008'] = { InputKey: "^[a-zA-Z\b #.-]+$", InputPaste: /[^a-zA-Z0-9\b #.-]/g, RegexFor: 'Only Number and +-,. allowed' }
RegularExpobj['REG009'] = { InputKey: "^[a-zA-Z0-9\b& -]+$", InputPaste: /[^a-zA-Z0-9\b& -]/g, RegexFor: 'Special Char with @ space _- . & allowed' }
RegularExpobj['REG0010'] = { InputKey: "^[a-zA-Z0-9\b _-]+$", InputPaste: /[^a-zA-Z0-9\b _-]/g, RegexFor: 'Special Char _- allowed' }
RegularExpobj['REG0011'] = { InputKey: "^[a-zA-Z0-9\b@#/(,)-]+$", InputPaste: /[^a-zA-Z0-9\b@#/(,)-]/g, RegexFor: 'alphabetic and Some special character like @#/(,) allowed' }
RegularExpobj['REG0012'] = { InputKey: "^[a-zA-Z0-9\"b ()/_,.'-]+$", InputPaste: /[^a-zA-Z0-9\"b ()/_,.'-]/g, RegexFor: 'alphabetic and Some special character like -_,. allowed' }
RegularExpobj['REG0013'] = { InputKey: "^[a-zA-Z0-9\"b @$#%&-.,_()]+$", InputPaste: /[^a-zA-Z0-9\"b @$#%&-.,_()]/g, RegexFor: 'alphabetic and Some special character like -_,. allowed' }
RegularExpobj['REG0014'] = { InputKey: "^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)+$", InputPaste: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/g, RegexFor: 'alphabetic and Some special character like @-_,. allowed' }
RegularExpobj['REG0015'] = { InputKey: "^[a-zA-Z\"b ()/_,.'-]+$", InputPaste: /[^a-zA-Z\"b ()/_,.'-]/g, RegexFor: 'alphabetic and Some special character like -_,. allowed' }


jQuery.fn.extend({
    setCustomError: function (msg) {
        var $ctr = null;
        if ($(this).hasClass('bootstrap-select')) {
            $ctr = $(this).parent();
        } else {
            $ctr = $(this);
        }
        $ctr.addClass('error').css("border", "1px dashed");
        $ctr.attr('data-toggle', 'tooltip');
        $ctr.attr('title', msg);
        PositionToolTip($ctr);
        //if (parseInt($ctr.offset().top) < (parseInt($(window).height()) / 2)) {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'bottom' });
        //}
        //else {
        //    $('[data-toggle="tooltip"]').bstooltip({ placement: 'top' });
        //}
        return $(this);
    },
    clearCustomError: function () {
        var $ctr = null;
        if ($(this).hasClass('bootstrap-select')) {
            $ctr = $(this).parent();
        } else {
            $ctr = $(this);
        }
        $ctr.removeClass('error').css("border", "none").removeAttr('data-toggle').removeAttr('title').removeAttr('data-original-title');
        return $(this);
    },
    fn_CharValidation: function (Vregex, fn_complete) {
        var obj = RegularExpobj[Vregex];
        $(this).bind("keypress", function (event) {
            var regex = new RegExp(obj.InputKey);
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (event.keyCode == 9 || event.keyCode == 8 || event.ctrlKey || event.keyCode == 86 || event.keyCode == 88 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
                return true;
            }
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        }).bind('paste input', RemovePasteSpecialChar);
        function RemovePasteSpecialChar(e) {
            var self = $(this);
            setTimeout(function () {
                var initVal = self.val(),
                    outputVal = initVal.replace(obj.InputPaste, "");
                if (initVal != outputVal) {
                    self.val(outputVal);
                }

            });
        }
        if (!!fn_complete && typeof fn_complete === 'function') {
            $(this).on('keyup', function () {
                fn_complete($(this).val(), $(this));
            });
        }
    }
});

var fn_AllowNumberInInputs = function () {
    $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
        if (event.which == 9 || event.which == 8 || event.which == 0) {
            return true;
        }
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $(".allownumericwithoutdecimal").on("keypress keyup blur", function (event) {
        if (event.which == 9 || event.which == 8 || event.which == 0) {
            return true;
        }
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
};

var fn_RemoveNumericValidation = function () {
    $(".allownumericwithdecimal, .allownumericwithoutdecimal").off('keypress keyup blur');
};

var fn_RestrictSpecialChars1 = function () {
    $(".restrictspecialchars").bind("keypress", function (event) {
        var regex = new RegExp("^[a-zA-Z0-9\b]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key) && event.which != 9) {
            event.preventDefault();
            return false;
        }
    });
};

var Fn_ValidateUploadFile = function (cfld) {
    var Result = true;
    if ($(cfld)[0].files.length > 0) {
        var ext = $(cfld).val().match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                var f = $(cfld)[0].files[0];
                if (f.size > 1048576) {
                    $(cfld).siblings('#hdnLogo').val('');
                    Result = false;
                }
                else {
                    Result = true;
                }
                break;
            default:
                $(cfld).siblings('.filename').text('No file selected');
                $(cfld).siblings('#hdnLogo').val('');
                Result = false;

        }
    }
    return Result;
};

(function ($) {
    var oldattr = $.fn.attr;
    $.fn.attr = function () {
        var ret = oldattr.apply(this, arguments);
        try {
            if ($(this).is('input[type="checkbox"]') &&
                arguments.length == 2 &&
                (arguments[0] == 'checked' || arguments[0] == 'readonly')) {
                $(this).prop(arguments[0], true);
            }
        } catch (e) {
            console.log(e);
        }
        return ret;
    }
});
function requiredFieldsDate(cfld, cmsg, minSize) {    
    /********** to replace ************/
    cfld.off('click');
    cfld.on('click', function () { cfld.bstooltip('hide'); });
    cfld.off('keypress keyup');    
    cfld.on('apply.daterangepicker', function (ev, picker) {
        if (minSize == 0 || cfld.val().trim().length >= minSize) {
            cfld.removeClass('error');
            cfld.parent().removeAttr('data-toggle');
            cfld.parent().removeAttr('data-original-title');
            cfld.parent().removeAttr('title');
        }
        else {
            cfld.addClass('error');
            cfld.parent().attr('data-toggle', 'tooltip');
            cfld.parent().attr('title', cmsg);
            PositionToolTip(cfld);            
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
            cfld.parent().removeAttr('data-toggle');
            cfld.parent().removeAttr('title');
            return true;
        }
        else {
            cfld.addClass('error');
            cfld.parent().attr('data-toggle', 'tooltip');
            cfld.parent().attr('title', 'Data length cannot less than ' + minSize);
            PositionToolTip(cfld);          
            return false;
        }
    }
    else {
        cfld.addClass('error');
        cfld.parent().attr('data-toggle', 'tooltip');
        cfld.parent().attr('title', cmsg);
        cfld.parent().attr('data-original-title', cmsg);
        PositionToolTip(cfld);      
        return false;
    }

}