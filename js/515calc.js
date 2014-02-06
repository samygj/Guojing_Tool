jQuery(document).ready(function($) {
	$.ajax({
		type: "POST",
		url: "515calculator.php",
		data: {type: "init"},
		success: function(data) {
			var json = JSON.parse(data);
			var total = json.total;
			var totalX = parseFloat(total.X);
			var totalY = parseFloat(total.Y);
			var totalL = parseFloat(total.L);
			var calcX = parseFloat(totalX - (totalX + totalY + totalL) / 3);
			var calcY = parseFloat(totalY - (totalX + totalY + totalL) / 3);
			var calcL = parseFloat(totalL - (totalX + totalY + totalL) / 3);
			$("#total-x").html(totalX.toFixed(2));
			$("#total-y").html(totalY.toFixed(2));
			$("#total-l").html(totalL.toFixed(2));
			$("#calc-total-x").html(calcX.toFixed(2));
			$("#calc-total-y").html(calcY.toFixed(2));
			$("#calc-total-l").html(calcL.toFixed(2));
			var payments = json.payment;
			$.each(payments, function() {
				var payment = $(this)[0];
				$("#table-515calc tbody").append("<tr id='" + payment.id + "'><td>" + payment.created_at + "</td>" 
												+ "<td>" + payment.title + "</td>"
												+ "<td>" + payment.X + "</td>"
												+ "<td>" + payment.Y + "</td>"
												+ "<td>" + payment.L + "</td>"
												+ "<td><button id='" + payment.id + "' class='button-delete'>Delete</button></td></tr>");
			});
		}
	});

	$("#button-add").click(function() {
		var xx = parseFloat($("#add-x").val());
		var yy = parseFloat($("#add-y").val());
		var ll = parseFloat($("#add-l").val());
		if (isNaN(xx)) xx = 0;
		if (isNaN(yy)) yy = 0;
		if (isNaN(ll)) ll = 0;
		var title = $("#add-title").val();

		$("#add-x").val('');
		$("#add-y").val('');
		$("#add-l").val('');
		$("#add-title").val('');

		$.ajax({
			type: "POST",
			url: "515calculator.php",
			data: {type: "add", x: xx, y: yy, l: ll, title: title},
			success: function(data) {
				var json = JSON.parse(data);
				var total = json.total;
				var totalX = parseFloat(total.X);
				var totalY = parseFloat(total.Y);
				var totalL = parseFloat(total.L);
				var calcX = parseFloat(totalX - (totalX + totalY + totalL) / 3);
				var calcY = parseFloat(totalY - (totalX + totalY + totalL) / 3);
				var calcL = parseFloat(totalL - (totalX + totalY + totalL) / 3);
				$("#total-x").html(totalX.toFixed(2));
				$("#total-y").html(totalY.toFixed(2));
				$("#total-l").html(totalL.toFixed(2));
				$("#calc-total-x").html(calcX.toFixed(2));
				$("#calc-total-y").html(calcY.toFixed(2));
				$("#calc-total-l").html(calcL.toFixed(2));
				var now = json.time;
				$("#table-515calc tbody").append("<tr id='" + json.id + "'><td>" + now + "</td>" 
												+ "<td>" + title + "</td>"
												+ "<td>" + xx + "</td>"
												+ "<td>" + yy + "</td>"
												+ "<td>" + ll + "</td>" 
												+ "<td><button id='" + json.id + "' class='button-delete'>Delete</button></td></tr>");
			}
		});
	});

	$("tbody").delegate("button", "click", function() {
		var password = prompt("Please enter password","");
		if (password == "227") {
			var id = $(this).attr("id");
			$.ajax({
				type: "POST",
				url: "515calculator.php",
				data: {type: "delete", id: id},
				success: function(data) {
					$("tr#" + id).hide();
					var json = JSON.parse(data);
					var total = json.total;
					var totalX = parseFloat(total.X);
					var totalY = parseFloat(total.Y);
					var totalL = parseFloat(total.L);
					var calcX = parseFloat(totalX - (totalX + totalY + totalL) / 3);
					var calcY = parseFloat(totalY - (totalX + totalY + totalL) / 3);
					var calcL = parseFloat(totalL - (totalX + totalY + totalL) / 3);
					$("#total-x").html(totalX.toFixed(2));
					$("#total-y").html(totalY.toFixed(2));
					$("#total-l").html(totalL.toFixed(2));
					$("#calc-total-x").html(calcX.toFixed(2));
					$("#calc-total-y").html(calcY.toFixed(2));
					$("#calc-total-l").html(calcL.toFixed(2));
				}
			});
		}
	});

	$("#button-clean").click(function () {
		var password = prompt("Please enter password","");
		if (password == "227") {
			$.ajax({
				type: "POST",
				url: "515calculator.php",
				data: {type: "clean"},
				success: function(data) {
					$("tbody").html("");
					$("#total-x").html("0");
					$("#total-y").html("0");
					$("#total-l").html("0");
					$("#calc-total-x").html("0");
					$("#calc-total-y").html("0");
					$("#calc-total-l").html("0");
				}
			});
		}
	});
	
});