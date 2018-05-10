'use strict'

//quantity of tasks
var quantity = 3;

function logTasks() {
    var tasks = document.getElementsByTagName("ul");
    for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(1)){break;}
        console.log(tasks[0].children[i].children[1].children[1].innerHTML);
    }
    window.CP.exitedLoop(1);

}

$(document).ready(function() {
    logTasks();

    //remove task
    $(document).on("click", ".remove", function() {
        $(this).parent().slideUp("normal", function() {
            $(this).parent().remove();
            quantity--;

            if (quantity === 0) {
                if ($(".inputForm").is(":hidden")) {
                    $("#new-task").slideToggle();
                    $(".inputForm").focus();
                }
            }

            var tasks = document.getElementsByTagName("ul");

            for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(3)){break;}
                var removingDone = false;
                var str = tasks[0].children[i].children[1].children[1].innerHTML;
                var index = str.indexOf(".");

                if (Number(str.substring(0, index)) - 1 > 0) {

                    for (let j = 2; j < quantity + 2; j++) {if (window.CP.shouldStopExecution(2)){break;}
                        var str1 = tasks[0].children[j].children[1].children[1].innerHTML;
                        var index1 = str1.indexOf(".");

                        if ( Number(str.substring(0, index)) - 1 === Number(str1.substring(0, index1)) ) {
                            removingDone = true;
                        }
                    }
                    window.CP.exitedLoop(2);


                    if (!removingDone) {
                        tasks[0].children[i].children[1].children[1].innerHTML =
                            String(Number(str.substring(0, index)) - 1) +
                            str.substring(index, str.length);
                    }
                }
            }
            window.CP.exitedLoop(3);

            logTasks();
        });
    });

    $(".new-note").click(function() {
        if ( $(".inputForm").is(":hidden") || ($(".inputForm").is(":visible") && quantity > 0) ) {
            $("#new-task").slideToggle();
            $(".inputForm").focus();
        }
    });

    //dropdown menu for sorting
    $(".sort").mouseover(function() {
        $(".dropdown-content").css("display", "block");
    });

    $(".dropdown-content").mouseover(function() {
        $(".dropdown-content").css("display", "block");
    });

    $(".dropdown-content").mouseout(function() {
        $(".dropdown-content").css("display", "none");
    });

    $(".sort").mouseout(function() {
        $(".dropdown-content").css("display", "none");
    });

    //sorting by number
    $("#by-number").click(function() {
        var tasks = document.getElementsByTagName("ul");
        var arr = [];

        for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(4)){break;}
            arr.push(tasks[0].children[i].children[1].children[1].innerHTML);
        }
        window.CP.exitedLoop(4);


        arr.sort();

        for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(5)){break;}
            tasks[0].children[i].children[1].children[1].innerHTML = arr[i - 2];
        }
        window.CP.exitedLoop(5);


        logTasks();
    });

    //sorting by name
    $("#by-name").click(function() {
        var tasks = document.getElementsByTagName("ul");
        var arr = [];

        for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(6)){break;}
            arr.push(tasks[0].children[i].children[1].children[1].innerHTML);
        }
        window.CP.exitedLoop(6);


        for (var i = 0; i < arr.length; i++) {if (window.CP.shouldStopExecution(7)){break;}
            var index = arr[i].indexOf(".");
            arr[i] = arr[i].substring(index + 2, arr[i].length) +
                arr[i].substring(0, index + 2).split("").reverse().join("");
        }
        window.CP.exitedLoop(7);


        arr.sort();

        for (let i = 2; i < quantity + 2; i++) {if (window.CP.shouldStopExecution(8)){break;}
            arr[i - 2] = arr[i - 2].split("").reverse().join("");
            index = arr[i - 2].indexOf(".");
            tasks[0].children[i].children[1].children[1].innerHTML = arr[i - 2].substring(0, index + 2) +
                arr[i - 2].substring(index + 2, arr[i - 2].length).split("").reverse().join("");
        }
        window.CP.exitedLoop(8);


        logTasks();
    });

    //Adding new task to the list
    $(".add-new-note").click(function() {
        var str = $(".inputForm").val();

        if (str === "" || str === null || str === "New Task") {
            alert("Pls fill in the field of input!");
        }
        else {
            quantity++;
            $(  "<li class='list-item'><input type='checkbox' class='hidden-box' id='" +
                String(quantity) +
                "'/><label for='" +
                String(quantity) +
                "' class='check--label'><span class='check--label-box'></span><span class='check--label-text'>" +
                String(quantity) +
                ". " +
                str +
                "</span><span class='remove'>×</span></label></li>"
            ).fadeIn().appendTo("ul");

            $(".inputForm").val("");
            $(".inputForm").focus();
        }

        //console.log tasks
        logTasks();
    });
});
