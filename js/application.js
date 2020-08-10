// ------------------ cell update methods ------------------

// no input --> no return
var calcTotal = function () {
  $("tbody tr").each(function (index, element) {
    var value = parseFloat($(this).find(".value input").val());
    var quantity = parseFloat($(this).find(".quantity input").val());
    var total = value * quantity;
    $(this).children('.total').html(total);
  });
};

var updateGrandTotal = function () {
  var grandTotal = 0;
  $("tbody tr").each(function (index, element) {
    if ($(this).children(".total").text() !== "") {
      grandTotal += parseFloat($(this).children(".total").text());
    }
  })
  $(".grand-total-span").html(grandTotal);
}

// ----------------- event handlers ---------------------------

// remove row button
$(document).on('click', '.btn.remove', function() {
  $(this).closest('tr').remove();
  updateGrandTotal();
});

// update total upon losing focus of input
// null --> null
$(document).on('blur', 'input', function () {
  calcTotal();
  updateGrandTotal();
});

// update total upon pressing enter key on input
// null --> null
$(document).on('keypress', 'input', function () {
  if (event.which === 13) {
    calcTotal();
    updateGrandTotal();
  }
});

// add new row when submitting form
$(document).on('submit', '#addInput',  function (event) {
  event.preventDefault();
  var item = $(this).find('.item-input input').val();
  var value = $(this).find('.value-input input').val();
  var quantity = $(this).find('.quantity-input input').val();

  $('tbody').first().append(
    '<tr>'+
      '<th scope="row" class="item">' + item + '</th>' +
      '<td class="value"><input type="number" value="' + value + '" /></td>' +
      '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
      '<td class="total"></td>' +
      '<td><button class="remove btn btn-warning">Remove</button></td>' +
    '</tr>'
  )

  $(this).find('.item-input input').val('');
  $(this).find('.value-input input').val('');
  $(this).find('.quantity-input input').val('');

  calcTotal();
  updateGrandTotal();
})


// initial calculations
$(document).ready(function() {
  calcTotal();
  updateGrandTotal();
});
