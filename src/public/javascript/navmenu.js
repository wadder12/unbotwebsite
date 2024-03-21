// Initiate the navmenu
$(document).ready(function() {
    $('head').append('<style>#nav-dropdown { transition: transform 0.5s ease; }</style>');
  
    $('#menu-btn').click(function() {
        $('#nav-sidebar').removeClass('hidden');
        $('#nav-dropdown').removeClass('translate-x-full').removeClass('hidden');
    });
  
    $('#nav-sidebar').click(function(event) {
        if (event.target.id === "nav-sidebar") {
            $('#nav-dropdown').addClass('translate-x-full');
            setTimeout(function() {
                $('#nav-sidebar').addClass('hidden');
                $('#nav-dropdown').addClass('hidden');
            }, 500); 
        }
    });
  
    $('#nav-dropdown').click(function(event) {
        event.stopPropagation();
    });
});

  
  
  
  