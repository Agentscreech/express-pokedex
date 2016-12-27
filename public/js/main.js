$('.delete-link').on('click', function(e) {
    e.preventDefault();
    console.log('delete pressed');
    var element = $(this);
    var pokemon = element.attr('href');
    console.log(pokemon);
    $.ajax({
        method: 'DELETE',
        url: pokemon
    }).done(function(data) {
        // get data returned from the DELETE route
        console.log(data);

        // do stuff when the DELETE action is complete
        // element.remove();

        // or, you can redirect to another page
        window.location = '/pokemon';
    });
});
