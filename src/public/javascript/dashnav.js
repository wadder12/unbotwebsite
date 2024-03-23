// public/javascript/dashnav.js

$(document).ready(function(){
    $('.navbar a[href="/more"]').click(function(e){
        e.preventDefault();

        $('#apps-dropdown').toggleClass('hidden');

        $(document).click(function(e) {
            var target = e.target;
            if (!$(target).is('.navbar a[href="/more"]') && !$(target).parents().is('#apps-dropdown')) {
                $('#apps-dropdown').addClass('hidden');
            }
        });

        e.stopPropagation();
    });
});
