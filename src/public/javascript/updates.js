$(document).ready(function() {
    const repo = 'wadder12/unbotwebsite';
    const apiUrl = `https://api.github.com/repos/${repo}/releases`;

    function populateDropdown(releases) {
        const $dropdown = $('#notifications-dropdown');
        $dropdown.empty(); 

        releases.forEach(release => {
            const releaseElement = `
                <a href="${release.html_url}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank">
                    ${release.name || release.tag_name}
                </a>
            `;
            $dropdown.append(releaseElement);
        });

        $dropdown.removeClass('hidden');
    }

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function(releases) {
            if (releases.length > 0) {
                const latestReleaseTag = releases[0].tag_name;
                const storedReleaseTag = localStorage.getItem('lastCheckedReleaseTag');

                if (latestReleaseTag !== storedReleaseTag) {
                    $('#new-changelog-indicator').removeClass('hidden');
                    localStorage.setItem('lastCheckedReleaseTag', latestReleaseTag);
                }
            }
        },
        error: function(request, status, error) {
            console.error('Error fetching releases:', error);
        }
    });

    $('#notifications-trigger').click(function(event) {
        event.preventDefault();

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(releases) {
                populateDropdown(releases);
            },
            error: function(request, status, error) {
                console.error('Error fetching releases:', error);
            }
        });
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('#notifications-trigger, #notifications-dropdown').length) {
            $('#notifications-dropdown').addClass('hidden');
        }
    });
});
