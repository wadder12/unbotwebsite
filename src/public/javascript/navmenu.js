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


// for the user menu drop
$(document).ready(function(){
    $("#userMenuButton").click(function(e) {
        e.stopPropagation();
        $("#userDropdown").toggle();
    });

    $(document).click(function() {
        $("#userDropdown").hide();
    });

    $("#userDropdown").click(function(e) {
        e.stopPropagation();
    });
});

  
  
// for the more dropdown
$(document).ready(function(){
    $("#dropdownMore").click(function(event){
      event.preventDefault(); 
      $("#dropdownContent").toggle(); 
    });
  
    $(document).on('click', function(event) {
      if (!$(event.target).closest('#dropdownMore, #dropdownContent').length) {
        $("#dropdownContent").hide();
      }
    });
  });
  
    