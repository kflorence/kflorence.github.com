jQuery(function($) {
  var $repositories = $("#repositories"),
    $fragments = {
      forks: $([
        '<li class="forks">',
          '<a></a>',
        '</li>'
      ].join("")),
      watchers: $([
        '<li class="watchers">',
          '<a></a>',
        '</li>'
      ].join("")),
      language: $('<li class="language"></li>'),
      repository: $([
        '<li class="repository">',
          '<h2><a class="link"></a></h2>',
          '<ul class="information"></ul>',
          '<div class="description"></div>',
        '</li>'
      ].join(""))
    };

  $.ajax({
    url: "http://github.com/api/v2/json/repos/show/kflorence",
    dataType: "jsonp",
    success: function(response) {
      if (response.repositories) {
        $.each(response.repositories, function(i, repository) {
          var $repository = $fragments.repository.clone(),
            $information = $(".information", $repository),
            $description = $(".description", $repository),
            $heading = $("h2", $repository),
            $anchor = $(".link", $heading);

          // Link
          $anchor.text(repository.name).attr({
            href: repository.url,
            title: repository.name
          });

          // Description
          $description.text(repository.description);

          // Forked?
          if (repository.fork) {
            $heading.addClass("forked");
          }

          // Language
          if (repository.language) {
            $information.append($fragments.language.clone()
              .text(repository.language)
            );
          }

          // Watchers
          $information.append($fragments.watchers.clone()
            .find("a").text(repository.watchers).attr({
              href: repository.url + "/watchers",
              title: "Watchers"
            }).end()
          );

          // Forks
          $information.append($fragments.forks.clone()
            .find("a").text(repository.forks).attr({
              href: repository.url + "/network",
              title: "Forks"
            }).end()
          );

          // Add to repository list
          $repositories.append($repository);
        });

        $("li.loading", $repositories).remove();
        $(".repository:last").addClass("last");
      }
    },
    error: function(xhr, status, exception) {
      console.log(xhr, status, exception);
    }
  });
});
