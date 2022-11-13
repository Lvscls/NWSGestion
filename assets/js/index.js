$("#add_material").submit(function (event) {
  alert("Data inserted Successfully");
});

$("#update_material").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  console.log(data);
  var request = {
    url: `http://localhost:3000/api/materials/${data.id}`,
    method: "PUT",
    data: data,
  };
  console.log(request);
  $.ajax(request).done(function (response) {
    alert("Data modified Successfully");
  });
  // const reference = document.querySelector('input[name="reference"]');
  // const description = document.querySelector('input[name="description"]');
  // console.log(reference.value);
  // console.log(description.value);

  // fetch(`http://localhost:3000/api/materials/${data.id}`, {
  //   method: "PUT",
  //   headers: {
  //     ContentType: 'application/json',
  //     Accept: 'application/json',// Indicates the content
  //   },
  //   body: JSON.stringify({
  //     '_id': data.id,
  //     'reference': reference,
  //     'description': description,
  //     'statut': false
  //   })
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    fetch(`https://lilian.iamroot.fr/api/materials/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => console.log(res));
  });
}

if (window.location.pathname == "/loans") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    fetch(`http://localhost:3000/api/loans/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(alert("Data deleted Successfully"), location.reload())
      .then((res) => console.log(res));
  });

  // $onsend = $(".table tbody td a.mail");
  // $onsend.click(function () {
  //   var id = $(this).attr("data-id");
  //   var request = {
  //     url: `http://localhost:5000/api/loans?${id}`,
  //     method: "GET",
  //   };

  //   {
  //     $.ajax(request).done(function (response) {
  //       const requiredPath = path.join(__dirname, "../../views/sendMail.ejs");

  //       const data = ejs.renderFile(requiredPath, {
  //         loan: response,
  //       });
  //       var mainOptions = {
  //         from: '"NormandieWebSchool" normandiewebschool@gmail.com',
  //         to: response.email,
  //         subject: "Rappel",
  //         html: data,
  //       };
  //       alert("Mail send Successfully");
  //       transporter.sendMail(mainOptions);
  //       location.reload();
  //     });
  //   }
  // });
}
