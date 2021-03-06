/**
 * Manage Category accessibilily by role.
 *
 * @param obj
 */

function cmf_updateAccess( obj ) {
    jQuery( obj ).val("Working...");
    jQuery( obj ).attr("disabled", "disabled");
    var selectedCatIds = "";
    var accessBox =  jQuery( obj ).closest( '.access-box' );
    var roleSlug = jQuery( accessBox ).find(".hidden_role").attr("value");
    var siteId = jQuery( accessBox ).find(".site_id").attr("value");
    var catList = jQuery( obj ).closest( '.access-box' ).find( '.category-list' );
    jQuery( catList ).children().each( function() {
        if( jQuery(this).is(":checked") ) {
        	selectedCatIds += jQuery(this).val() + ",";
        }
    });

    var idLen = selectedCatIds.length;
    if( idLen > 0 ) {
    	selectedCatIds = selectedCatIds.substring(0, idLen - 1);
    }
    
    window.setTimeout(function(){
        jQuery.ajax({
            type: 'POST',
            url: category_access_ajax.url, //wp_localize_script: 844
            data: {
                action: 'category_access', //wp_ajax_category_access: 71
                user_role: roleSlug,
                selected_cats: selectedCatIds,
                site_id: siteId
            },
            success: function( result ) {
                jQuery( obj ).val("Update");
                jQuery( obj ).removeAttr("disabled");
            }
        });
    }, 2000);
}