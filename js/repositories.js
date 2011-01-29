jQuery(function($) {
  var $repositories = $("#repositories"),
    $fragments = {
      repository: $([
        '<li>',
          '<h2 class="name"><a class="link"></a> <span class="language"></span></h2>',
          '<div class="information"></div>',
          '<div class="description"></div>',
        '</li>'
      ].join(""))
    };
console.log("blah");
  $.ajax({
    url: "http://github.com/api/v2/json/repos/show/kflorence",
    dataType: "jsonp",
    success: function(response) {
      $.each(response.repositories, function(i, repository) {
        var $repository = $fragments.repository.clone();

        $(".link", $repository).text(repository.name).attr({
          href: repository.url,
          title: repository.name
        });

        if (repository.fork) {
          $(".link", $repository).before("forked &rarr; ");
        }

        if (repository.language) {
          $(".language", $repository).text(repository.language);
        }

        $(".information", $repository).text(
          repository.forks + " forks, " +
          repository.watchers + " watchers" +
          (repository.open_issues ? ", " +
            repository.open_issues + " issues" : "")
        );

        $(".description", $repository).text(repository.description);

        $repositories.append($repository);
      });

      $("li:last", $repositories).addClass("last");
    },
    error: function(xhr, status, exception) {
      console.log(xhr, status, exception);
    }
  });
});
