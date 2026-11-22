function ContactMailModel() { 
    $("#ContactMail_modal").modal('show');
}
function modelClose() { 
    window.location.reload();
}
$("#ContactMailForm").on("submit", function (e) {
    e.preventDefault();

    var name = $("#cname").val().trim();
    var email = $("#cemail").val().trim();
    var mobile_no = $("#cmobile_no").val().trim();
    var file = $("#file").val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var mobileRegex = /^(\+91\s?)?\d{10}$/;

    if (name == "") {
        $("#name_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#name_err").addClass("d-none").removeClass("d-block");
    }
    if (email === "") {
        $("#email_err").addClass("d-block").removeClass("d-none");
    } else if (!emailRegex.test(email)) {
        $("#email_err").addClass("d-none").removeClass("d-block");
        $("#email_err").text("Invalid email format");
        $("#email_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#email_err").addClass("d-none").removeClass("d-block");
    }
    if (mobile_no === "") {
        $("#mobile_no_err").addClass("d-block").removeClass("d-none");
    } else if (!mobileRegex.test(mobile_no)) {
        $("#mobile_no_err").addClass("d-none").removeClass("d-block");
        $("#mobile_no_err").text("Invalid mobile number format");
        $("#mobile_no_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#mobile_no_err").addClass("d-none").removeClass("d-block");
    }
    if (file == "") {
        $("#file_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#file_err").addClass("d-none").removeClass("d-block");
    }
    if (name === "" || email === "" || mobile_no === "" || file === "") {
        console.log("All Fields are Required.");
        return;
    }
    $(".preloader").css("display","block");
    var formData = new FormData(this);
    $.ajax({
        url: "hr_contact_mail.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            $(".preloader").css("display","none");
            if (data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Form Submitted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                $("#ContactMailForm")[0].reset();
                setTimeout(function () {
                    window.location.reload();
                },3000);

            } else {
                Swal.fire({
                    title: 'Failed',
                    text: 'Form Submittion Falied. Please Try again.',
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                });
            }
        },
        error: function (xhr, status, error) {
            $(".preloader").css("display","none");
            Swal.fire({
                title: 'Failed',
                text: 'Form Submittion Falied. Please Try again.',
                icon: 'error',
                confirmButtonText: 'Cancel'
            });
        }
    });
});

$("#AdminContactMailForm").on("submit", function (e) {
    e.preventDefault();

    var name = $("#contact_name").val().trim();
    var email = $("#contact_email").val().trim();
    var subject = $("#contact_subject").val().trim();
    var message = $("#contact_message").val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var mobileRegex = /^(\+91\s?)?\d{10}$/;

    if (name == "") {
        $("#contact_name_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#contact_name_err").addClass("d-none").removeClass("d-block");
    }
    if (email === "") {
        $("#contact_email_err").addClass("d-block").removeClass("d-none");
    } else if (!emailRegex.test(email)) {
        $("#contact_email_err").addClass("d-none").removeClass("d-block");
        $("#contact_email_err").text("Invalid email format");
        $("#contact_email_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#contact_email_err").addClass("d-none").removeClass("d-block");
    }
    if (subject == "") {
        $("#contact_subject_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#contact_subject_err").addClass("d-none").removeClass("d-block");
    }

    if (message == "") {
        $("#contact_message_err").addClass("d-block").removeClass("d-none");
    } else {
        $("#contact_message_err").addClass("d-none").removeClass("d-block");
    }

    if (name === "" || email === "" || subject === "" || message === "") {
        console.log("All Fields are Required.");
        return;
    }
    $(".preloader").css("display", "block");
    var formData = new FormData(this);
    $.ajax({
        url: "hr_contact_mail.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            $(".preloader").css("display", "none");

            if (data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Form Submitted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                $("#AdminContactMailForm")[0].reset();
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                $(".preloader").css("display", "none");
                Swal.fire({
                    title: 'Failed',
                    text: 'Form Submittion Falied. Please Try again.',
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                });
            }
        },
        error: function (xhr, status, error) {
            $(".preloader").css("display", "none");
            Swal.fire({
                title: 'Failed',
                text: 'Form Submittion Falied. Please Try again.',
                icon: 'error',
                confirmButtonText: 'Cancel'
            });
        }
    });
});
