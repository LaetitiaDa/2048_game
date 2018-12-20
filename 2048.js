    (function($) // début du pluggin
    {
        $.fn.game2048 = function() //function game2048 du pluggin
        {

    ////////////////////////////////PARAMETERS////////////////////////////////////////////////
        var height = 4;
        var width = 4;
        var score = 0;
        var check = false; //check if when arrow clicked there is no action 

    /////////////////////////////////DRAW TABLE////////////////////////////////////////////////
        function draw_table()
        {
            for (j = 0; j <= height; j++)
            {
                $("table").append("<tr></tr>");

                for(i = 0; i < width; i++)
                {    
                    $("tr:nth-child("+j+")").append("<td class='empty'></td>");
                }
            }
        }

    /////////////////////////////////RANDOM 2 OR 4///////////////////////////////////////////

    ////////////////////start 1st random box of the game

        function random_start()
        {
            var random = Math.floor(Math.random()*(height*width));
            var two_four = random_two_four();
            $(".empty:eq("+random+")").removeClass('empty').addClass(two_four);
        }

    ////////////////////test random_number to know if empty box or not
        function random_test(random)
        {
            var two_four = random_two_four();
            if($("td:eq("+random+")").hasClass('empty'))
            {
                $("td:eq("+random+")").removeClass('empty').addClass(two_four);
            }
            else
            {
                random_number();
            }
        }

    ////////////////////random box to be filled in 
        function random_number()
        {
            var random = Math.floor(Math.random()*(height*width));

            random_test(random);
        }

    ///////////////////choose 90% 2 and 10% 4 for random box
        function random_two_four()
        {
            var two_four = Math.floor(Math.random()*(10));

            if(two_four < 9)
            {
                return "two";
            }
            else
            {
                return "four";
            }
        }

    ///////////////////////////////////MOVE//////////////////////////////////////////////////////////

    $(document).keydown(function(move)
    {
        if (move.keyCode == 40) 
        {
            check = false;
            move_down();
            add_down();
            display_score();
            if(check == true)
            {
                random_number();
            }
            win();
            lose();
        }

        if (move.keyCode == 38) 
        {
            check = false;
            move_up();
            add_up();
            display_score();
            if(check == true)
            {
                random_number();
            }
            win();
            lose();
        }
        
        if (move.keyCode == 39) 
        {
            check = false;
            move_right();
            add_right();
            display_score();
            if(check == true)
            {
                random_number();
            }
            win();
            lose();
        }

        if (move.keyCode == 37) 
        {
            check = false;
            move_left();
            add_left();
            display_score();
            if(check == true)
            {
                random_number();
            }
            win();
            lose();
        }
    });


    //////////////////////////MOVE DOWN

    function move_down()
    {
        for(j = width; j < (width * height); j++)
        {
            if($("td:eq("+j+")").hasClass('empty'))
            {
                for(i = j; i >= width; i = i - height)
                {
                    var tdabove = i - height;
                    if($("td:eq("+tdabove+")").attr("class")!="empty")
                    {
                        check = true;
                    }

                    var class_name = $("td:eq("+tdabove+")").attr("class");
                    $("td:eq("+i+")").removeClass().addClass(class_name);
                    $("td:eq("+tdabove+")").removeClass().addClass('empty');
                }
            }
        }
    }


    ////////////////////////////MOVE UP

    function move_up()
    {
        for(j = (width * height)-1 ; j >= 0; j--)
        {
            if($("td:eq("+j+")").hasClass('empty'))
            {
                for(i = j; i <= (width * height)- 1 - width; i = i + height)
                {
                    var tdunder = i + height;
                    if($("td:eq("+tdunder+")").attr("class")!="empty")
                    {
                        check = true;
                    }

                    var class_name = $("td:eq("+tdunder+")").attr("class");
                    $("td:eq("+i+")").removeClass().addClass(class_name);
                    $("td:eq("+tdunder+")").removeClass().addClass('empty');
                }
            }
        }
    }

    ////////////////////////////MOVE RIGHT

    function move_right()
    {
        for(j = 0; j < (width * height); j = j + width)
        {
            for( i = j + 1; i < (j + width); i++)
            {
                if($("td:eq("+i+")").hasClass('empty'))
                {
                    for(k = i; k > j; k--)
                    {
                        var tdnext = k - 1;
                        if($("td:eq("+tdnext+")").attr("class")!="empty")
                        {
                            check = true;
                        }

                        var class_name = $("td:eq("+tdnext+")").attr("class");
                        $("td:eq("+k+")").removeClass().addClass(class_name);
                        $("td:eq("+tdnext+")").removeClass().addClass('empty');
                    }
                }
            }
        }
    }


    ////////////////////////////MOVE LEFT

    function move_left()
    {
        for(j = (width * height) - 1 ; j >= 0; j = j - width)
        {
            for( i = j - 1; i > (j - width); i--)
            {
                if($("td:eq("+i+")").hasClass('empty'))
                {
                    for(k = i; k < j; k++)
                    {
                        var tdnext = k + 1;
                        if($("td:eq("+tdnext+")").attr("class")!="empty")
                        {
                            check = true;
                        }

                        var class_name = $("td:eq("+tdnext+")").attr("class");
                        $("td:eq("+k+")").removeClass().addClass(class_name);
                        $("td:eq("+tdnext+")").removeClass().addClass('empty');
                    }
                }
            }
        }
    }

    ////////////////////////////////////////////////// ADD ///////////////////////////////////////////

    ////////////////////////////ADD DOWN

    function add_down()
    {
        for(j = (width * height) -1; j >= width; j--)
        {
            var j_tdabove = j - width;
            var class1 = $("td:eq("+j+")").attr("class");
            var class2 = $("td:eq("+j_tdabove+")").attr("class");           

            if(class1 == class2 && class1!="empty")
            {
                check = true;

                var new_class = class_definition(class1);
                $("td:eq("+j+")").removeClass().addClass(new_class);
                $("td:eq("+j_tdabove+")").removeClass().addClass('empty');   
            }
        }
        move_down();
    }

    //////////////////////////////ADD UP

    function add_up()
    {
        for(j = 0 ; j < (width * height) - width ; j++)
        {
            var j_tdunder = j + width;
            var class1 = $("td:eq("+j+")").attr("class");
            var class2 = $("td:eq("+j_tdunder+")").attr("class");

            if(class1 == class2 && class1!="empty")
            {
                check = true;

                var new_class = class_definition(class1);
                $("td:eq("+j+")").removeClass().addClass(new_class);
                $("td:eq("+j_tdunder+")").removeClass().addClass('empty');   
            }
        }
        move_up();
    }

    //////////////////////////////ADD RIGHT

    function add_right()
    {
        for(j = 0; j < (width * height); j = j + width)
        {
            for( i = j + width - 1; i > j ; i--)
            {
                var i_tdnext = i - 1;
                var class1 = $("td:eq("+i+")").attr("class");
                var class2 = $("td:eq("+i_tdnext+")").attr("class");

                if(class1 == class2 && class1!="empty")
                {
                    check = true;

                    var new_class = class_definition(class1);
                    $("td:eq("+i+")").removeClass().addClass(new_class);
                    $("td:eq("+i_tdnext+")").removeClass().addClass('empty');   
                }
            }
        }
        move_right();
    }


    //////////////////////////////ADD LEFT

    function add_left()
    {
        for(j = (width * height) - 1 ; j >= 0; j = j - width)
        {
            for(i = j - width + 1; i < j; i++)
            {
                var i_tdnext = i + 1;
                var class1 = $("td:eq("+i+")").attr("class");
                var class2 = $("td:eq("+i_tdnext+")").attr("class");

                if(class1 == class2 && class1!="empty")
                {
                    check = true;

                    var new_class = class_definition(class1);
                    $("td:eq("+i+")").removeClass().addClass(new_class);
                    $("td:eq("+i_tdnext+")").removeClass().addClass('empty');   
                }
            }
        }
        move_left();
    }


    //////////////////////////////////////////////// Definition of added class ///////////////////////////////////

    function class_definition(class_name)
    {
        if(class_name == "two"){score = score + 4; return "four"};
        if(class_name == "four"){score = score + 8; return "eight"};
        if(class_name == "eight"){score = score + 16; return "sixteen"};
        if(class_name == "sixteen"){score = score + 32; return "thirty_two"};
        if(class_name == "thirty_two"){score = score + 64; return "sixty_four"};
        if(class_name == "sixty_four"){score = score + 128; return "hundred_twenty_eight"};
        if(class_name == "hundred_twenty_eight"){score = score + 256; return "two_hundred_fifty_six"};
        if(class_name == "two_hundred_fifty_six"){score = score + 512; return "five_hundred_twelve"};
        if(class_name == "five_hundred_twelve"){score = score + 1024; return "one_thousand_twenty_four"};
        if(class_name == "one_thousand_twenty_four"){score = score + 2048; return "two_thousand_forty_eight"};
    }


    //////////////////////////////////////////// END conditions ////////////////////////////////////////////////////

    function win()
    {
        for(j = 0; j < (width * height); j++)
        {
            var class_checked = $("td:eq("+j+")").attr("class") ;
            if(class_checked == "two_thousand_forty_eight")
            {
                alert("you've reached 2048! You win!");
            }
        }
    }

    function lose()
    {
        for(j = 0; j < (width * height); j++)
        {
            var box2 = j - 1;
            var box3 = j + 1;
            var box4 = j + width;
            var box5 = j - width;
            var class1 = $("td:eq("+j+")").attr("class") ;
            var class2 = $("td:eq("+box2+")").attr("class") ;
            var class3 = $("td:eq("+box3+")").attr("class") ;
            var class4 = $("td:eq("+box4+")").attr("class") ;
            var class5 = $("td:eq("+box5+")").attr("class") ;
            var modulo = j % width;

            if(j < width && j != 0)//0 already tested in other conditions
            {
                if(class1 == class2 || class1 == class4 || class1 == "empty")
                {
                    return;
                }
            }
            else if(j >= (width * height) - width)
            {
                if(class1 == class3 || class1 == class5 || class1 == "empty")
                {
                    return;
                }
            }
            else if(modulo == 0 && j >= width && j < (width*height)-width)
            {
                if(class1 == class3 || class1 == class4 || class1 == class5 || class1 == "empty")
                {
                    return;
                }
            }
            else if(modulo != 0 && j >= width && j < (width*height)-width)
            {
                if(class1 == class2 || class1 == class4 || class1 == class5 || class1 == "empty")
                {
                    return;
                }
            }
        }
        alert("Game over. You lose!");
    }

    ////////////////////////////////////////////////DISPLAY SCORE//////////////////////////////////////////////////

    function display_score()
    {
        $("span:eq(0)").html(score);
    }

    ////////////////////////////////////////////// START /////////////////////////////////////////////////////

    $("#new_game").hide();

    //select size
    $("#submit").on("click", function()
    {
        var selection = $("select").val();
        if(selection == "8x8")
        {
            width = 8;
            height = 8;
            draw_table();
        }
        else
        {
            draw_table();
        }
        display_score();
        random_start();
        random_number();
        $("#submit").hide(20);
        $("#select").hide(20);
        $("#p1").hide(20);
        $("#new_game").show(30);
        
    });

    }
    })(jQuery);
