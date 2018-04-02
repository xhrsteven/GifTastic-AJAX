// $(document).ready(function(){
 
    var animals = ['dog', 'cat','rabbit','hamster','skunk','goldfish','bird','ferret','turtle','sugar glider','chinchilla','hedgehog','gerbil','pygmy goat','chicken']

    function renderButtons(){
        //looping through the animals
        for(var i =0; i<animals.length; i++){
            var a = $('<button>');
            a.addClass('btn btn-primary');
            a.attr('data-animal', animals[i]);
            a.text(animals[i]);
            $('#buttonArea').append(a);
        }
    };
    
    $("#find-gif").on('click',function (event){
        //prevent the submit button from trying to submit a form when clicked
        event.preventDefault();
        //delete animals before adding new buttons
        $('#buttonArea').empty();
        //grab the text from the input box
        var gif = $('#search').val().trim();
        //search added to array
        animals.push(gif);
        //call function handling the process of array
        renderButtons();
    });

    $('#buttonArea').on('click','.btn',function () {
            //construct our URL
            var animal = $(this).attr('data-animal');
            console.log(animal);
            var api_key = 'Qv6Nsrw448xBX88u97JIICJ5rG7q6Iz2';
            var queryUrl = 'http://api.giphy.com/v1/gifs/search?q='+ animal +'&api_key='+ api_key+'&limit=10';
            
            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).done(function (response) {
                var result = response.data;
                console.log(response);
                for (var i = 0; i < result.length; i++) {
                    var animalDiv = $('<div>');
                    animalDiv.attr('id','animalDiv');
                    var p = $("<p>").text(`Rating: ${result[i].rating}`);
                    var button = $('<button>');
                    // button.attr('id','button'+i);
                    button.addClass('fa fa-heart-o');
                    button.attr({
                        'data-toggle':'modal',
                        'data-target':'#myModal'
                    });
                    var animalImg = $('<img>');
                    animalImg.attr({
                        'width': '100%',
                        'height': '200px'
                    });
                    animalImg.attr('src', result[i].images.downsized.url);
                    animalImg.attr('data-animate', result[i].images.downsized.url)
                    animalImg.attr("data-still", result[i].images.downsized_still.url);
                    animalImg.attr('data-state','animate');
                    animalImg.addClass('gif');
                    // =============================================
                    animalImg.attr('id','animalImg');
                    animalDiv.append(p);
                    animalDiv.append(button);
                    animalDiv.append(animalImg);
                    
                    $('#gif-view').prepend(animalDiv);

                    $('#animalImg').on('click',function () {
                        var state = $(this).attr('data-state');
                        // console.log($('img').state);
                        var animate = $(this).attr('data-animate');
                        var still = $(this).attr('data-still');

                        if(state === 'still') {
                            $(this).attr('src', animate);
                            $(this).attr('data-state', 'animate');
                        } 
                        if(state === 'animate') {
                            $(this).attr('src', still);
                            $(this).attr('data-state', 'still');
                        }
                    });

                

                }
            })
        });
        
        renderButtons();
        
// })