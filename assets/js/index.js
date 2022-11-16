var url = "";
if (window.location.hostname === "localhost") {
  url = "http://localhost:3000";
} else {
  url = "https://lilian.iamroot.fr";
}


$("#add_material").submit(function (event) {
  alert("Matériel créé avec succès !");
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
    url: `${url}/api/materials/${data.id}`,
    method: "PUT",
    data: data,
  };
  console.log(request);
  $.ajax(request).done(function (response) {
    alert("Material modifié avec succès");
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
  $ondelete.click(async function () {
    var id = $(this).attr("data-id");
    const response = await fetch(`${url}/api/materials?id=${id}`, {
      method: "GET",
    });
    var data = await response.json();
    console.log(data)
    if (data.statut === false) {
      await fetch(`${url}/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(alert("Materiel supprimé avec succès"), location.reload())
        .then((res) => console.log(res));
    } else if (data.statut === true) {
      alert("Materiel en prêt, il est donc impossible de le supprimer");
    }
  });
}

if (window.location.pathname == "/loans") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    fetch(`${url}/api/loans/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(alert("Prêt terminé"), location.reload())
      .then((res) => console.log(res));
  });

  $onsend = $(".table tbody td a.mail");
  $onsend.click(function () {
    var id = $(this).attr("data-id");
    fetch(`${url}/api/loans?id=${id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then(alert("Email envoyé"), location.reload());
  });
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
