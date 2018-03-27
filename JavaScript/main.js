$(document).ready(function(){
 // Initial array of animals
    var animals = ['dog', 'cat','rabbit','hamster','skunk','goldfish','bird','ferret','turtle','sugar glider','chinchilla','hedgehog','gerbil','pygmy goat','chicken']

    function renderButtons(){
        //looping through the animals
        for(var i =0; i<animals.length; i++){
            var a = $('<button>');
            a.addClass('btn btn-primary btn-lg');
            a.attr('data-name', animals[i]);
            a.text(animals[i]);
            $('#buttonArea').append(a);
        }
    }
    $("#find-gif").on('click',function (event){
        //prevent the submit button from trying to submit a form when clicked
        event.preventDefault();
        //delete animals before adding new buttons
        $('#buttonArea').empty;
        //grab the text from the input box
        var gif = $('#search').val();
        //search added to array
        animals.push(gif);
        //call function handling the process of array
        renderButtons();
        //construct our URL
        var api_key = 'ILqqZ5CuPQrRpvU2r3bTJyqJXxckZnnC';
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q='+ gif +'&api_key=' +api_key + '&limit=10';

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).done(function(response){
            // $('#gif-view').text(JSON.stringify(response));
            //console.log(response);
        })
         
    });
    renderButtons();
})