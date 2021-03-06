$(document).ready(function() {
  var data = moment({
    day: 1,
    month: 0,
    year: 2018
  });

  trovaMese(data);
  trovaFestivita(data);

  $(document).on('click', '#next',
  function() {
    var mese = $('#mese').attr('data-month');
    var meseMoment = moment(mese);
    var meseNext = meseMoment.add(1, 'months');

    trovaMese(meseNext);
    trovaFestivita(meseNext);
  });
});

// *************FUNZIONI***************
function trovaMese(data) {
  $('#mese').text(data.format('MMMM YYYY'));
  var numeroGiorni = data.daysInMonth();

  var source = $('#calendario').html();
  var template = Handlebars.compile(source);
  for (var i = 1; i <= numeroGiorni; i++) {
    var giornoCorrente = moment({
      day: i,
      month: data.month(),
      year: data.year()
    });
    var context = {
      date: giornoCorrente.format('D MMMM'),
      day: giornoCorrente.format('YYYY-MM-DD')
    };
    var html = template(context);

    $('#lista-giorni').append(html);
  };
};

function trovaFestivita(data) {
  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
      method: 'GET',
      data: {
        year: data.year(),
        month: data.month()
      },
      success: function(dataResponse) {
      var festivita = dataResponse.response;
      for (var i = 0; i < festivita.length; i++) {
        var festivitaCorrente = festivita[i];
        $('.day').each(function() {
          var questoGiorno = $(this).attr('data-day');
          if (questoGiorno === festivitaCorrente.date) {
            $(this).addClass('red');
            $(this).append(' (' + festivitaCorrente.name + ')')
          }
        })
      }
    },
    error: function() {
      alert('Errore');
    }
});
};
